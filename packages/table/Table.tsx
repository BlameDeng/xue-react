import * as React from "react";
import * as ReactDOM from "react-dom";
import * as PropTypes from "prop-types";
import { classes, arrayIsEqual } from "../utils";
import Icon from "../icon/Icon";
import Pager from "../pager/Pager";
import "./style";
import Spin from "../spin/Spin";

export interface Data {
  key: string;
  [propName: string]: string | React.ReactNode;
}

export interface Column {
  title: string | React.ReactNode;
  key: string;
  width: number;
  render?: (key: string, index: number) => string | React.ReactNode;
  sort?: boolean;
  sorter?: (rowA: Data, rowB: Data) => any;
  fixed?: "left" | "right";
  headClassName?: string;
  headStyle?: React.CSSProperties;
  className?: string;
  style?: React.CSSProperties;
}

export interface Scroll {
  x?: number;
  y?: number;
}

export interface TableProps {
  columns: Column[]; // 表头配置
  dataSource: Data[]; // 数据源
  selectCol?: boolean; // 是否展示选择列
  scroll?: Scroll; // 滚动 固定表头 固定列
  stripe?: boolean; // 斑马纹
  border?: boolean; // 全边框
  pager?: boolean; // 分页
  pageSize?: number; // 每页显示的条数
  size?: "default" | "small"; // 表格大小
  rowHeight?: number; // body 每一行的高度
  onSelectChange?: (selectedKeys: string[]) => any; // 选中项改变的回调
  loading?: boolean; // 加载中状态
  spinSize?: number; // 加载图标大小
}

export interface TableState {
  selectedKeys: string[]; // 选中项 key 数组
  sortKey: string; // 排序的键
  sorter: ((rowA: Data, rowB: Data) => any) | undefined; // 排序函数
  sortOrder: "ascend" | "descend" | false; // 排序方向
  page: number; // 当前页码
  headHeight: number; // 表头高度
  hoverRowKey: string; // 鼠标 hover 的行的 key
  xScrollPosition: "start" | "middle" | "end";
}

const componentName = "Table";

class Table extends React.Component<TableProps, TableState> {
  public static displayName = componentName;

  public static defaultProps = {
    selectCol: false,
    stripe: false,
    border: false,
    pager: false,
    pageSize: 10,
    size: "default",
    loading: false,
    spinSize: 30
  };

  public static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectCol: PropTypes.bool,
    scroll: PropTypes.object,
    stripe: PropTypes.bool,
    border: PropTypes.bool,
    pager: PropTypes.bool,
    pageSize: PropTypes.number,
    size: PropTypes.oneOf(["small", "default"]),
    rowHeight: PropTypes.number,
    onSelectChange: PropTypes.func,
    loading: PropTypes.bool,
    spinSize: PropTypes.number
  };

  public static getDerivedStateFromProps(
    nextProps: TableProps,
    prevState: TableState
  ) {
    const { dataSource } = nextProps;
    const { selectedKeys } = prevState;
    const allKeys = dataSource.map(data => data.key);
    const newSelectedKeys = selectedKeys.filter(
      key => allKeys.indexOf(key) > -1
    );
    // 过滤掉删掉的 data 对应的 selectedKey
    const isEqual = arrayIsEqual(selectedKeys, newSelectedKeys);
    if (isEqual) {
      return null;
    } else {
      return { selectedKeys: newSelectedKeys };
    }
  }

  private headEl: HTMLDivElement;
  private bodyEl: HTMLDivElement;
  private rightFixedBodyEl: HTMLDivElement;
  private leftFixedBodyEl: HTMLDivElement;
  private tableEl: HTMLDivElement;
  private wrapperEl: HTMLDivElement;
  private mouseIn: "leftFixed" | "bodyInner" | "rightFixed" | "";
  private maxScrollLeft: number = 0;

  constructor(props: TableProps) {
    super(props);
    this.state = {
      selectedKeys: [],
      sortKey: "",
      sorter: undefined,
      sortOrder: false,
      page: 1,
      headHeight: 0,
      hoverRowKey: "",
      xScrollPosition: "start"
    };
  }

  public componentDidMount() {
    const { scroll } = this.props;
    if (scroll && scroll.x) {
      this.maxScrollLeft = this.getMaxScrollLeft();
    }
    const { top, bottom } = this.headEl.getBoundingClientRect();
    this.setState({
      headHeight: bottom - top
    });
  }

  public componentDidUpdate(prevProps: TableProps, prevState: TableState) {
    const { onSelectChange } = this.props;
    if (onSelectChange) {
      const { selectedKeys: prevSelectedKeys } = prevState;
      const { selectedKeys } = this.state;
      const isEqual = arrayIsEqual(selectedKeys, prevSelectedKeys);
      if (!isEqual) {
        onSelectChange(selectedKeys);
      }
    }
  }

  public saveBodyEl = (node: HTMLDivElement) => {
    this.bodyEl = node;
  };

  public saveHeadEl = (node: HTMLDivElement) => {
    this.headEl = node;
  };

  public saveLeftFixedBodyEl = (node: HTMLDivElement) => {
    this.leftFixedBodyEl = node;
  };

  public saveRightFixedBodyEl = (node: HTMLDivElement) => {
    this.rightFixedBodyEl = node;
  };

  public saveTableEl = (node: HTMLDivElement) => {
    this.tableEl = node;
  };

  public saveWrapperEl = (node: HTMLDivElement) => {
    this.wrapperEl = node;
  };

  // 固定列时获取横向最大滚动宽度
  public getMaxScrollLeft = (): number => {
    const { left, right } = this.wrapperEl.getBoundingClientRect();
    return this.tableEl.scrollWidth - (right - left);
  };

  // 渲染表头
  public renderHead = (
    renderDataSource: Data[],
    columns: Column[],
    selectCol: boolean
  ) => {
    const cn = componentName;
    const { size, border } = this.props;
    return (
      <>
        {/* 表头选择框 */}
        {selectCol && (
          <div
            className={classes(cn, "head-cell", ["check-box"], { border })}
            style={{ width: "60px", flexShrink: 0 }}
          >
            <div className={classes(cn, "head-cell-inner", [size])}>
              <div
                className={classes(cn, "selection", [
                  this.getSelectionClassName(renderDataSource)
                ])}
                onClick={() => this.handleClickHeadSelection(renderDataSource)}
              />
            </div>
          </div>
        )}
        {columns.map((col: Column) => {
          const { key, width, title, headClassName, headStyle } = col;
          return (
            <div
              className={classes(cn, "head-cell", { border })}
              key={key}
              style={
                width ? { width: width + "px", flexShrink: 0 } : { flexGrow: 1 }
              }
            >
              <div
                className={classes(
                  cn,
                  "head-cell-inner",
                  [size, headClassName],
                  {
                    sort: !!col.sort
                  }
                )}
                style={headStyle}
              >
                {title}
                {col.sort && this.renderSorterIcon(col)}
              </div>
            </div>
          );
        })}
      </>
    );
  };

  // 渲染左侧固定表头
  public renderLeftFixedHead = (
    renderDataSource: Data[],
    leftFixedColumns: Column[],
    width: number,
    selectCol: boolean
  ) => {
    const cn = componentName;
    const { scroll, border } = this.props;
    const { xScrollPosition, headHeight } = this.state;
    return (
      <div
        className={classes(cn, "left-fixed-head", [xScrollPosition], {
          border,
          "scroll-y": scroll && scroll.y && scroll.x
        })}
        style={{ width: width + "px", height: headHeight + "px" }}
      >
        {this.renderHead(renderDataSource, leftFixedColumns, selectCol)}
      </div>
    );
  };

  // 判断左侧表头是否需要加遮罩，隐藏 y 轴滚动条和 body 对齐
  public renderMaskedLeftFixedHead = (renderDataSource: Data[]) => {
    const cn = componentName;
    const { columns, scroll, selectCol } = this.props;
    const { xScrollPosition } = this.state;
    const leftFixedColumns = columns.filter(col => col.fixed === "left");
    if (leftFixedColumns.length === 0 && !selectCol) {
      // 左固定为空且无选择列，默认固定第一列
      leftFixedColumns.push(columns[0]);
    }
    const width =
      leftFixedColumns.reduce((prev, col) => {
        return prev + col.width;
      }, 0) + (selectCol ? 60 : 0);
    const scrollBarWidth = this.getScrollBarWidth();
    if (scroll && scroll.x && scroll.y) {
      return (
        <div
          className={classes(cn, "left-fixed-head-mask", [xScrollPosition])}
          style={{
            width: width - scrollBarWidth - 1 + "px",
            overflow: "hidden"
          }}
        >
          {this.renderLeftFixedHead(
            renderDataSource,
            leftFixedColumns,
            width,
            selectCol as boolean
          )}
        </div>
      );
    } else {
      return this.renderLeftFixedHead(
        renderDataSource,
        leftFixedColumns,
        width,
        selectCol as boolean
      );
    }
  };

  // 渲染右侧固定表头
  public renderRightFixedHead = (renderDataSource: Data[]) => {
    const cn = componentName;
    const { columns, border } = this.props;
    const { xScrollPosition, headHeight } = this.state;
    const rightFixedColumns = columns.filter(col => col.fixed === "right");
    if (rightFixedColumns.length === 0) {
      // 右固定为空，默认固定最后一列
      rightFixedColumns.push(columns[columns.length - 1]);
    }
    const width = rightFixedColumns.reduce((prev, col) => {
      return prev + col.width;
    }, 0);
    return (
      <div
        className={classes(cn, "right-fixed-head", [xScrollPosition], {
          border
        })}
        style={{ width: width + "px", height: headHeight + "px" }}
      >
        {this.renderHead(renderDataSource, rightFixedColumns, false)}
      </div>
    );
  };

  // 可排序时渲染排序图标
  public renderSorterIcon = (column: Column) => {
    const cn = componentName;
    const { sortKey, sortOrder } = this.state;
    const { key, sorter } = column;
    return (
      <div className="sort-icon">
        {sorter ? (
          <Icon
            name="triangle-reverse"
            className={classes(cn, "descend", {
              active: sortKey === key && sortOrder === false
            })}
            size={10}
            onClick={() => this.handleClickSortIcon(key, false, sorter)}
          />
        ) : (
          <>
            <Icon
              name="triangle"
              className={classes(cn, "ascend", {
                active: sortKey === key && sortOrder === "ascend"
              })}
              size={10}
              onClick={() => this.handleClickSortIcon(key, "ascend", undefined)}
            />
            <Icon
              name="triangle-reverse"
              className={classes(cn, "descend", {
                active: sortKey === key && sortOrder === "descend"
              })}
              size={10}
              onClick={() =>
                this.handleClickSortIcon(key, "descend", undefined)
              }
            />
          </>
        )}
      </div>
    );
  };

  // 监听点击排序图标
  public handleClickSortIcon = (
    key: string,
    order: "ascend" | "descend" | false,
    fn?: (rowA: Data, rowB: Data) => any
  ) => {
    const { sortKey, sortOrder } = this.state;
    // 未排序，点击图标，排序
    if (key !== sortKey || order !== sortOrder) {
      fn
        ? this.setState({
            sortKey: key,
            sorter: fn,
            sortOrder: order
          })
        : this.setState({
            sortKey: key,
            sortOrder: order
          });
    }
    // 已排序，点击原图标则取消排序
    if (key === sortKey && order === sortOrder) {
      this.setState({
        sortKey: ""
      });
    }
  };

  // 表头选择框类名
  public getSelectionClassName = (renderDataSource: Data[]): string => {
    const { selectedKeys } = this.state;
    const renderKeys = renderDataSource.map(data => data.key);
    const isEqual = arrayIsEqual(selectedKeys, renderKeys);
    if (isEqual && selectedKeys.length !== 0) {
      return "checked";
    } else {
      for (const key of selectedKeys) {
        if (renderKeys.indexOf(key) > -1) {
          return "determinate";
        }
      }
      return "";
    }
  };

  // 监听点击表头选择框
  public handleClickHeadSelection = (renderDataSource: Data[]) => {
    const { selectedKeys } = this.state;
    const renderKeys = renderDataSource.map((data: Data) => data.key);
    const isEqual = arrayIsEqual(selectedKeys, renderKeys);
    if (isEqual) {
      this.setState({ selectedKeys: [] });
    } else {
      this.setState({ selectedKeys: renderKeys });
    }
  };

  // 监听点击选择框
  public handleClickBodySelection = (key: string) => {
    const { selectedKeys } = this.state;
    this.setState({
      selectedKeys:
        selectedKeys.indexOf(key) > -1
          ? selectedKeys.filter(item => item !== key)
          : [key, ...selectedKeys]
    });
  };

  public renderBody = (renderDataSource: Data[]) => {
    const { columns, selectCol } = this.props;
    return renderDataSource.map((data, index) => {
      return this.renderRow(columns, data, index, selectCol as boolean);
    });
  };

  // 监听鼠标 hover 某一行
  public handleHoverRowKey = (key: string) => {
    if (key !== this.state.hoverRowKey) {
      this.setState({
        hoverRowKey: key
      });
    }
  };

  // 渲染 body 行
  public renderRow = (
    columns: Column[],
    data: Data,
    index: number,
    selectCol: boolean
  ) => {
    const cn = componentName;
    const { stripe, rowHeight } = this.props;
    const { hoverRowKey } = this.state;
    const { key } = data;
    return (
      <div
        className={classes(cn, "body-inner-row", {
          stripe: stripe && index % 2 === 1, // 奇数行
          hover: hoverRowKey === key
        })}
        key={key}
        onMouseEnter={() => this.handleHoverRowKey(key)}
        style={rowHeight ? { height: rowHeight + "px" } : {}}
      >
        {selectCol && this.renderSelectColCell(key)}
        {this.renderBodyRowCell(columns, data)}
      </div>
    );
  };

  // 渲染 row 中的列
  public renderBodyRowCell = (columns: Column[], data: Data) => {
    const cn = componentName;
    const { size, border } = this.props;
    return columns.map((col, index) => {
      const { key, width, render, className, style } = col;
      return render ? (
        this.renderExtraCell(data.key, index, col)
      ) : (
        <div
          className={classes(cn, "body-inner-row-cell", { border })}
          key={key}
          style={
            width ? { width: width + "px", flexShrink: 0 } : { flexGrow: 1 }
          }
        >
          <div
            className={classes(cn, "body-inner-row-cell-inner", [
              size,
              className
            ])}
            style={style}
          >
            {data[key]}
          </div>
        </div>
      );
    });
  };

  // 渲染 extra cell
  public renderExtraCell = (
    dataSourceKey: string,
    index: number,
    col: Column
  ) => {
    const cn = componentName;
    const { size, border } = this.props;
    // render 函数被调用时将接收到对应行的 dataSourceKey（来自 dataSource 对应项的 key） 和 index 两个参数
    const { key, render, width, className, style } = col;
    const node = render!(dataSourceKey, index);
    return (
      <div
        key={key}
        className={classes(cn, "body-inner-row-cell", { border })}
        style={width ? { width: width + "px", flexShrink: 0 } : { flexGrow: 1 }}
      >
        <div
          className={classes(cn, "body-inner-row-cell-inner", [
            size,
            className
          ])}
          style={style}
        >
          {node}
        </div>
      </div>
    );
  };

  // 渲染 selectCol cell
  public renderSelectColCell = (key: string) => {
    const cn = componentName;
    const { size, border } = this.props;
    const { selectedKeys } = this.state;
    const checked = selectedKeys.indexOf(key) > -1;
    return (
      <div
        className={classes(cn, "body-inner-row-cell", ["check-box"], {
          border
        })}
        style={{ width: "60px", flexShrink: 0 }}
      >
        <div className={classes(cn, "body-inner-row-cell-inner", [size])}>
          <div
            className={classes(cn, "selection", { checked })}
            onClick={() => this.handleClickBodySelection(key)}
          />
        </div>
      </div>
    );
  };

  // dataSource 需排序则返回排序后的 dataSource（深拷贝）
  public getRenderDataSource = () => {
    const dataSource = this.getPageDataSource();
    const { sortKey, sorter, sortOrder } = this.state;
    if (!sortKey) {
      return dataSource;
    }
    // 无 sorter 升序降序
    if (!sorter) {
      return dataSource.sort((rowA: Data, rowB: Data) => {
        // 升序
        if (sortOrder === "ascend") {
          return rowA[sortKey]! > rowB[sortKey]! ? 1 : -1;
        }
        // 降序
        if (sortOrder === "descend") {
          return rowA[sortKey]! > rowB[sortKey]! ? -1 : 1;
        }
        return 0;
      });
    }
    // 根据 sorter 排序
    return dataSource.sort(sorter);
  };

  // 分页
  public getPageDataSource = () => {
    const { pager, pageSize, dataSource } = this.props;
    const { page } = this.state;
    const renderItems = pager
      ? dataSource.slice(pageSize! * (page - 1), pageSize! * page)
      : [...dataSource];
    return renderItems;
  };

  // 监听分页改变
  public handlePageChange = (page: number) => {
    if (page !== this.state.page) {
      this.setState({
        page
      });
    }
  };

  // 渲染左侧固定列
  public renderLeftFixedBody = (
    renderDataSource: Data[],
    leftFixedColumns: Column[],
    width: number,
    selectCol: boolean
  ) => {
    const cn = componentName;
    const { scroll } = this.props;
    const { headHeight, xScrollPosition } = this.state;
    return (
      <div
        className={classes(cn, "left-fixed-body", [xScrollPosition])}
        style={
          scroll && scroll.y
            ? {
                width: width + "px",
                height: scroll.y + "px",
                overflowY: "scroll",
                top: headHeight + "px"
              }
            : { width: width + "px", top: headHeight + "px" }
        }
        onScroll={this.handleLeftFixedScrollY}
        ref={this.saveLeftFixedBodyEl}
        onMouseEnter={() => this.handleMouseEnterEl("leftFixed")}
      >
        <div className={classes(cn, "left-fixed-body-inner")}>
          {renderDataSource.map((data, index) => {
            return this.renderRow(leftFixedColumns, data, index, selectCol);
          })}
        </div>
      </div>
    );
  };

  // 判断左侧固定列是否需要加遮罩，隐藏 y 滚动条
  public renderMaskedLeftFixedBody = (renderDateSource: Data[]) => {
    const cn = componentName;
    const { columns, scroll, selectCol } = this.props;
    const { headHeight, xScrollPosition } = this.state;
    const leftFixedColumns = columns.filter(col => col.fixed === "left");
    if (leftFixedColumns.length === 0 && !selectCol) {
      // 左固定为空且无选择列，默认固定第一列
      leftFixedColumns.push(columns[0]);
    }
    const width =
      leftFixedColumns.reduce((prev, col) => {
        return prev + col.width;
      }, 0) + (selectCol ? 60 : 0);
    const scrollBarWidth = this.getScrollBarWidth();
    if (scroll && scroll.x && scroll.y) {
      return (
        <div
          className={classes(cn, "left-fixed-body-mask", [xScrollPosition])}
          style={{
            width: width - scrollBarWidth - 1 + "px",
            height: scroll.y + "px",
            top: headHeight + "px",
            overflow: "hidden"
          }}
        >
          {this.renderLeftFixedBody(
            renderDateSource,
            leftFixedColumns,
            width,
            selectCol as boolean
          )}
        </div>
      );
    } else {
      return this.renderLeftFixedBody(
        renderDateSource,
        leftFixedColumns,
        width,
        selectCol as boolean
      );
    }
  };

  // 获取滚动条宽度
  public getScrollBarWidth = (): number => {
    return (
      window.innerWidth - document.body.clientWidth ||
      document.documentElement.clientHeight
    );
  };

  // 渲染右侧固定列
  public renderRightFixedBody = (renderDataSource: Data[]) => {
    const cn = componentName;
    const { columns, scroll } = this.props;
    const { headHeight, xScrollPosition } = this.state;
    const rightFixedColumns = columns.filter(col => col.fixed === "right");
    if (rightFixedColumns.length === 0) {
      // 右固定为空，默认固定最后一列
      rightFixedColumns.push(columns[columns.length - 1]);
    }
    const width = rightFixedColumns.reduce((prev, col) => {
      return prev + col.width;
    }, 0);
    return (
      <div
        className={classes(cn, "right-fixed-body", [xScrollPosition])}
        style={
          scroll && scroll.y
            ? {
                width: width + "px",
                height: scroll.y + "px",
                overflowY: "scroll",
                top: headHeight + "px"
              }
            : { width: width + "px", top: headHeight + "px" }
        }
        onScroll={this.handleRightFixedScrollY}
        ref={this.saveRightFixedBodyEl}
        onMouseEnter={() => this.handleMouseEnterEl("rightFixed")}
      >
        <div className={classes(cn, "right-fixed-body-inner")}>
          {renderDataSource.map((data, index) => {
            return this.renderRow(rightFixedColumns, data, index, false);
          })}
        </div>
      </div>
    );
  };

  // 监听左侧固定列 Y 轴滚动
  public handleLeftFixedScrollY: React.ReactEventHandler<
    HTMLDivElement
  > = () => {
    const { scroll } = this.props;
    if (!scroll || !scroll.x || !scroll.y || this.mouseIn !== "leftFixed") {
      return;
    }
    const scrollTop = this.leftFixedBodyEl.scrollTop;
    this.bodyEl.scrollTop = scrollTop;
    this.rightFixedBodyEl.scrollTop = scrollTop;
  };

  // 监听右侧固定列 Y 轴滚动
  public handleRightFixedScrollY: React.ReactEventHandler<
    HTMLDivElement
  > = () => {
    const { scroll } = this.props;
    if (!scroll || !scroll.x || !scroll.y || this.mouseIn !== "rightFixed") {
      return;
    }
    const scrollTop = this.rightFixedBodyEl.scrollTop;
    this.bodyEl.scrollTop = scrollTop;
    this.leftFixedBodyEl.scrollTop = scrollTop;
  };

  // 监听 body Y轴滚动
  public handleBodyScrollY: React.ReactEventHandler<HTMLDivElement> = () => {
    const { scroll } = this.props;
    if (!scroll || !scroll.x || !scroll.y || this.mouseIn !== "bodyInner") {
      return;
    }
    const scrollTop = this.bodyEl.scrollTop;
    this.rightFixedBodyEl.scrollTop = scrollTop;
    this.leftFixedBodyEl.scrollTop = scrollTop;
  };

  // 监听鼠标 enter
  public handleMouseEnterEl = (
    elName: "leftFixed" | "bodyInner" | "rightFixed" | ""
  ) => {
    this.mouseIn = elName;
  };

  // 监听鼠标离开 body 设置 hoverRowKey 为空
  public handleMouseLeaveBody = () => {
    this.mouseIn = "";
    this.setState({
      hoverRowKey: ""
    });
  };

  // 监听 table 横向滚动
  public handleTableScroll: React.ReactEventHandler<HTMLDivElement> = e => {
    const { scrollLeft } = this.tableEl;
    const { maxScrollLeft } = this;
    const { xScrollPosition } = this.state;
    if (scrollLeft === 0 && xScrollPosition !== "start") {
      this.setState({
        xScrollPosition: "start"
      });
    } else if (
      Math.ceil(scrollLeft) >= maxScrollLeft &&
      xScrollPosition !== "end"
    ) {
      this.setState({
        xScrollPosition: "end"
      });
    } else if (xScrollPosition !== "middle") {
      this.setState({
        xScrollPosition: "middle"
      });
    }
  };

  public render() {
    const cn = componentName;
    const renderDataSource = this.getRenderDataSource();
    const {
      dataSource,
      columns,
      pager,
      pageSize,
      scroll,
      size,
      border,
      selectCol,
      loading,
      spinSize
    } = this.props;
    const shouldRenderFixedCol = scroll && scroll.x;
    const headStyle =
      scroll && scroll.x
        ? {
            width: scroll.x + "px"
          }
        : {};
    const bodyStyle = Object.assign(
      {},
      scroll && scroll.y ? { height: scroll.y + "px" } : {},
      scroll && scroll.x
        ? {
            width: scroll.x + "px"
          }
        : {}
    );
    return (
      <Spin spinning={loading} size={spinSize}>
        <div className={classes(cn, "wrapper")} ref={this.saveWrapperEl}>
          <div
            className={classes(cn, "", { "scroll-x": scroll && scroll.x })}
            role="table"
            onScroll={this.handleTableScroll}
            ref={this.saveTableEl}
          >
            {/* 表头 */}
            <div
              className={classes(cn, "head", {
                "scroll-y": scroll && scroll.y
              })}
              style={headStyle}
              ref={this.saveHeadEl}
            >
              <div className={classes(cn, "head-inner", { border })}>
                {this.renderHead(
                  renderDataSource,
                  columns,
                  selectCol as boolean
                )}
              </div>
              {/* 左侧固定表头 */}
              {shouldRenderFixedCol &&
                this.renderMaskedLeftFixedHead(renderDataSource)}
              {/* 右侧固定表头 */}
              {shouldRenderFixedCol &&
                this.renderRightFixedHead(renderDataSource)}
            </div>
            {/* 表格主体 */}
            <div
              className={classes(cn, "body", {
                "scroll-y": scroll && scroll.y
              })}
              style={bodyStyle}
              ref={this.saveBodyEl}
              onScroll={this.handleBodyScrollY}
              onMouseLeave={this.handleMouseLeaveBody}
            >
              <div
                className={classes(cn, "body-inner")}
                onMouseEnter={() => this.handleMouseEnterEl("bodyInner")}
              >
                {this.renderBody(renderDataSource)}
              </div>
              {/* 左侧固定列 */}
              {shouldRenderFixedCol &&
                this.renderMaskedLeftFixedBody(renderDataSource)}
              {/* 右侧固定列 */}
              {shouldRenderFixedCol &&
                this.renderRightFixedBody(renderDataSource)}
            </div>
            {/* 分页器 */}
            {pager && dataSource && dataSource.length && (
              <div style={{ padding: "10px", textAlign: "end" }}>
                <Pager
                  total={Math.ceil(dataSource.length / pageSize!)}
                  onChange={this.handlePageChange}
                  size={size}
                />
              </div>
            )}
          </div>
        </div>
      </Spin>
    );
  }
}
export default Table;

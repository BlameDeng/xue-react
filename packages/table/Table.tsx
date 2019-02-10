import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'
import { classes, isSimpleArrayEqual } from '../utils'
import Thead from './Thead'
import './style'
import Scroll from '../scroll/Scroll'

interface IExtraHandlers {
  [propName: string]: (key: string, index: number) => any
}

interface IData {
  key: string
  [propName: string]: string | React.ReactNode
}

interface IColumn {
  title: string | React.ReactNode
  key: string
  extra?: React.ReactElement<any>
  extraHandlers?: IExtraHandlers
  sort?: boolean
  sorter?: (rowA: IData, rowB: IData) => any
  width?: number
}

interface IScroll {
  x?: number
  y?: number
}

interface ITableProps {
  columns: IColumn[] // 表头配置
  dataSource: IData[] // 数据源
  select?: boolean // 是否展示选择列
  scroll?: IScroll // 滚动 固定表头
  stripe?: boolean // 斑马纹
}

interface ITableState {
  selectedKeys: string[] // 选中项 key 数组
  sortKey: string // 排序的建
  sorter: ((rowA: IData, rowB: IData) => any) | undefined // 排序函数
  sortOrder: 'ascend' | 'descend' | false // 排序方向
}

const componentName = 'Table'

class Table extends React.Component<ITableProps, ITableState> {
  public static displayName = componentName

  public static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object),
    select: PropTypes.bool
  }

  public static defaultProps = {
    select: true,
    stripe: false
  }

  public static getDerivedStateFromProps(
    nextProps: ITableProps,
    prevState: ITableState
  ) {
    const { dataSource } = nextProps
    const { selectedKeys } = prevState
    const allKeys = dataSource.map(data => data.key)
    const newSelectedKeys = selectedKeys.filter(
      key => allKeys.indexOf(key) > -1
    )
    // 过滤掉删掉的 data 对应的 selectedKey
    const isEqual = isSimpleArrayEqual(selectedKeys, newSelectedKeys)
    if (isEqual) {
      return null
    } else {
      return { selectedKeys: newSelectedKeys }
    }
  }

  private theadRef: null | Thead
  private tableRef: HTMLTableElement
  private headRef: HTMLDivElement
  private bodyRef: HTMLDivElement

  constructor(props: ITableProps) {
    super(props)
    this.state = {
      selectedKeys: [],
      sortKey: '',
      sorter: undefined,
      sortOrder: false
    }
  }

  public componentDidMount() {
    const { scroll } = this.props
    if (scroll) {
      this.renderCloneTable()
    }
  }

  // 处理点击选择框
  public handleClickSelect = (key: string) => {
    const { selectedKeys } = this.state
    this.setState({
      selectedKeys:
        selectedKeys.indexOf(key) > -1
          ? selectedKeys.filter(item => item !== key)
          : [key, ...selectedKeys]
    })
  }

  // 处理点击表头选择框
  public handleClickHeadSelect = () => {
    const { dataSource } = this.props
    const { selectedKeys } = this.state
    const allKeys = dataSource.map(data => data.key)
    const isEqual = isSimpleArrayEqual(selectedKeys, allKeys)
    if (isEqual) {
      this.setState({ selectedKeys: [] })
    } else {
      this.setState({ selectedKeys: allKeys })
    }
  }

  // 处理点击排序图标
  public handleClickSortIcon = (
    key: string,
    order: 'ascend' | 'descend' | false,
    fn?: (rowA: IData, rowB: IData) => any
  ) => {
    const { sortKey, sortOrder } = this.state
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
          })
    }
    // 已排序，点击原图标则取消排序
    if (key === sortKey && order === sortOrder) {
      this.setState({
        sortKey: ''
      })
    }
  }

  // 渲染 select 列
  public renderSelect = (key: string) => {
    const cn = componentName
    const { selectedKeys } = this.state
    const checked = selectedKeys.indexOf(key) > -1
    return (
      <td className="check-box">
        <span
          className={classes(cn, 'selection', { checked })}
          onClick={() => this.handleClickSelect(key)}
        />
      </td>
    )
  }

  // 渲染 extra 列
  public renderExtra = (key: string, index: number, column: IColumn) => {
    const handlers = {}
    // 将事件函数挂在 handlers 上，事件函数被调用时将接收到对应行的 key（来自 dataSource 对应项的 key） 和 index 两个参数
    if (column.extraHandlers) {
      Object.keys(column.extraHandlers).forEach((handlerKey: string) => {
        handlers[handlerKey] = () =>
          column.extraHandlers![handlerKey](key, index)
      })
    }
    return (
      <td key={key} style={column.width ? { width: column.width + 'px' } : {}}>
        {React.cloneElement(column.extra!, {
          ...handlers
        })}
      </td>
    )
  }

  // 渲染 tbody
  public renderBody = () => {
    const { columns, select } = this.props
    return this.getDataSource().map((data: IData, index: number) => {
      return (
        <tr key={data.key}>
          {select && this.renderSelect(data.key)}
          {columns.map(column => {
            if (column.extra) {
              return this.renderExtra(data.key, index, column)
            } else {
              return (
                <td
                  key={column.key}
                  style={column.width ? { width: column.width + 'px' } : {}}
                >
                  {data[column.key]}
                </td>
              )
            }
          })}
        </tr>
      )
    })
  }

  // dataSource 需排序则返回排序后的 dataSource（深拷贝）
  public getDataSource = () => {
    const { dataSource } = this.props
    const { sortKey, sorter, sortOrder } = this.state
    if (!sortKey) {
      return dataSource
    }
    const copy = JSON.parse(JSON.stringify(dataSource))
    // 无 sorter 升序降序
    if (!sorter) {
      return copy.sort((rowA: IData, rowB: IData) => {
        // 升序
        if (sortOrder === 'ascend') {
          return rowA[sortKey]! > rowB[sortKey]! ? 1 : -1
        }
        // 降序
        if (sortOrder === 'descend') {
          return rowA[sortKey]! > rowB[sortKey]! ? -1 : 1
        }
        return undefined
      })
    }
    // 根据 sorter 排序
    return copy.sort(sorter)
  }

  public saveTheadRef = (instance: null | Thead) => {
    this.theadRef = instance
  }

  public saveTableRef = (node: HTMLTableElement) => {
    this.tableRef = node
  }

  public saveHeadRef = (node: HTMLDivElement) => {
    this.headRef = node
  }

  public saveBodyRef = (node: HTMLDivElement) => {
    this.bodyRef = node
  }

  // 固定表头
  public renderCloneTable = () => {
    const { scroll } = this.props
    const cloneTable = this.tableRef.cloneNode(false)
    const theadNode = ReactDOM.findDOMNode(
      this.theadRef!
    ) as HTMLTableHeaderCellElement
    const { top, bottom } = theadNode!.getBoundingClientRect()
    const theadHeight = bottom - top
    cloneTable.appendChild(theadNode!)
    const el = ReactDOM.findDOMNode(this) as HTMLDivElement
    el.style.paddingTop = theadHeight + 'px'
    el.style.height = scroll!.y + 'px'
    this.headRef.appendChild(cloneTable)
    this.headRef.style.marginTop = -theadHeight + 'px'
  }

  public render() {
    const cn = componentName
    const { columns, dataSource, scroll, stripe } = this.props
    const { selectedKeys, sortKey, sortOrder } = this.state
    return (
      <div className={classes(cn, 'wrapper')}>
        {scroll && (
          <div className={classes(cn, 'head')} ref={this.saveHeadRef} />
        )}
        {scroll ? (
          <Scroll
            scrollBarVisible={true}
            trackStyle={{ backgroundColor: 'transparent' }}
            scrollBarStyle={{
              width: '10px',
              borderRadius: '4px',
              backgroundColor: 'rgb(195,195,195)',
              opacity: 0.3
            }}
          >
            <div className={classes(cn, 'body')} ref={this.saveBodyRef}>
              <table className={classes(cn, '')} ref={this.saveTableRef}>
                <Thead
                  columns={columns}
                  dataSource={dataSource}
                  selectedKeys={selectedKeys}
                  handleClickHeadSelect={this.handleClickHeadSelect}
                  handleClickSortIcon={this.handleClickSortIcon}
                  sortKey={sortKey}
                  sortOrder={sortOrder}
                  ref={this.saveTheadRef}
                />
                <tbody className={classes(cn, 'body')}>
                  {this.renderBody()}
                </tbody>
              </table>
            </div>
          </Scroll>
        ) : (
          <div className={classes(cn, 'body')} ref={this.saveBodyRef}>
            <table className={classes(cn, '')} ref={this.saveTableRef}>
              <Thead
                columns={columns}
                dataSource={dataSource}
                selectedKeys={selectedKeys}
                handleClickHeadSelect={this.handleClickHeadSelect}
                handleClickSortIcon={this.handleClickSortIcon}
                sortKey={sortKey}
                sortOrder={sortOrder}
                ref={this.saveTheadRef}
              />
              <tbody className={classes(cn, 'body', { stripe })}>
                {this.renderBody()}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )
  }
}

export default Table

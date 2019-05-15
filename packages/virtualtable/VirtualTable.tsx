import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'
import './style'
import Scroll from '../scroll/Scroll'

export interface Data {
  key: string
  [propName: string]: string | React.ReactNode
}

export interface Column {
  title: string | React.ReactNode
  key: string
  width: number
  render?: (key: string, index: number) => string | React.ReactNode
  sort?: boolean
  sorter?: (rowA: Data, rowB: Data) => any
  fixed?: 'left' | 'right'
  headClassName?: string
  headStyle?: React.CSSProperties
  className?: string
  style?: React.CSSProperties
}

export interface TableProps {
  columns: Column[]
  dataSource: Data[]
  height: number
  rowHeight: number
}

export interface TableState {
  renderDataSource: Data[]
  count: number
  topHeight: number
}

const componentName = 'Table'

class VirtualTable extends React.Component<TableProps, TableState> {
  public static displayName = componentName

  constructor(props: TableProps) {
    super(props)
    const count = Math.ceil(props.height! / props.rowHeight!) + 20
    this.state = {
      renderDataSource: props.dataSource.slice(0, count),
      count,
      topHeight: 0
    }
  }

  public changeRenderDataSource = (y: number) => {
    const { dataSource, rowHeight } = this.props
    const { count } = this.state
    const topHeight = Math.abs(y) - 10 * rowHeight
    if (topHeight <= 0) {
      this.setState({
        topHeight: 0,
        renderDataSource: dataSource.slice(0, count)
      })
    } else {
      const num = Math.ceil(topHeight / rowHeight)
      this.setState({
        topHeight,
        renderDataSource: dataSource.slice(num, num + count)
      })
    }
  }

  // 渲染表头
  public renderHead = (renderDataSource: Data[], columns: Column[]) => {
    const cn = componentName
    return (
      <>
        {columns.map((col: Column) => {
          const { key, width, title, headClassName, headStyle } = col
          return (
            <div
              className={classes(cn, 'head-cell')}
              key={key}
              style={
                width ? { width: width + 'px', flexShrink: 0 } : { flexGrow: 1 }
              }
            >
              <div
                className={classes(cn, 'head-cell-inner', [headClassName], {
                  sort: !!col.sort
                })}
                style={headStyle}
              >
                {title}
              </div>
            </div>
          )
        })}
      </>
    )
  }

  public renderBody = (renderDataSource: Data[]) => {
    const { columns } = this.props
    return renderDataSource.map((data, index) => {
      return this.renderRow(columns, data, index)
    })
  }

  // 渲染 body 行
  public renderRow = (columns: Column[], data: Data, index: number) => {
    const cn = componentName
    const { rowHeight } = this.props
    const { key } = data
    return (
      <div
        className={classes(cn, 'body-inner-row')}
        key={key}
        style={rowHeight ? { height: rowHeight + 'px' } : {}}
      >
        {this.renderBodyRowCell(columns, data)}
      </div>
    )
  }

  // 渲染 row 中的列
  public renderBodyRowCell = (columns: Column[], data: Data) => {
    const cn = componentName
    return columns.map(col => {
      const { key, width, className, style } = col
      return (
        <div
          className={classes(cn, 'body-inner-row-cell')}
          key={key}
          style={
            width ? { width: width + 'px', flexShrink: 0 } : { flexGrow: 1 }
          }
        >
          <div
            className={classes(cn, 'body-inner-row-cell-inner', [className])}
            style={style}
          >
            {data[key]}
          </div>
        </div>
      )
    })
  }

  public render() {
    const cn = componentName
    const { columns, height, rowHeight, dataSource } = this.props
    const { renderDataSource, topHeight, count } = this.state
    const bottomHeight =
      rowHeight * dataSource.length - topHeight - rowHeight * count
    return (
      <div className={classes(cn, 'wrapper')}>
        <div role="table">
          {/* 表头 */}
          <div className={classes(cn, 'head')}>
            <div className={classes(cn, 'head-inner')}>
              {this.renderHead(renderDataSource, columns)}
            </div>
          </div>
          {/* 表格主体 */}
          <div
            className={classes(cn, 'body')}
            style={{ height: `${height}px`, overflowY: 'hidden' }}
          >
            <Scroll onScroll={this.changeRenderDataSource}>
              <div className={classes(cn, 'body-inner')}>
                <div style={{ height: `${topHeight}px` }} />
                {this.renderBody(renderDataSource)}
                <div
                  style={{ height: `${bottomHeight > 0 ? bottomHeight : 0}px` }}
                />
              </div>
            </Scroll>
          </div>
        </div>
      </div>
    )
  }
}

export default VirtualTable

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'
import './style'
import { classes, isSimpleArrayEqual } from '../utils'
import Thead from './Thead'

interface IColumn {
  title: string | React.ReactNode
  key: string
  extra?: React.ReactElement<any>
  onClick?: (key: string, index: number, e: React.MouseEvent) => any
}

interface IData {
  key: string
  [propName: string]: string | React.ReactNode
}

interface ITableProps {
  columns: IColumn[]
  dataSource: IData[]
  select?: boolean
}

interface ITableState {
  selectedKeys: string[]
}

const componentName = 'Table'

class Table extends React.Component<ITableProps, ITableState> {
  public static displayName = componentName

  public static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object),
    select: PropTypes.bool
  }

  public static defaultProps = {
    select: true
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

  constructor(props: ITableProps) {
    super(props)
    this.state = {
      selectedKeys: []
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
    return (
      <td key={key}>
        {React.cloneElement(column.extra!, {
          onClick: (e: React.MouseEvent) =>
            column.onClick && column.onClick(key, index, e)
        })}
      </td>
    )
  }

  // 渲染 tbody
  public renderBody = () => {
    const { columns, dataSource, select } = this.props
    return dataSource.map((data, index) => {
      return (
        <tr key={data.key}>
          {select && this.renderSelect(data.key)}
          {columns.map(column => {
            if (column.extra) {
              return this.renderExtra(data.key, index, column)
            } else {
              return <td key={column.key}>{data[column.key]}</td>
            }
          })}
        </tr>
      )
    })
  }

  public render() {
    const cn = componentName
    const { columns, dataSource } = this.props
    const { selectedKeys } = this.state
    return (
      <table className={classes(cn, '')}>
        <Thead
          columns={columns}
          dataSource={dataSource}
          selectedKeys={selectedKeys}
          handleClickHeadSelect={this.handleClickHeadSelect}
        />
        <tbody className={classes(cn, 'body')}>{this.renderBody()}</tbody>
      </table>
    )
  }
}

export default Table

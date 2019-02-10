import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'
import { classes, isSimpleArrayEqual } from '../utils'
import Icon from '../icon/Icon'
import './style'

interface IColumn {
  title: string | React.ReactNode
  key: string
  extra?: React.ReactNode
  sort?: boolean
  sorter?: (rowA: IData, rowB: IData) => any
  width?: number
}

interface IData {
  key: string
  [propName: string]: string | React.ReactNode
}

interface ITheadProps {
  columns: IColumn[]
  selectedKeys: string[]
  dataSource: IData[]
  handleClickHeadSelect: () => any
  handleClickSortIcon: (
    key: string,
    sortOrder: 'ascend' | 'descend' | boolean,
    sorter?: (rowA: IData, rowB: IData) => any
  ) => any
  sortKey: string
  sortOrder: 'ascend' | 'descend' | false
}

const componentName = 'Thead'

class Thead extends React.Component<ITheadProps> {
  public static displayName = componentName

  public static propTypes = {}

  public static defaultProps = {}

  public renderThead = () => {
    const cn = componentName
    const { columns } = this.props
    return columns.map(column => (
      <th
        key={column.key}
        style={column.width ? { width: column.width + 'px' } : {}}
      >
        <div className={classes(cn, 'wrapper', { sort: !!column.sort })}>
          {column.title}
          {column.sort && this.renderSorterIcon(column)}
        </div>
      </th>
    ))
  }

  // 可排序时渲染排序图标
  public renderSorterIcon = (column: IColumn) => {
    const cn = componentName
    const { handleClickSortIcon, sortKey, sortOrder = false } = this.props
    const { key, sorter } = column
    return (
      <div className="sorter-icon">
        {sorter ? (
          <Icon
            name="triangle-reverse"
            className={classes(cn, 'descend', {
              active: sortKey === key && sortOrder === false
            })}
            size={10}
            onClick={() => handleClickSortIcon(key, false, sorter)}
          />
        ) : (
          <>
            <Icon
              name="triangle"
              className={classes(cn, 'ascend', {
                active: sortKey === key && sortOrder === 'ascend'
              })}
              size={10}
              onClick={() => handleClickSortIcon(key, 'ascend', undefined)}
            />
            <Icon
              name="triangle-reverse"
              className={classes(cn, 'descend', {
                active: sortKey === key && sortOrder === 'descend'
              })}
              size={10}
              onClick={() => handleClickSortIcon(key, 'descend', undefined)}
            />
          </>
        )}
      </div>
    )
  }

  // 选择框类名
  public getSelectionClassName = (): string => {
    const { selectedKeys, dataSource } = this.props
    const allKeys = dataSource.map(data => data.key)
    const isEqual = isSimpleArrayEqual(selectedKeys, allKeys)
    if (isEqual && selectedKeys.length !== 0) {
      return 'checked'
    } else if (selectedKeys.length === 0) {
      return ''
    } else {
      return 'determinate'
    }
  }

  public render() {
    const cn = componentName
    const { handleClickHeadSelect } = this.props
    return (
      <thead className={classes(cn, ['xue-table-head'])}>
        <tr>
          <th className="check-box">
            <span
              className={classes(cn, 'selection', [
                this.getSelectionClassName()
              ])}
              onClick={handleClickHeadSelect}
            />
          </th>
          {this.renderThead()}
        </tr>
      </thead>
    )
  }
}

export default Thead

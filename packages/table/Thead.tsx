import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'
import { classes, isSimpleArrayEqual } from '../utils'
import './style'

interface IColumn {
  title: string | React.ReactNode
  key: string
  extra?: React.ReactNode
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
}

const componentName = 'Thead'

class Thead extends React.Component<ITheadProps> {
  public static displayName = componentName

  public static propTypes = {}

  public static defaultProps = {}

  public renderThead = () => {
    const cn = componentName
    const { columns } = this.props
    return columns.map(column => <th key={column.key}>{column.title}</th>)
  }

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

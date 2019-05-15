import * as React from 'react'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'

export interface MonthPanelProps {
  month?: number
  onClickMonth?: (month: number) => any
}

const componentName = 'MonthPanel'

class MonthPanel extends React.Component<MonthPanelProps> {
  public static displayName = componentName

  public static propTypes = {
    month: PropTypes.number,
    onClickMonth: PropTypes.func
  }

  private monthArray: string[] = [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月'
  ]

  public handleClickMonth = (month: number) => {
    const { onClickMonth } = this.props
    if (onClickMonth) {
      onClickMonth(month)
    }
  }

  public render() {
    const cn = componentName
    const { month } = this.props
    return (
      <ul className={classes(cn, '')}>
        {this.monthArray.map((str: string, index: number) => (
          <li
            key={str}
            onClick={() => this.handleClickMonth(index + 1)}
            className={classes(cn, 'month')}
          >
            <span
              className={classes(cn, 'month-item', {
                selected: month === index + 1
              })}
            >
              {str}
            </span>
          </li>
        ))}
      </ul>
    )
  }
}

export default MonthPanel

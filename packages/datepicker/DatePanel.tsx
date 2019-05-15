import * as React from 'react'
import * as PropTypes from 'prop-types'
import { getDateLists, classes } from '../utils'

export interface DateValue {
  year: number
  month: number
  date: number
}

export interface IDatePanelProps {
  year: number
  month: number
  value?: DateValue | null
  onClickDate?: (value: DateValue) => any
}

const componentName = 'DatePanel'

class DatePanel extends React.Component<IDatePanelProps> {
  public static displayName = componentName

  public static propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    value: PropTypes.object,
    onClickDate: PropTypes.func
  }

  public isSelected = (year: number, month: number, date: number): boolean => {
    const { value } = this.props
    if (!value) {
      return false
    }
    const {
      year: selectedYear,
      month: selectedMonth,
      date: selectedDate
    } = value
    return (
      selectedYear === year && selectedMonth === month && selectedDate === date
    )
  }

  public isToday = (year: number, month: number, date: number): boolean => {
    const dateObject = new Date()
    return (
      year === dateObject.getFullYear() &&
      month === dateObject.getMonth() + 1 &&
      date === dateObject.getDate()
    )
  }

  public renderPrefix = (prefix: number[]) => {
    const { year, month } = this.props
    const cn = componentName
    return prefix.map(n => (
      <li
        key={`prefix${n}`}
        className={classes(cn, 'date', ['prefix'], {
          selected:
            month === 1
              ? this.isSelected(year - 1, 12, n)
              : this.isSelected(year, month - 1, n),
          today:
            month === 1
              ? this.isToday(year - 1, 12, n)
              : this.isToday(year, month - 1, n)
        })}
        onClick={() => this.handleClickDate(year, month - 1, n)}
      >
        {n}
      </li>
    ))
  }

  public renderDateList = (dateList: number[]) => {
    const { year, month } = this.props
    const cn = componentName
    return dateList.map(n => (
      <li
        key={`date-list${n}`}
        className={classes(cn, 'date', ['date-list'], {
          selected: this.isSelected(year, month, n),
          today: this.isToday(year, month, n)
        })}
        onClick={() => this.handleClickDate(year, month, n)}
      >
        {n}
      </li>
    ))
  }

  public renderSuffix = (suffix: number[]) => {
    const { year, month } = this.props
    const cn = componentName
    return suffix.map(n => (
      <li
        key={`suffix${n}`}
        className={classes(cn, 'date', ['suffix'], {
          selected:
            month === 12
              ? this.isSelected(year + 1, 1, n)
              : this.isSelected(year, month + 1, n),
          today:
            month === 12
              ? this.isSelected(year + 1, 1, n)
              : this.isSelected(year, month + 1, n)
        })}
        onClick={() => this.handleClickDate(year, month + 1, n)}
      >
        {n}
      </li>
    ))
  }

  public renderDateLists = () => {
    const { year, month } = this.props
    const { prefix, dateList, suffix } = getDateLists(year, month)
    return this.renderPrefix(prefix)
      .concat(this.renderDateList(dateList))
      .concat(this.renderSuffix(suffix))
  }

  public handleClickDate = (year: number, month: number, date: number) => {
    const { onClickDate } = this.props
    if (onClickDate) {
      if (month === 0) {
        onClickDate({ year: year - 1, month: 12, date })
      } else if (month === 13) {
        onClickDate({ year: year + 1, month: 1, date })
      } else {
        onClickDate({ year, month, date })
      }
    }
  }

  public render() {
    const cn = componentName
    return (
      <ul className="xue-datepanel">
        <li className={classes(cn, 'day')}>一</li>
        <li className={classes(cn, 'day')}>二</li>
        <li className={classes(cn, 'day')}>三</li>
        <li className={classes(cn, 'day')}>四</li>
        <li className={classes(cn, 'day')}>五</li>
        <li className={classes(cn, 'day')}>六</li>
        <li className={classes(cn, 'day')}>日</li>
        {this.renderDateLists()}
      </ul>
    )
  }
}

export default DatePanel

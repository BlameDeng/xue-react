import * as React from 'react'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'

export interface YearPanelProps {
  startYear: number
  year?: number
  onClickYear?: (year: number, type: string) => any
}

const componentName = 'YearPanel'

class YearPanel extends React.Component<YearPanelProps> {
  public static displayName = componentName

  public static propTypes = {
    startYear: PropTypes.number,
    year: PropTypes.number,
    onClickYear: PropTypes.func
  }

  public handleClickYear = (year: number, index: number) => {
    const { onClickYear } = this.props
    if (onClickYear) {
      if (index === 0) {
        onClickYear(year, 'first')
      } else if (index === 11) {
        onClickYear(year, 'last')
      } else {
        onClickYear(year, 'middle')
      }
    }
  }

  public renderYear = () => {
    const cn = componentName
    const { startYear, year } = this.props
    return Array.from({ length: 12 }, (item, n) => {
      return startYear + n - 1
    }).map((val, index) => {
      return (
        <li
          className={classes(cn, 'year')}
          key={index} // ** index 作 key 解决过渡的问题**
          onClick={() => this.handleClickYear(val, index)}
        >
          <span
            className={classes(cn, 'year-item', { selected: val === year })}
          >
            {val}
          </span>
        </li>
      )
    })
  }

  public render() {
    return <ul className={classes(componentName, '')}>{this.renderYear()}</ul>
  }
}

export default YearPanel

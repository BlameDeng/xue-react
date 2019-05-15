import * as React from 'react'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'

export interface DecadePanelProps {
  startDecade: number
  decade?: number
  onClickDecade?: (decade: number, type: string) => any
}

const componentName = 'DecadePanel'

class DecadePanel extends React.Component<DecadePanelProps> {
  public static displayName = componentName

  public static propTypes = {
    startDecade: PropTypes.number,
    decade: PropTypes.number,
    onClickDecade: PropTypes.func
  }

  public handleClickDecade = (decade: number, index: number) => {
    const { onClickDecade } = this.props
    if (onClickDecade) {
      if (index === 0) {
        onClickDecade(decade, 'first')
      } else if (index === 11) {
        onClickDecade(decade, 'last')
      } else {
        onClickDecade(decade, 'middle')
      }
    }
  }

  public renderDecade = () => {
    const cn = componentName
    const { startDecade, decade } = this.props
    return Array.from({ length: 12 }, (item, n) => {
      return startDecade + (n - 1) * 10
    }).map((val, index) => {
      return (
        <li
          className={classes(cn, 'decade')}
          key={index} // ** index 作 key 解决过渡的问题**
          onClick={() => this.handleClickDecade(val, index)}
        >
          <span
            className={classes(cn, 'decade-item', { selected: val === decade })}
          >
            {val + '-' + (val + 9)}
          </span>
        </li>
      )
    })
  }

  public render() {
    return <ul className={classes(componentName, '')}>{this.renderDecade()}</ul>
  }
}

export default DecadePanel

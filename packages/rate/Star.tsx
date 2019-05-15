import * as React from 'react'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'
import Icon from '../icon/Icon'

export interface StarProps {
  count: number
  index: number
  handleHover?: (index: number, position: 'left' | 'right') => any
  handleClick?: (index: number, positon: 'left' | 'right') => any
}

const componentName = 'Star'

class Star extends React.Component<StarProps> {
  public static displayName = componentName

  public static propTypes = {
    count: PropTypes.number,
    index: PropTypes.number,
    handleHover: PropTypes.func,
    handleClick: PropTypes.func
  }

  public getIconName = (): string => {
    const { count, index } = this.props
    if (count - index < 0.5) {
      return 'empty'
    } else if (count - index === 0.5) {
      return 'half'
    } else if (count - index > 0.5) {
      return 'full'
    }
    return ''
  }

  public handleMouseEnter = (position: 'left' | 'right') => {
    const { index, handleHover } = this.props
    if (handleHover) {
      handleHover(index, position)
    }
  }

  public handleClick = (postion: 'left' | 'right') => {
    const { index, handleClick } = this.props
    if (handleClick) {
      handleClick(index, postion)
    }
  }

  public render() {
    const cn = componentName
    return (
      <li className={classes(cn, '')}>
        <Icon
          name={this.getIconName()}
          size={20}
          className="xue-rate-star-icon"
        />
        <div
          className={classes(cn, 'filler', ['left'])}
          onMouseEnter={() => this.handleMouseEnter('left')}
          onClick={() => this.handleClick('left')}
        />
        <div
          className={classes(cn, 'filler', ['right'])}
          onMouseEnter={() => this.handleMouseEnter('right')}
          onClick={() => this.handleClick('right')}
        />
      </li>
    )
  }
}

export default Star

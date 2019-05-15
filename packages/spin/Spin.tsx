import * as React from 'react'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'
import Icon from '../icon/Icon'
import Transition from '../transition/Transition'
import './style'

export interface SpinProps {
  spinning?: boolean
  size?: number
  tip?: string
  className?: string
  style?: React.CSSProperties
}

const componentName = 'Spin'

class Spin extends React.Component<SpinProps> {
  public static displayName = componentName

  public static defaultProps = {
    spinning: true,
    size: 16
  }

  public static propTypes = {
    spinning: PropTypes.bool,
    size: PropTypes.number,
    tip: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object
  }

  public render() {
    const cn = componentName
    const { spinning, size, tip, className, style, children } = this.props
    return (
      <div
        className={classes(cn, 'wrapper', [className], {
          'with-children': !!children
        })}
        style={style}
      >
        <div
          className={classes(cn, 'mask', { active: !!children, spinning })}
        />
        <Transition
          visible={!!spinning}
          beforeEnter={{ opacity: 0 }}
          afterEnter={{ opacity: 1 }}
        >
          <div
            className={classes(cn, 'container', {
              'with-children': !!children,
              'with-tip': !!tip
            })}
          >
            <Icon name="spin" size={size} className={classes(cn, '')} />
            {tip && <span className={classes(cn, 'tip')}>{tip}</span>}
          </div>
        </Transition>
        {children}
      </div>
    )
  }
}
export default Spin

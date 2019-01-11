import * as React from 'react'
import * as PropTypes from 'prop-types'
import Transition from '../transition/Transition'
import { classes } from '../utils'
import Icon from '../icon/Icon'
const Unfold = Transition.Unfold

interface IPanelProps {
  header: string | React.ReactNode
  uniqueKey?: string
  disabled?: boolean
  showArrow?: boolean
  derivedActiveKey?: string[]
  onClick?: (key: string, e: React.MouseEvent) => any
  style?: React.CSSProperties
  className?: string
}

class Panel extends React.Component<IPanelProps> {
  public static displayName = 'Panel'

  public static propTypes = {
    header: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
      .isRequired,
    uniqueKey: PropTypes.string,
    derivedActiveKey: PropTypes.arrayOf(PropTypes.string),
    disabled: PropTypes.bool,
    showArrow: PropTypes.bool,
    onClick: PropTypes.func,
    style: PropTypes.object,
    className: PropTypes.string
  }

  public handleClickHeader = (e: React.MouseEvent) => {
    const { uniqueKey, onClick, disabled } = this.props
    if (disabled) {
      return
    }
    onClick!(uniqueKey!, e)
  }

  public render() {
    const {
      header,
      disabled,
      derivedActiveKey,
      uniqueKey,
      showArrow,
      className,
      style,
      children
    } = this.props
    const active = (derivedActiveKey &&
      derivedActiveKey.indexOf(uniqueKey!) > -1) as boolean
    return (
      <>
        <div
          className={classes('x-collapse-header', {
            disabled,
            active,
            ['with-arrow']: showArrow
          })}
          onClick={this.handleClickHeader}
        >
          {showArrow && (
            <span className="arrow-wrapper">
              <Icon name="arrow" style={{ width: '10px', height: '10px' }} />
            </span>
          )}

          {header}
        </div>
        <Unfold visible={active} vertical={true}>
          <div className={classes('x-collapse-body', className)} style={style}>
            {children}
          </div>
        </Unfold>
      </>
    )
  }
}

export default Panel

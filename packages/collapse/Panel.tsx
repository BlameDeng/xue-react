import * as React from 'react'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'
import Icon from '../icon/Icon'
import Unfold from '../transition/Unfold'

export interface PanelProps {
  header: string | React.ReactNode
  uniqueKey?: string
  disabled?: boolean
  showArrow?: boolean
  derivedActiveKey?: string[]
  onClick?: (key: string, e: React.MouseEvent<HTMLElement>) => any
  style?: React.CSSProperties
  className?: string
}

const componentName = 'Panel'

class Panel extends React.Component<PanelProps> {
  public static displayName = componentName

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

  public handleClickHeader: React.MouseEventHandler<HTMLElement> = e => {
    const { uniqueKey, onClick, disabled } = this.props
    if (disabled) {
      return
    }
    onClick!(uniqueKey!, e)
  }

  public render() {
    const cn = componentName
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
    const active = derivedActiveKey!.indexOf(uniqueKey!) > -1
    return (
      <>
        <div
          className={classes(cn, 'header', {
            disabled,
            active,
            'with-arrow': showArrow
          })}
          onClick={this.handleClickHeader}
        >
          {showArrow && (
            <span className="arrow-wrapper">
              <Icon name="arrow" size={10} />
            </span>
          )}
          {header}
        </div>
        <Unfold visible={active} vertical={true}>
          <div className={classes(cn, 'body', [className])} style={style}>
            {children}
          </div>
        </Unfold>
      </>
    )
  }
}

export default Panel

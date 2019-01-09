import * as React from 'react'
import * as PropTypes from 'prop-types'
import { classes, Wave } from '../utils'
import Icon from '../icon/Icon'
import ButtonGroup from './ButtonGroup'
import '../style/Button.scss'

interface IButtonProps {
  icon?: string
  position?: 'left' | 'right'
  size?: 'small' | 'medium' | 'large'
  type?: 'default' | 'dashed' | 'primary' | 'danger'
  ghost?: boolean
  htmlType?: 'button' | 'submit' | 'reset'
  loading?: boolean
  onClick?: React.MouseEventHandler
  style?: React.CSSProperties
  className?: string
  disabled?: boolean
  onMouseEnter?: React.MouseEventHandler
  onMouseLeave?: React.MouseEventHandler
  onFocus?: React.FocusEventHandler
  onBlur?: React.FocusEventHandler
}

class Button extends React.Component<IButtonProps> {
  public static displayName = 'Button'

  public static Group: typeof ButtonGroup = ButtonGroup

  public static propTypes = {
    icon: PropTypes.string,
    position: PropTypes.oneOf(['left', 'right']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    type: PropTypes.oneOf(['default', 'dashed', 'primary', 'danger']),
    ghost: PropTypes.bool,
    htmlType: PropTypes.oneOf(['button', 'submit', 'reset']),
    loading: PropTypes.bool,
    onClick: PropTypes.func,
    style: PropTypes.object,
    className: PropTypes.string,
    disabled: PropTypes.bool
  }

  public static defaultProps = {
    position: 'left',
    size: 'medium',
    type: 'default',
    ghost: false,
    htmlType: 'button',
    loading: false,
    disabled: false
  }

  public render() {
    const {
      icon,
      position,
      size,
      type,
      htmlType,
      ghost,
      loading,
      style,
      className,
      disabled,
      onClick,
      onBlur,
      onFocus,
      onMouseEnter,
      onMouseLeave
    } = this.props
    const buttonClassName = classes(
      'x-button',
      position,
      size,
      type,
      className,
      {
        ghost,
        disabled
      }
    )

    return (
      <Wave>
        <button
          className={buttonClassName}
          onClick={onClick}
          style={style}
          type={htmlType}
          disabled={disabled}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onBlur={onBlur}
          onFocus={onFocus}
        >
          {loading ? (
            <Icon name="loading" className={`button-icon loading ${size}`} />
          ) : (
            icon && <Icon name={icon} className={`button-icon ${size}`} />
          )}
          <span className="button-inner">{this.props.children}</span>
        </button>
      </Wave>
    )
  }
}

export default Button

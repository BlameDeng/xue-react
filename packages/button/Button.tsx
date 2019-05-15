import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Wave, classes } from '../utils'
import Icon from '../icon/Icon'
import './style'

export interface ButtonProps {
  icon?: string
  position?: 'left' | 'right'
  size?: 'small' | 'medium' | 'large'
  type?: 'default' | 'dashed' | 'primary' | 'danger'
  ghost?: boolean
  htmlType?: 'button' | 'submit' | 'reset'
  loading?: boolean
  onClick?: React.MouseEventHandler
  disabled?: boolean
  onMouseEnter?: React.MouseEventHandler
  onMouseLeave?: React.MouseEventHandler
  onFocus?: React.FocusEventHandler
  onBlur?: React.FocusEventHandler
  className?: string
  style?: React.CSSProperties
}

const componentName = 'Button'

class Button extends React.Component<ButtonProps> {
  public static displayName = componentName

  public static defaultProps = {
    position: 'left',
    size: 'medium',
    type: 'default',
    ghost: false,
    htmlType: 'button',
    loading: false,
    disabled: false
  }

  public static propTypes = {
    icon: PropTypes.string,
    position: PropTypes.oneOf(['left', 'right']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    type: PropTypes.oneOf(['default', 'dashed', 'primary', 'danger']),
    ghost: PropTypes.bool,
    htmlType: PropTypes.oneOf(['button', 'submit', 'reset']),
    loading: PropTypes.bool,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object
  }

  public renderIcon = () => {
    const { icon, size, loading } = this.props
    const className = classes(componentName, 'icon', [size], { loading })
    return loading ? (
      <Icon name="loading" className={className} />
    ) : (
      icon && <Icon name={icon} className={className} />
    )
  }

  public render() {
    const cn = componentName
    const {
      position,
      icon,
      loading,
      size,
      type,
      htmlType,
      ghost,
      style,
      className,
      disabled,
      children,
      ...rest
    } = this.props
    const buttonClassName = classes(cn, '', [position, size, type, className], {
      ghost,
      disabled
    })

    return (
      <Wave>
        <button
          className={buttonClassName}
          style={style}
          type={htmlType}
          disabled={disabled}
          {...rest}
        >
          {this.renderIcon()}
          <span className={classes(cn, 'inner')}>{children}</span>
        </button>
      </Wave>
    )
  }
}

export default Button

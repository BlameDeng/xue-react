import * as React from 'react'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'

export interface OptionProps {
  value: any
  checkedValue?: any
  onClick?: (checkedValue: any, e: React.MouseEvent) => any
  radioStyle?: 'radio' | 'button'
  disabled?: boolean
  vertical?: boolean
  className?: string
  style?: React.CSSProperties
}

const componentName = 'Option'

class Option extends React.Component<OptionProps> {
  public static displayName = componentName

  public static defaultProps = {
    disabled: false,
    vertical: false
  }

  public static propTypes = {
    value: PropTypes.any.isRequired,
    checkedValue: PropTypes.any,
    onClick: PropTypes.func,
    radioStyle: PropTypes.oneOf(['radio', 'button']),
    disabled: PropTypes.bool,
    vertical: PropTypes.bool
  }

  public handleClick: React.MouseEventHandler = e => {
    const { value, onClick, disabled } = this.props
    if (disabled || !onClick) {
      return
    }
    onClick(value, e)
  }

  public render() {
    const cn = componentName
    const {
      radioStyle,
      disabled,
      vertical,
      value,
      checkedValue,
      children
    } = this.props
    const optionClassName = classes(cn, '', [radioStyle + '-style'], {
      checked: value === checkedValue,
      disabled,
      vertical
    })
    return radioStyle === 'radio' ? (
      <label className={optionClassName} onClick={this.handleClick}>
        <span className="label-dot" />
        <div className="label-text">{children}</div>
      </label>
    ) : (
      <label className={optionClassName} onClick={this.handleClick}>
        <div className="label-text">{children}</div>
      </label>
    )
  }
}

export default Option

import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Wave, classes } from '../utils'

interface IOptionProps {
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

class Option extends React.Component<IOptionProps> {
  public static displayName = componentName

  public static propTypes = {
    value: PropTypes.any.isRequired,
    checkedValue: PropTypes.any,
    onClick: PropTypes.func,
    radioStyle: PropTypes.oneOf(['radio', 'button']),
    disabled: PropTypes.bool,
    vertical: PropTypes.bool
  }

  public static defaultProps = {
    disabled: false,
    vertical: false
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
        <Wave closeWave={value === checkedValue}>
          <span className="label-dot" />
        </Wave>
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

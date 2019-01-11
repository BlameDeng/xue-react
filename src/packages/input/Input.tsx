import * as React from 'react'
import * as PropTypes from 'prop-types'
import Icon from '../icon/Icon'
import Textarea from './Textarea'
import Search from './Search'
import { classes } from '../utils'
import '../style/Input.scss'

interface IInputProps {
  value?: string
  defaultValue?: string
  placeholder?: string
  style?: React.CSSProperties
  className?: string
  onChange?: React.ChangeEventHandler
  onKeyDown?: React.KeyboardEventHandler
  onPressEnter?: React.KeyboardEventHandler
  onFocus?: React.FocusEventHandler
  onBlur?: React.FocusEventHandler
  addonBefore?: string | React.ReactNode
  addonAfter?: string | React.ReactNode
  prefix?: string | React.ReactNode
  suffix?: string | React.ReactNode
  disabled?: boolean
  error?: boolean
}

interface IInputState {
  derivedValue: string
}

class Input extends React.Component<IInputProps, IInputState> {
  public static displayName = 'Input'

  public static Textarea: typeof Textarea = Textarea
  public static Search: typeof Search = Search

  public static propTypes = {
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    onPressEnter: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    addonBefore: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    addonAfter: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    disabled: PropTypes.bool,
    error: PropTypes.bool
  }

  public static defaultProps = {
    disabled: false,
    error: false
  }

  public static getDerivedStateFromProps(
    nextProps: IInputProps,
    prevState: IInputState
  ) {
    const { value } = nextProps
    const { derivedValue } = prevState
    if ('value' in nextProps && value !== derivedValue) {
      return { derivedValue: value }
    }
    return null
  }

  constructor(props: IInputProps) {
    super(props)
    this.state = {
      derivedValue: props.defaultValue || ''
    }
  }

  public handleChange: React.ChangeEventHandler = e => {
    const { onChange } = this.props
    if (onChange) {
      onChange(e)
    }
    const target = e.target as HTMLInputElement
    this.setState({
      derivedValue: target.value
    })
  }

  public handleKeyDown: React.KeyboardEventHandler = e => {
    const { onPressEnter, onKeyDown } = this.props
    if (onPressEnter && e.keyCode === 13) {
      onPressEnter(e)
    }
    if (onKeyDown) {
      onKeyDown(e)
    }
  }

  public render() {
    const {
      placeholder,
      style,
      className,
      addonBefore,
      addonAfter,
      prefix,
      suffix,
      disabled,
      error,
      onFocus,
      onBlur
    } = this.props
    const { derivedValue } = this.state
    const labelClassName = classes('x-input-wrapper', className, {
      disabled,
      error,
      prefix: !!prefix,
      suffix: !!suffix,
      ['addon-before']: !!addonBefore,
      ['addon-after']: !!addonAfter
    })
    return (
      <label className={labelClassName}>
        {addonBefore && (
          <div className="addon-before-wrapper">
            {typeof addonBefore === 'string' ? (
              <span className="before-string">{addonBefore}</span>
            ) : (
              addonBefore
            )}
          </div>
        )}
        {prefix && (
          <span className="prefix-wrapper">
            {typeof prefix === 'string' ? (
              <Icon
                name={prefix}
                fill="rgba(0,0,0,0.25)"
                style={{ width: '16px', height: '16px' }}
              />
            ) : (
              prefix
            )}
          </span>
        )}
        <input
          className="x-input"
          type="text"
          placeholder={placeholder || ''}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          value={derivedValue}
          onFocus={onFocus}
          onBlur={onBlur}
          style={style}
          disabled={disabled}
        />
        {suffix && (
          <span className="suffix-wrapper">
            {typeof suffix === 'string' ? (
              <Icon
                name={suffix}
                fill="rgba(0,0,0,0.25)"
                style={{ width: '16px', height: '16px' }}
              />
            ) : (
              suffix
            )}
          </span>
        )}
        {addonAfter && (
          <div className="addon-after-wrapper">
            {typeof addonAfter === 'string' ? (
              <span className="after-string">{addonAfter}</span>
            ) : (
              addonAfter
            )}
          </div>
        )}
      </label>
    )
  }
}

export default Input

import * as React from 'react'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'
import Icon from '../icon/Icon'
import Textarea from './Textarea'
import Search from './Search'
import './style'

interface IInputProps {
  value?: string
  defaultValue?: string
  placeholder?: string
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
  readonly?: boolean
  className?: string
  style?: React.CSSProperties
}

interface IInputState {
  derivedValue: string
}

const componentName = 'Input'

class Input extends React.Component<IInputProps, IInputState> {
  public static displayName = componentName

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
    error: PropTypes.bool,
    readonly: PropTypes.bool
  }

  public static defaultProps = {
    disabled: false,
    error: false,
    readonly: false
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

  private inputRef: HTMLInputElement

  constructor(props: IInputProps) {
    super(props)
    this.state = {
      derivedValue: props.defaultValue || ''
    }
  }

  public handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const { onChange } = this.props
    if (onChange) {
      onChange(e)
    }
    this.setState({
      derivedValue: e.target.value
    })
  }

  public handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
    const { onPressEnter, onKeyDown } = this.props
    if (onPressEnter && e.keyCode === 13) {
      onPressEnter(e)
    }
    if (onKeyDown) {
      onKeyDown(e)
    }
  }

  public saveInputRef = (node: HTMLInputElement) => {
    this.inputRef = node
  }

  public focus = () => {
    this.inputRef.focus()
  }

  public blur = () => {
    this.inputRef.blur()
  }

  public render() {
    const cn = componentName
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
      onBlur,
      readonly
    } = this.props
    const { derivedValue } = this.state
    const labelClassName = classes(cn, 'wrapper', [className], {
      disabled,
      error,
      prefix: !!prefix,
      suffix: !!suffix,
      'addon-before': !!addonBefore,
      'addon-after': !!addonAfter
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
                style={{ fill: 'rgba(0,0,0,0.25)' }}
                size={16}
              />
            ) : (
              prefix
            )}
          </span>
        )}
        <input
          className="xue-input"
          type="text"
          placeholder={placeholder || ''}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          value={derivedValue}
          onFocus={onFocus}
          onBlur={onBlur}
          style={style}
          disabled={disabled}
          readOnly={readonly}
          ref={this.saveInputRef}
        />
        {suffix && (
          <span className="suffix-wrapper">
            {typeof suffix === 'string' ? (
              <Icon
                name={suffix}
                style={{ fill: 'rgba(0,0,0,0.25)' }}
                size={16}
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

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'
import { calculateNodeHeight, classes } from '../utils'

export interface Size {
  rows: number | string
  cols: number | string
}

export interface TextareaProps {
  size?: Size
  autosize?: boolean
  value?: string
  defaultValue?: string
  onPressEnter?: React.KeyboardEventHandler
  onChange?: React.ChangeEventHandler
  className?: string
  style?: React.CSSProperties
  placeholder?: string
}

export interface TextareaState {
  derivedValue: string
}

const componentName = 'Textarea'

class Textarea extends React.Component<TextareaProps, TextareaState> {
  public static displayName = componentName

  public static defaultProps = {
    autosize: false,
    placeholder: ''
  }

  public static propTypes = {
    size: PropTypes.object,
    autosize: PropTypes.bool,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    onPressEnter: PropTypes.func,
    onChange: PropTypes.func,
    style: PropTypes.object,
    placeholder: PropTypes.string
  }

  public static getDerivedStateFromProps(
    nextProps: TextareaProps,
    prevState: TextareaState
  ) {
    const { value } = nextProps
    const { derivedValue } = prevState
    if ('value' in nextProps && derivedValue !== value) {
      return { derivedValue: value }
    }
    return null
  }

  private textareaRef: HTMLTextAreaElement
  private originHeight: number

  constructor(props: TextareaProps) {
    super(props)
    this.state = {
      derivedValue: props.defaultValue || ''
    }
  }

  public componentDidMount() {
    const el = ReactDOM.findDOMNode(this) as HTMLTextAreaElement
    const { top, bottom } = el.getBoundingClientRect()
    this.originHeight = bottom - top
  }

  public handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = e => {
    const { onChange, autosize } = this.props
    if (onChange) {
      onChange(e)
    }
    this.setState({
      derivedValue: e.target.value
    })
    if (!autosize) {
      return
    }
    const hiddenHeight = calculateNodeHeight(this.textareaRef)
    if (hiddenHeight > this.originHeight) {
      this.textareaRef.style.height = hiddenHeight + 'px'
    }
  }

  public handleKeyDown: React.KeyboardEventHandler = e => {
    const { onPressEnter } = this.props
    if (e.keyCode === 13 && onPressEnter) {
      onPressEnter(e)
    }
  }

  public getTextareaRef = (textarea: HTMLTextAreaElement) => {
    this.textareaRef = textarea
  }

  public focus = () => {
    this.textareaRef.focus()
  }

  public blur = () => {
    this.textareaRef.blur()
  }

  public render() {
    const cn = componentName
    const { style, autosize, placeholder, size, className } = this.props
    const { derivedValue } = this.state
    const textareaClassName = classes(cn, '', [className], {
      autosize
    })
    return (
      <textarea
        value={derivedValue}
        onChange={this.handleChange}
        className={textareaClassName}
        style={style}
        ref={this.getTextareaRef}
        placeholder={placeholder}
        cols={size ? Number(size.cols) : undefined}
        rows={size ? Number(size.rows) : undefined}
      />
    )
  }
}

export default Textarea

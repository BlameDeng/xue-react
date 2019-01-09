import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'
import { calculateNodeHeight, classes } from '../utils'

interface ISize {
  rows: number | string
  cols: number | string
}

interface ITextareaProps {
  size?: ISize
  autosize?: boolean
  value?: string
  defaultValue?: string
  onPressEnter?: React.KeyboardEventHandler
  onChange?: React.ChangeEventHandler
  className?: string
  style?: React.CSSProperties
  placeholder?: string
}

interface ITextareaState {
  derivedValue: string
}

class Textarea extends React.Component<ITextareaProps, ITextareaState> {
  public static displayName = 'Textarea'

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

  public static defaultProps = {
    autosize: false,
    placeholder: ''
  }

  public static getDerivedStateFromProps(
    nextProps: ITextareaProps,
    prevState: ITextareaState
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

  constructor(props: ITextareaProps) {
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

  public handleChange: React.ChangeEventHandler = e => {
    const { onChange, autosize } = this.props
    if (onChange) {
      onChange(e)
    }
    const target = e.target as HTMLTextAreaElement
    this.setState({
      derivedValue: target.value
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

  public render() {
    const { style, autosize, placeholder, size, className } = this.props
    const { derivedValue } = this.state
    const textareaClassName = classes('x-textarea', className, {
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

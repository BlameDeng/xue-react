import * as React from 'react'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'
import Star from './Star'
import './style'

export interface RateProps {
  value?: number
  defaultValue?: number
  onChange?: (value: number) => any
  onHoverChange?: (value: number) => any
  allowClear?: boolean
  allowHalf?: boolean
  disabled?: boolean
  tips?: string | React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export interface RateState {
  derivedValue: number
  hoverValue: number
}

const componentName = 'Rate'

class Rate extends React.Component<RateProps, RateState> {
  public static displayName = componentName

  public static defaultProps = {
    allowClear: false,
    allowHalf: false,
    disabled: false
  }

  public static propTypes = {
    value: PropTypes.number,
    defaultValue: PropTypes.number,
    onChange: PropTypes.func,
    onHoverChange: PropTypes.func,
    allowClear: PropTypes.bool,
    allowHalf: PropTypes.bool,
    disabled: PropTypes.bool,
    tips: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    className: PropTypes.string,
    style: PropTypes.object
  }

  public static getDerivedStateFromProps(
    nextProps: RateProps,
    prevState: RateState
  ) {
    const { value } = nextProps
    const { derivedValue } = prevState
    if ('value' in nextProps && value !== derivedValue) {
      return { derivedValue: value }
    }
    return null
  }

  constructor(props: RateProps) {
    super(props)
    this.state = {
      derivedValue: props.defaultValue || 0,
      hoverValue: 0
    }
  }

  // 调用回调
  public handleOnChange = (value: number) => {
    const { onChange } = this.props
    if (onChange) {
      onChange(value)
    }
  }

  // 监听点击星星
  public handleClickStar = (index: number, position: string) => {
    const { allowClear, allowHalf, disabled } = this.props
    const { derivedValue } = this.state
    if (disabled) {
      return
    }
    const newValue = index + (allowHalf && position === 'left' ? 0.5 : 1)
    // 允许清除
    if (allowClear) {
      if (derivedValue !== newValue) {
        this.setState({ derivedValue: newValue })
        this.handleOnChange(newValue)
      } else {
        this.setState({ derivedValue: 0, hoverValue: 0 })
        this.handleOnChange(0)
      }
      // 不允许清除
    } else {
      if (derivedValue !== newValue) {
        this.setState({
          derivedValue: newValue
        })
        this.handleOnChange(newValue)
      }
    }
  }

  // 调用回调
  public handleOnHoverChange = (value: number) => {
    const { onHoverChange } = this.props
    if (onHoverChange) {
      onHoverChange(value)
    }
  }

  // 监听鼠标移动
  public handleHover = (index: number, position: string) => {
    const { allowHalf, disabled } = this.props
    const { hoverValue } = this.state
    if (disabled) {
      return
    }
    // 半星
    if (allowHalf) {
      const newValue = index + (position === 'left' ? 0.5 : 1)
      if (hoverValue !== newValue) {
        this.setState({
          hoverValue: newValue
        })
        this.handleOnHoverChange(newValue)
      }
      // 非半星
    } else {
      if (hoverValue !== index + 1) {
        this.setState({
          hoverValue: index + 1
        })
        this.handleOnHoverChange(index + 1)
      }
    }
  }

  // 监听鼠标移出 star 容器
  public handleMouseLeave = () => {
    this.setState({ hoverValue: 0 })
    this.handleOnHoverChange(0)
  }

  public render() {
    const cn = componentName
    const { tips, className, style } = this.props
    const { hoverValue, derivedValue } = this.state
    return (
      <div className={classes(cn, '', [className])} style={style}>
        <ul
          className={classes(cn, 'star-container')}
          onMouseLeave={this.handleMouseLeave}
        >
          {Array.from({ length: 5 }, (val, n) => `item-${n}`).map(
            (item, index) => (
              <Star
                count={hoverValue || derivedValue}
                index={index}
                handleHover={this.handleHover}
                handleClick={this.handleClickStar}
                key={item}
              />
            )
          )}
        </ul>
        {tips && <div className={classes(cn, 'tips')}>{tips}</div>}
      </div>
    )
  }
}

export default Rate

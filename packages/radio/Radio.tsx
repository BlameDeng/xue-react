import * as React from 'react'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'
import './style'

export interface RadioProps {
  value?: any
  defaultValue?: any
  onChange?: (checkedValue: any, e: React.MouseEvent) => any
  vertical?: boolean
  radioStyle?: 'radio' | 'button'
  className?: string
  style?: React.CSSProperties
}

export interface RadionState {
  checkedValue: any
}

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

const componentName = 'Radio'

class Radio extends React.Component<RadioProps, RadionState> {
  public static displayName = componentName

  public static defaultProps = {
    vertical: false,
    radioStyle: 'radio'
  }

  public static propTypes = {
    defaultValue: PropTypes.any,
    onChange: PropTypes.func,
    vertical: PropTypes.bool,
    radioStyle: PropTypes.oneOf(['radio', 'button']),
    className: PropTypes.string,
    style: PropTypes.object
  }

  public static getDerivedStateFromProps(
    nextProps: RadioProps,
    prevState: RadionState
  ) {
    const { value } = nextProps
    const { checkedValue } = prevState
    if ('value' in nextProps && value !== checkedValue) {
      return { checkedValue: value }
    }
    return null
  }

  constructor(props: RadioProps) {
    super(props)
    this.state = {
      checkedValue: props.defaultValue
    }
  }

  public componentDidMount() {
    const { defaultValue } = this.props
    if (!('value' in this.props) && 'defaultValue' in this.props) {
      this.setState({ checkedValue: defaultValue })
    }
  }

  public renderChildren = () => {
    const { radioStyle, vertical, children } = this.props
    const { checkedValue } = this.state
    return React.Children.map(
      children,
      (child: React.ReactElement<OptionProps>) => {
        return React.cloneElement(child, {
          onClick: this.handleClick,
          checkedValue,
          radioStyle,
          vertical
        })
      }
    )
  }

  public handleClick: (checkedValue: any, e: React.MouseEvent) => any = (
    checkedValue,
    e
  ) => {
    if (checkedValue !== this.state.checkedValue) {
      this.setState({ checkedValue })
      if (this.props.onChange) {
        this.props.onChange(checkedValue, e)
      }
    }
  }

  public render() {
    const cn = componentName
    const { vertical, className, style } = this.props
    return (
      <div className={classes(cn, '', [className], { vertical })} style={style}>
        {this.renderChildren()}
      </div>
    )
  }
}

export default Radio

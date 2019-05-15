import * as React from 'react'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'
import './style'

export interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  size?: 'small' | 'default'
  onChange?: (checked: boolean, e: React.MouseEvent) => any
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
}

export interface SwitchState {
  derivedChecked: boolean
}

const componentName = 'Switch'

class Switch extends React.Component<SwitchProps, SwitchState> {
  public static displayName = componentName

  public static defaultProps = {
    size: 'default',
    defaultChecked: false,
    disabled: false
  }

  public static propTypes = {
    defaultChecked: PropTypes.bool,
    onChange: PropTypes.func,
    size: PropTypes.oneOf(['small', 'default']),
    disabled: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object
  }

  public static getDerivedStateFromProps(
    nextProps: SwitchProps,
    prevState: SwitchState
  ) {
    const { checked } = nextProps
    const { derivedChecked } = prevState
    if ('checked' in nextProps && checked !== derivedChecked) {
      return { derivedChecked: checked }
    }
    return null
  }

  constructor(props: SwitchProps) {
    super(props)
    this.state = {
      derivedChecked: props.defaultChecked || false
    }
  }

  public handleClick: React.MouseEventHandler = e => {
    const { disabled, onChange } = this.props
    if (disabled) {
      return
    }
    const { derivedChecked } = this.state
    this.setState({
      derivedChecked: !derivedChecked
    })

    if (onChange) {
      onChange(!derivedChecked, e)
    }
  }

  public render() {
    const cn = componentName
    const { size, disabled, style, className } = this.props
    const { derivedChecked } = this.state
    const switchClassName = classes(cn, '', [className, size], {
      checked: derivedChecked,
      disabled
    })
    return (
      <span
        className={switchClassName}
        onClick={this.handleClick}
        style={style}
      >
        <span className={classes(cn, 'core')} />
      </span>
    )
  }
}

export default Switch

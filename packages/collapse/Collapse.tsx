import * as React from 'react'
import * as PropTypes from 'prop-types'
import { arrayIsEqual, classes } from '../utils'
import './style'

export interface CollapseProps {
  activeKey?: string[]
  defaultActiveKey?: string[]
  accordion?: boolean
  showArrow?: boolean
  onChange?: (activeKey: string[], e: React.MouseEvent<HTMLElement>) => any
  className?: string
  style?: React.CSSProperties
}

export interface CollapseState {
  derivedActiveKey: string[]
}

export interface PanelProps {
  header: string | React.ReactNode
  uniqueKey?: string
  disabled?: boolean
  showArrow?: boolean
  activeKey?: string[]
  derivedActiveKey?: string[]
  onClick?: (key: string, e: React.MouseEvent<HTMLElement>) => any
  className?: string
  style?: React.CSSProperties
}

const componentName = 'Collapse'

class Collapse extends React.Component<CollapseProps, CollapseState> {
  public static displayName = componentName

  public static defaultProps = {
    accordion: false,
    showArrow: true
  }

  public static propTypes = {
    activeKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    defaultActiveKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    onChange: PropTypes.func,
    style: PropTypes.object,
    className: PropTypes.string
  }

  public static getDerivedStateFromProps(
    nextProps: CollapseProps,
    prevState: CollapseState
  ) {
    const { activeKey } = nextProps
    const { derivedActiveKey } = prevState
    if (!('activeKey' in nextProps) || activeKey === derivedActiveKey) {
      return null
    } else if (
      activeKey instanceof Array &&
      derivedActiveKey instanceof Array
    ) {
      const isEqual = arrayIsEqual(activeKey, derivedActiveKey)
      if (isEqual) {
        return null
      } else {
        return { derivedActiveKey: activeKey }
      }
    }
    return { derivedActiveKey: activeKey }
  }

  constructor(props: CollapseProps) {
    super(props)
    this.state = {
      derivedActiveKey: props.defaultActiveKey || []
    }
  }

  public handleClickHeader = (
    key: string,
    e: React.MouseEvent<HTMLElement>
  ) => {
    const { onChange, accordion } = this.props
    const { derivedActiveKey } = this.state
    // only one open
    if (accordion) {
      this.setState(
        {
          derivedActiveKey: derivedActiveKey!.indexOf(key) > -1 ? [] : [key]
        },
        () => {
          if (onChange) {
            onChange(this.state.derivedActiveKey, e)
          }
        }
      )
    } else {
      this.setState(
        {
          derivedActiveKey:
            derivedActiveKey!.indexOf(key) > -1
              ? derivedActiveKey!.filter((item: string) => item !== key)
              : [key, ...derivedActiveKey]
        },
        () => {
          if (onChange) {
            onChange(this.state.derivedActiveKey, e)
          }
        }
      )
    }
  }

  public renderChildren = () => {
    const { handleClickHeader } = this
    const { showArrow, children } = this.props
    const { derivedActiveKey } = this.state
    return React.Children.map(
      children,
      (child: React.ReactElement<PanelProps>) => {
        if (!child) {
          return null
        }
        const key = child.key as string
        return React.cloneElement(child, {
          derivedActiveKey,
          showArrow,
          uniqueKey: key,
          onClick: handleClickHeader
        })
      }
    )
  }

  public render() {
    const { className, style } = this.props
    return (
      <div className={classes(componentName, '', [className])} style={style}>
        {this.renderChildren()}
      </div>
    )
  }
}

export default Collapse

import * as React from 'react'
import * as PropTypes from 'prop-types'
import { isSimpleArrayEqual, classes } from '../utils'
import Panel from './Panel'
import '../style/Collapse.scss'

interface ICollapseProps {
  activeKey?: string[]
  defaultActiveKey?: string[]
  accordion?: boolean
  showArrow?: boolean
  onChange?: (activeKey: string[], e: React.MouseEvent) => any
  style?: React.CSSProperties
  className?: string
}

interface ICollapseState {
  derivedActiveKey: string[]
}

interface IPanelProps {
  header: string | React.ReactNode
  uniqueKey?: string
  disabled?: boolean
  showArrow?: boolean
  activeKey?: string[]
  derivedActiveKey?: string[]
  onClick?: (key: string, e: React.MouseEvent) => any
  style?: React.CSSProperties
  className?: string
}

class Collapse extends React.Component<ICollapseProps, ICollapseState> {
  public static displayName = 'Collapse'

  public static Panel: typeof Panel = Panel

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

  public static defaultProps = {
    accordion: false,
    showArrow: true
  }

  public static getDerivedStateFromProps(
    nextProps: ICollapseProps,
    prevState: ICollapseState
  ) {
    const { activeKey } = nextProps
    const { derivedActiveKey } = prevState
    if (!('activeKey' in nextProps) || activeKey === derivedActiveKey) {
      return null
    } else if (
      activeKey instanceof Array &&
      derivedActiveKey instanceof Array
    ) {
      const isEqual = isSimpleArrayEqual(activeKey, derivedActiveKey)
      if (isEqual) {
        return null
      } else {
        return { derivedActiveKey: activeKey }
      }
    }
    return { derivedActiveKey: activeKey }
  }

  constructor(props: ICollapseProps) {
    super(props)
    this.state = {
      derivedActiveKey: props.defaultActiveKey || []
    }
  }

  public handleClickHeader = (key: string, e: React.MouseEvent) => {
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
      (child: React.ReactElement<IPanelProps>) => {
        if (!child) {
          return null
        }
        const key = child.key as string
        return React.cloneElement(child, {
          derivedActiveKey: derivedActiveKey as string[],
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
      <div className={classes('x-collapse', className)} style={style}>
        {this.renderChildren()}
      </div>
    )
  }
}

export default Collapse

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'
import Transition from '../transition/Transition'
import './style'

export interface PopoveProps {
  content: string | React.ReactNode
  trigger?: 'click' | 'hover' | 'focus'
  position?: 'top' | 'left' | 'right' | 'bottom'
  defaultVisible?: boolean
  visible?: boolean
  popClosable?: boolean
  onVisibleChange?: (visible: boolean) => any
  className?: string
  style?: React.CSSProperties
}

export interface PopoveState {
  derivedVisible: boolean
}

const componentName = 'Popover'

class Popover extends React.Component<PopoveProps, PopoveState> {
  public static displayName = componentName

  public static defaultProps = {
    trigger: 'hover',
    position: 'top',
    defaultVisible: false,
    popClosable: false
  }

  public static propTypes = {
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
      .isRequired,
    trigger: PropTypes.oneOf(['click', 'hover', 'focus']),
    position: PropTypes.oneOf(['top', 'left', 'right', 'bottom']),
    defaultVisible: PropTypes.bool,
    visible: PropTypes.bool,
    onVisibleChange: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    popClosable: PropTypes.bool
  }

  public static getDerivedStateFromProps(
    nextProps: PopoveProps,
    prevState: PopoveState
  ) {
    const { visible } = nextProps
    if ('visible' in nextProps) {
      return { derivedVisible: visible }
    }
    return null
  }
  private triggerNode: HTMLElement
  private wrapperRef: HTMLDivElement
  private contentRef: HTMLDivElement
  private arrowRef: HTMLDivElement
  private delay: number = 200
  private timeout: any

  constructor(props: PopoveProps) {
    super(props)
    this.state = {
      derivedVisible: props.defaultVisible as boolean
    }
  }

  public componentDidMount() {
    if (this.state.derivedVisible) {
      this.locateContent()
      this.setArrowBorderColor()
    }
  }

  public componentDidUpdate(prevProps: PopoveProps, prevState: PopoveState) {
    const { derivedVisible: prevDerivedVisible } = prevState
    const { derivedVisible } = this.state
    const { trigger } = this.props
    // false => true，打开，定位
    if (!prevDerivedVisible && derivedVisible) {
      this.locateContent()
      this.setArrowBorderColor()
      // 触发方式是 'click', 监听
      if (trigger === 'click') {
        document.addEventListener('click', this.handleClickDocument)
      }
    }
    // true => false，关闭，触发方式是 'click' 时移除监听
    if (prevDerivedVisible && !derivedVisible && trigger === 'click') {
      document.removeEventListener('click', this.handleClickDocument)
    }
  }

  public componentWillUnmount() {
    document.removeEventListener('click', this.handleClickDocument)
    if (this.timeout) {
      window.clearTimeout(this.timeout)
    }
  }

  public saveWrapperRef = (node: HTMLDivElement) => {
    this.wrapperRef = node
  }

  public saveContentRef = (node: HTMLDivElement) => {
    this.contentRef = node
  }

  public saveArrowRef = (node: HTMLDivElement) => {
    this.arrowRef = node
  }
  // 设置箭头图标颜色
  public setArrowBorderColor = () => {
    const { contentRef, arrowRef } = this
    const { position } = this.props
    if (!contentRef) {
      return
    }
    const color = window.getComputedStyle(contentRef).backgroundColor
    arrowRef.style.borderTopColor = color
    arrowRef.style.borderBottomColor = color
    arrowRef.style.borderLeftColor = color
    arrowRef.style.borderRightColor = color
    switch (position) {
      case 'top':
        arrowRef.style.borderTopColor = 'transparent'
        arrowRef.style.borderLeftColor = 'transparent'
        break
      case 'bottom':
        arrowRef.style.borderBottomColor = 'transparent'
        arrowRef.style.borderRightColor = 'transparent'
        break
      case 'left':
        arrowRef.style.borderBottomColor = 'transparent'
        arrowRef.style.borderLeftColor = 'transparent'
        break
      case 'right':
        arrowRef.style.borderTopColor = 'transparent'
        arrowRef.style.borderRightColor = 'transparent'
        break
      default:
        break
    }
  }
  // 定位 pop
  public locateContent = () => {
    const { wrapperRef, triggerNode } = this
    const {
      top: triggerTop,
      left: triggerLeft,
      right: triggerRight,
      bottom: triggerBottom
    } = triggerNode.getBoundingClientRect()
    const triggerWidth = triggerRight - triggerLeft
    const triggerHeight = triggerBottom - triggerTop
    const { scrollX, scrollY } = window
    const { position } = this.props
    switch (position) {
      case 'top':
        wrapperRef.style.left = triggerLeft + scrollX + triggerWidth / 2 + 'px'
        wrapperRef.style.top = triggerTop + scrollY + 'px'
        break
      case 'bottom':
        wrapperRef.style.left = triggerLeft + scrollX + triggerWidth / 2 + 'px'
        wrapperRef.style.top = triggerBottom + scrollY + 'px'
        break
      case 'left':
        wrapperRef.style.left = triggerLeft + scrollX + 'px'
        wrapperRef.style.top = triggerTop + triggerHeight / 2 + scrollY + 'px'
        break
      case 'right':
        wrapperRef.style.left = triggerRight + scrollX + 'px'
        wrapperRef.style.top = triggerTop + triggerHeight / 2 + scrollY + 'px'
        break
      default:
        break
    }
  }

  public handleClick: React.MouseEventHandler = e => {
    this.triggerNode = e.currentTarget as HTMLElement
    const { derivedVisible } = this.state
    const { trigger } = this.props
    if (!derivedVisible && trigger === 'click') {
      this.open()
    }
  }
  // 监听点击 document
  public handleClickDocument = (e: MouseEvent) => {
    const { popClosable } = this.props
    if (popClosable) {
      this.close()
      return
    }
    const target = e.target as HTMLElement
    if (!this.wrapperRef.contains(target)) {
      this.close()
    }
  }

  public handleMouseEnter: React.MouseEventHandler = e => {
    this.triggerNode = e.currentTarget as HTMLElement
    const { trigger } = this.props
    if (trigger === 'hover') {
      this.open()
      if (this.timeout) {
        window.clearTimeout(this.timeout)
        this.timeout = null
      }
    }
  }

  public handleMouseLeave: React.MouseEventHandler = e => {
    const { trigger } = this.props
    if (trigger === 'hover') {
      this.timeout = setTimeout(() => {
        this.close()
      }, this.delay)
    }
  }

  public handleMouseEnterPop: React.MouseEventHandler = e => {
    const { trigger } = this.props
    if (trigger === 'hover' && this.timeout) {
      window.clearTimeout(this.timeout)
      this.timeout = null
    }
  }

  public handleMouseLeavePop: React.MouseEventHandler = e => {
    const { trigger } = this.props
    if (trigger === 'hover' && !this.timeout) {
      this.timeout = setTimeout(() => {
        this.close()
      }, this.delay)
    }
  }

  public handleFocus: React.FocusEventHandler = e => {
    this.triggerNode = e.currentTarget as HTMLElement
    const { trigger } = this.props
    if (trigger === 'focus') {
      this.open()
    }
  }

  public handleBlur: React.FocusEventHandler = e => {
    const { trigger } = this.props
    if (trigger === 'focus') {
      this.close()
    }
  }

  public open = () => {
    this.setState({
      derivedVisible: true
    })
    const { onVisibleChange } = this.props
    if (onVisibleChange) {
      onVisibleChange(true)
    }
  }

  public close = () => {
    this.setState({
      derivedVisible: false
    })
    const { onVisibleChange } = this.props
    if (onVisibleChange) {
      onVisibleChange(false)
    }
  }
  // 获取监听 props
  public getChildrenEventHandlers = (): object => {
    const {
      handleClick: onClick,
      handleMouseEnter: onMouseEnter,
      handleMouseLeave: onMouseLeave,
      handleFocus: onFocus,
      handleBlur: onBlur
    } = this
    const { trigger } = this.props
    if (trigger === 'click') {
      return { onClick }
    } else if (trigger === 'hover') {
      return { onMouseEnter, onMouseLeave }
    }
    return { onFocus, onBlur }
  }
  // 渲染 children 时传递监听 props
  public renderChildren() {
    const { children } = this.props
    if (!children) {
      return null
    }
    return typeof children === 'string' ? (
      <span {...this.getChildrenEventHandlers()}>{children}</span>
    ) : (
      React.cloneElement(
        React.Children.only(children) as React.ReactElement<any>,
        this.getChildrenEventHandlers()
      )
    )
  }

  public render() {
    const cn = componentName
    const { content, position, className, style } = this.props
    const { derivedVisible } = this.state
    const wrapperClassName = classes(cn, 'content-wrapper', [
      'position-' + position
    ])
    const contentClassName = classes(cn, 'content', [className])
    return (
      <>
        <Transition
          visible={derivedVisible}
          beforeEnter={{ opacity: 0 }}
          afterEnter={{ opacity: 1 }}
        >
          <>
            {ReactDOM.createPortal(
              <div
                className={wrapperClassName}
                ref={this.saveWrapperRef}
                onMouseEnter={this.handleMouseEnterPop}
                onMouseLeave={this.handleMouseLeavePop}
              >
                <div
                  className={contentClassName}
                  style={style}
                  ref={this.saveContentRef}
                >
                  {content}
                  <div
                    className={classes(cn, 'content-arrow', [
                      `position-${position}`
                    ])}
                    ref={this.saveArrowRef}
                  />
                </div>
              </div>,
              document.body
            )}
          </>
        </Transition>
        {this.renderChildren()}
      </>
    )
  }
}

export default Popover

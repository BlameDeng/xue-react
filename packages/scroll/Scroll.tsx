import * as React from 'react'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'
import './style'

interface IScrollProps {
  scrollBarVisible?: boolean // 是否始终显示滚动条
  className?: string
  style?: React.CSSProperties
  trackClassName?: string
  trackStyle?: React.CSSProperties
  scrollBarClassName?: string
  scrollBarStyle?: React.CSSProperties
}

interface IScrollState {
  translateY: number
  visible: boolean // 是否显示滚动条
}

const componentName = 'Scroll'

class Scroll extends React.Component<IScrollProps, IScrollState> {
  public static displayName = componentName

  public static propTypes = {
    scrollBarVisible: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    trackClassName: PropTypes.string,
    trackStyle: PropTypes.object,
    scrollBarClassName: PropTypes.string,
    scrollBarStyle: PropTypes.object
  }

  public static defaultProps = {
    scrollBarVisible: false
  }

  public state = {
    translateY: 0,
    visible: true
  }

  private wrapperRef: HTMLDivElement
  private containerRef: HTMLDivElement
  private barRef: HTMLDivElement
  private wrapperHeight: number
  private contrainerHeight: number
  private barHeight: number
  private maxContainerScrollHeight: number
  private barStartTranslateY: number
  private maxBarScrollHeight: number
  private startClientY: number
  private mouseDown: boolean
  private mouseIn: boolean
  private userSelect: string | null
  private trackRef: HTMLDivElement

  public componentDidMount() {
    this.getEleHeight()
    if (!this.props.scrollBarVisible) {
      this.setState({
        visible: false
      })
    }
  }

  public componentDidUpdate(prevProps: IScrollProps, prevState: IScrollState) {
    const { translateY } = this.state
    if (prevState.translateY !== translateY) {
      this.updateBar(translateY)
    }
  }

  public componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
  }

  // 获取各个元素最新的高度、最大滚动高度等
  public getEleHeight = () => {
    const {
      top: wrapperTop,
      bottom: wrapperBottom
    } = this.wrapperRef.getBoundingClientRect()
    const {
      top: containerTop,
      bottom: containerBottom
    } = this.containerRef.getBoundingClientRect()
    const {
      top: barTop,
      bottom: barBottom
    } = this.barRef.getBoundingClientRect()
    this.wrapperHeight = wrapperBottom - wrapperTop
    this.contrainerHeight = containerBottom - containerTop
    this.barHeight = barBottom - barTop
    this.maxContainerScrollHeight = this.contrainerHeight - this.wrapperHeight
    this.maxBarScrollHeight = this.wrapperHeight - this.barHeight
  }

  public saveWrapperRef = (node: HTMLDivElement) => {
    this.wrapperRef = node
  }

  public saveContainerRef = (node: HTMLDivElement) => {
    this.containerRef = node
  }

  public saveBarRef = (node: HTMLDivElement) => {
    this.barRef = node
  }

  public saveTrackRef = (node: HTMLDivElement) => {
    this.trackRef = node
  }

  public handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    this.getEleHeight()
    e.preventDefault()
    const { translateY } = this.state
    const { deltaY } = e
    // 到顶了向上
    if (translateY === 0 && deltaY < 0) {
      return
      // 到底了向下
    } else if (
      Math.abs(translateY) + this.wrapperHeight >= this.contrainerHeight &&
      deltaY > 0
    ) {
      return
    }
    this.setState({
      translateY: this.getTranslateY(deltaY)
    })
  }

  // 设置 bar 的滚动距离
  public updateBar = (translateY: number) => {
    const barTranslateY =
      translateY *
      ((this.wrapperHeight - this.barHeight) /
        (this.contrainerHeight - this.wrapperHeight))
    this.barRef.style.transform = `translateY(${-barTranslateY}px)`
  }

  public getTranslateY = (deltaY: number): number => {
    const translateY = this.calculateTranslateYFromDeltaY(deltaY)
    if (translateY > 0) {
      return 0
    } else if (translateY < -this.maxContainerScrollHeight) {
      return -this.maxContainerScrollHeight
    }
    return translateY
  }

  public calculateTranslateYFromDeltaY = (deltaY: number): number => {
    const { translateY } = this.state
    // 向下 限速
    if (deltaY > 20) {
      return translateY - 20 * 3
      // 向上 限速
    } else if (deltaY < -20) {
      return translateY + 20 * 3
    } else {
      return translateY - deltaY * 3
    }
  }

  public handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    this.barStartTranslateY =
      this.barRef.getBoundingClientRect().top -
      this.wrapperRef.getBoundingClientRect().top
    this.startClientY = e.clientY
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
    this.mouseDown = true
    this.userSelect = this.containerRef.style.userSelect
    this.containerRef.style.userSelect = 'none'
  }

  // 点击后拖动距离 -barStartTranslateY -> maxBarScrollHeight-barStartTranslateY
  public handleMouseMove = (e: MouseEvent) => {
    this.getEleHeight()
    const { clientY } = e
    const deltaY = clientY - this.startClientY
    if (deltaY <= -this.barStartTranslateY) {
      this.setState({
        translateY: 0
      })
    } else if (deltaY >= this.maxBarScrollHeight - this.barStartTranslateY) {
      this.setState({
        translateY: -this.maxContainerScrollHeight
      })
    } else {
      this.setState({
        translateY:
          -this.maxContainerScrollHeight *
          ((this.barStartTranslateY + deltaY) / this.maxBarScrollHeight)
      })
    }
  }

  public handleMouseUp = (e: MouseEvent) => {
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
    this.mouseDown = false
    this.containerRef.style.userSelect = this.userSelect
    if (!this.mouseIn && this.state.visible && !this.props.scrollBarVisible) {
      this.setState({
        visible: false
      })
    }
  }

  public handleMouseEnter = () => {
    this.mouseIn = true
    if (this.wrapperHeight < this.contrainerHeight && !this.state.visible) {
      this.setState({
        visible: true
      })
    }
  }

  public handleMouseLeave = () => {
    this.mouseIn = false
    if (this.state.visible && !this.props.scrollBarVisible && !this.mouseDown) {
      this.setState({
        visible: false
      })
    }
  }

  // 点击 track 时滚动
  public handleClickTrack = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== this.trackRef) {
      return
    }
    this.getEleHeight()
    const distance = e.clientY - this.trackRef.getBoundingClientRect().top
    if (distance < this.maxBarScrollHeight) {
      this.setState({
        translateY:
          -this.maxContainerScrollHeight * (distance / this.maxBarScrollHeight)
      })
    } else {
      this.setState({
        translateY: -this.maxContainerScrollHeight
      })
    }
  }

  public render() {
    const cn = componentName
    const {
      className,
      style,
      trackClassName,
      trackStyle,
      scrollBarClassName,
      scrollBarStyle,
      children
    } = this.props
    const { translateY, visible } = this.state
    return (
      <div
        className={classes(cn, 'wrapper', [className])}
        onWheel={this.handleWheel}
        ref={this.saveWrapperRef}
        style={style}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div
          className={classes(cn, 'container')}
          ref={this.saveContainerRef}
          style={{ transform: `translateY(${translateY}px)` }}
        >
          {children}
        </div>
        <div
          className={classes(cn, 'track', [trackClassName], {
            visible
          })}
          onClick={this.handleClickTrack}
          ref={this.saveTrackRef}
          style={trackStyle}
        >
          <div
            className={classes(cn, 'bar', [scrollBarClassName])}
            ref={this.saveBarRef}
            onMouseDown={this.handleMouseDown}
            style={scrollBarStyle}
          />
        </div>
      </div>
    )
  }
}

export default Scroll

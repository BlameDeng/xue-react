import * as React from 'react'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'
import './style'

export interface ScrollProps {
  yBarVisible?: boolean // 是否始终显示垂直滚动条
  className?: string
  style?: React.CSSProperties
  yTrackClassName?: string
  yTrackStyle?: React.CSSProperties
  yBarClassName?: string
  yBarStyle?: React.CSSProperties
  onScroll?: (translateY: number) => any
}

export interface ScrollState {
  translateY: number
  yVisible: boolean // 是否显示垂直滚动条
}

const componentName = 'Scroll'

class Scroll extends React.Component<ScrollProps, ScrollState> {
  public static displayName = componentName

  public static defaultProps = {
    yBarVisible: false
  }

  public static propTypes = {
    yBarVisible: PropTypes.bool,
    xBarVisible: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    yTrackClassName: PropTypes.string,
    yTrackStyle: PropTypes.object,
    yBarClassName: PropTypes.string,
    yBarStyle: PropTypes.object
  }

  public state = {
    translateY: 0,
    yVisible: true
  }

  private wrapperRef: HTMLDivElement
  private containerRef: HTMLDivElement
  private yBarRef: HTMLDivElement
  private wrapperHeight: number
  private containerHeight: number
  private barHeight: number
  private maxContainerScrollHeight: number
  private barStartTranslateY: number
  private maxBarScrollHeight: number
  private startClientY: number
  private mouseDown: boolean
  private mouseIn: boolean
  private userSelect: string | null
  private yTrackRef: HTMLDivElement

  public componentDidMount() {
    this.getElRect()
    const { yBarVisible } = this.props
    const { yVisible } = this.state
    if (yBarVisible !== yVisible) {
      this.setState({
        yVisible: yBarVisible as boolean
      })
    }
  }

  public componentDidUpdate(prevProps: ScrollProps, prevState: ScrollState) {
    const { onScroll } = this.props
    const { translateY } = this.state
    if (prevState.translateY !== translateY) {
      this.updateBar(translateY)
      if (onScroll) {
        onScroll(translateY)
      }
    }
  }

  public componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
  }

  // 获取各个元素最新的宽高、最大滚动宽高等
  public getElRect = () => {
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
    } = this.yBarRef.getBoundingClientRect()
    // 高度
    this.wrapperHeight = wrapperBottom - wrapperTop
    this.containerHeight = containerBottom - containerTop
    this.barHeight = barBottom - barTop
    this.maxContainerScrollHeight = this.containerHeight - this.wrapperHeight
    this.maxBarScrollHeight = this.wrapperHeight - this.barHeight
  }

  public saveWrapperRef = (node: HTMLDivElement) => {
    this.wrapperRef = node
  }

  public saveContainerRef = (node: HTMLDivElement) => {
    this.containerRef = node
  }

  public saveYBarRef = (node: HTMLDivElement) => {
    this.yBarRef = node
  }

  public saveYTrackRef = (node: HTMLDivElement) => {
    this.yTrackRef = node
  }

  public handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    this.getElRect()
    e.preventDefault()
    const { translateY } = this.state
    const { deltaY } = e
    // 到顶了向上
    if (translateY === 0 && deltaY < 0) {
      return
      // 到底了向下
    } else if (
      Math.abs(translateY) + this.wrapperHeight >= this.containerHeight &&
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
        (this.containerHeight - this.wrapperHeight))
    this.yBarRef.style.transform = `translateY(${-barTranslateY}px)`
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
      this.yBarRef.getBoundingClientRect().top -
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
    this.getElRect()
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
    if (!this.mouseIn && this.state.yVisible && !this.props.yBarVisible) {
      this.setState({
        yVisible: false
      })
    }
  }

  // 鼠标进入 scroll 判断是否需要显示滚动条
  public handleMouseEnter = () => {
    this.mouseIn = true
    const { yVisible } = this.state
    if (!yVisible) {
      this.setState({
        yVisible: this.wrapperHeight < this.containerHeight
      })
    }
  }

  public handleMouseLeave = () => {
    this.mouseIn = false
    if (this.state.yVisible && !this.props.yBarVisible && !this.mouseDown) {
      this.setState({
        yVisible: false
      })
    }
  }

  // 点击 track 时滚动
  public handleClickTrack = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== this.yTrackRef) {
      return
    }
    this.getElRect()
    const distance =
      e.clientY -
      this.yTrackRef.getBoundingClientRect().top -
      this.barHeight / 2
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
      yTrackClassName,
      yTrackStyle,
      yBarClassName,
      yBarStyle,
      children
    } = this.props
    const { translateY, yVisible } = this.state
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
        {/* 垂直滚动条 */}
        <div
          className={classes(cn, 'y-track', [yTrackClassName], {
            'y-visible': yVisible
          })}
          onClick={this.handleClickTrack}
          ref={this.saveYTrackRef}
          style={yTrackStyle}
        >
          <div
            className={classes(cn, 'bar', [yBarClassName])}
            ref={this.saveYBarRef}
            onMouseDown={this.handleMouseDown}
            style={yBarStyle}
          />
        </div>
      </div>
    )
  }
}

export default Scroll

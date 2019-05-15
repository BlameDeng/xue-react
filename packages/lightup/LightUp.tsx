import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'
import Transition from '../transition/Transition'
import './style'

export interface Size {
  width: number
  height: number
}

export interface LightUpProps {
  src?: any
  imgClosable?: boolean
}

const componentName = 'LightUp'

class LightUp extends React.Component<LightUpProps> {
  public static displayName = componentName

  public static defaultProps = {
    imgClosable: false
  }

  public static propTypes = {
    src: PropTypes.string,
    imgClosable: PropTypes.bool
  }

  public state = {
    visible: false,
    x: 0, // 记录鼠标的点击位置，作为动画起点
    y: 0
  }

  private img: HTMLImageElement
  private size: Size
  private maskRef: HTMLDivElement
  private wrapperRef: HTMLDivElement

  public getImgSize = () => {
    this.img = ReactDOM.findDOMNode(this) as HTMLImageElement
    const { left, right, bottom, top } = this.img.getBoundingClientRect()
    this.size = {
      width: right - left,
      height: bottom - top
    }
  }

  public setWrapperSize = () => {
    const { maskRef, wrapperRef } = this
    const { left, right, top, bottom } = maskRef.getBoundingClientRect()
    const clientWidth = right - left
    const clientHeight = bottom - top
    const { width, height } = this.size
    // 以宽缩放
    if (clientWidth / width < clientHeight / height) {
      wrapperRef.style.width = clientWidth * 0.8 + 'px'
      wrapperRef.style.height = clientWidth * 0.8 * (height / width) + 'px'
      // 以高缩放
    } else {
      wrapperRef.style.height = clientHeight * 0.8 + 'px'
      wrapperRef.style.width = clientHeight * 0.8 * (width / height) + 'px'
    }
  }

  public handleClickImg: React.MouseEventHandler<HTMLImageElement> = e => {
    this.setState(
      {
        visible: true,
        x: e.clientX,
        y: e.clientY
      },
      this.setWrapperSize
    )
  }

  public handleClickNewImg = () => {
    if (this.props.imgClosable) {
      this.setState({
        visible: false
      })
    }
  }

  public saveMaskRef = (node: HTMLDivElement) => {
    this.maskRef = node
  }

  public saveWrapperRef = (node: HTMLDivElement) => {
    this.wrapperRef = node
  }

  public appendNewImg = (src: string, alt: string) => {
    const cn = componentName
    const { x, y, visible } = this.state
    return ReactDOM.createPortal(
      <>
        <Transition
          visible={visible}
          beforeEnter={{ opacity: 0 }}
          afterEnter={{ opacity: 1 }}
        >
          <div
            className={classes(cn, 'mask')}
            onClick={() => this.setState({ visible: false })}
            ref={this.saveMaskRef}
          />
        </Transition>
        <Transition
          visible={visible}
          beforeEnter={{
            transform: `translateX(-50%) translateY(-50%) scale(0)`,
            top: y + 'px',
            left: x + 'px'
          }}
          afterEnter={{
            transform: 'translateX(-50%) translateY(-50%) scale(1)',
            top: '50%',
            left: '50%'
          }}
        >
          <div className={classes(cn, 'img-wrapper')} ref={this.saveWrapperRef}>
            <img
              src={src}
              alt={alt}
              className={classes(cn, 'img')}
              onClick={this.handleClickNewImg}
            />
          </div>
        </Transition>
      </>,
      document.body
    )
  }

  public renderChildren = () => {
    const { src, children } = this.props
    const img = React.Children.only(children) as React.ReactElement<any>
    const { src: imgSrc, alt } = img.props
    return (
      <>
        {React.cloneElement(img, {
          onLoad: this.getImgSize,
          onClick: this.handleClickImg
        })}
        {this.appendNewImg(src || imgSrc, alt)}
      </>
    )
  }

  public render() {
    return this.renderChildren()
  }
}

export default LightUp

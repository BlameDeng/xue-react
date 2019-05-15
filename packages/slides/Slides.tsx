import * as React from 'react'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'
import './style'

export interface SlidesProps {
  duration?: number
  dots?: boolean
  className?: string
  style?: React.CSSProperties
  beforeChange?: (from: number, to: number) => any
  afterChange?: (current: number, from: number) => any
}

export interface SlidesState {
  hasTransitionClassName: boolean
  current: number
}

const componentName = 'Slides'

class Slides extends React.Component<SlidesProps, SlidesState> {
  public static displayName = componentName

  public static defaultProps = {
    duration: 0,
    dots: true
  }

  public static propTypes = {
    duration: PropTypes.number,
    dots: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    beforeChange: PropTypes.func,
    afterChange: PropTypes.func
  }

  public state = {
    hasTransitionClassName: true,
    current: 1
  }

  private containerRef: HTMLDivElement
  private isTransitioning: boolean = false
  private length: number = 0
  private prevIndex: number = 1
  private timeout: any

  public componentDidMount() {
    this.cloneNode()
    const { duration } = this.props
    this.containerRef.addEventListener(
      'transitionend',
      this.handleTransitionEnd
    )
    if (duration) {
      this.autoPlay()
    }
  }

  public componentWillUnmount() {
    const { containerRef, timeout } = this
    if (timeout) {
      window.clearTimeout(timeout)
    }
    containerRef.removeEventListener('transitionend', this.handleTransitionEnd)
  }

  public saveContinerRef = (ele: HTMLDivElement) => {
    this.containerRef = ele
  }

  public cloneNode() {
    const nodeList: HTMLElement[] = []
    this.containerRef.childNodes.forEach(node => {
      if (node.nodeType === 1) {
        const eleNode = node as HTMLElement
        nodeList.push(eleNode)
        eleNode.style['flex-shrink'] = 0
      }
    })
    this.length = nodeList.length
    // append the clone to container
    this.containerRef.append(nodeList[0].cloneNode(true))
    this.containerRef.prepend(nodeList[nodeList.length - 1].cloneNode(true))
  }

  public autoPlay() {
    const duration = this.props.duration as number
    const play = () => {
      this.next()
      this.timeout = setTimeout(() => {
        play()
      }, duration * 1000)
    }
    this.timeout = setTimeout(() => {
      play()
    }, duration * 1000)
  }

  public next() {
    const { length } = this
    const { current } = this.state
    if (current < length) {
      this.goTo(current + 1)
    } else {
      this.goTo(1)
    }
  }

  public prev() {
    const { length } = this
    const { current } = this.state
    if (current > 1) {
      this.goTo(current - 1)
    } else {
      this.goTo(length)
    }
  }

  public goTo(n: number) {
    const { current } = this.state
    if (n > this.length || n < 1 || n === current || this.isTransitioning) {
      return
    }
    this.prevIndex = current
    this.setCurrent(n)
  }

  public setCurrent(n: number) {
    if (!this.state.hasTransitionClassName) {
      this.setState({
        hasTransitionClassName: true
      })
    }
    this.isTransitioning = true
    if (n === this.length && this.prevIndex === 1) {
      this.controllContainer(0)
      // last => first
    } else if (n === 1 && this.prevIndex === this.length) {
      this.controllContainer(this.length + 1)
      // normal
    } else {
      this.controllContainer(n)
    }
    const { beforeChange } = this.props
    if (beforeChange) {
      beforeChange(this.state.current, n)
    }
    this.setState({
      current: n
    })
  }

  public handleTransitionEnd = () => {
    this.isTransitioning = false
    const { prevIndex, length } = this
    const { afterChange } = this.props
    const { current } = this.state
    if (afterChange) {
      afterChange(current, prevIndex)
    }
    // first => last
    if (current === length && prevIndex === 1) {
      this.setState(
        {
          hasTransitionClassName: false
        },
        () => this.controllContainer(length)
      )
      // last => first
    } else if (current === 1 && prevIndex === length) {
      this.setState(
        {
          hasTransitionClassName: false
        },
        () => {
          this.controllContainer(1)
        }
      )
    }
  }

  public controllContainer(n: number) {
    this.containerRef.style.transform = `translateX(${-100 * n}%)`
  }

  public handleMouseEnter: React.MouseEventHandler = () => {
    const { duration } = this.props
    const { timeout } = this
    if (duration && timeout) {
      window.clearTimeout(timeout)
    }
  }

  public handleMouseLeave: React.MouseEventHandler = () => {
    const { duration } = this.props
    if (duration) {
      this.autoPlay()
    }
  }

  public render() {
    const cn = componentName
    const { children, dots, className, style } = this.props
    const { hasTransitionClassName, current } = this.state
    const containerClassName = classes(cn, 'container', {
      'has-transition-class-name': hasTransitionClassName
    })
    return (
      <div
        className={classes(cn, '', [className])}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={style}
      >
        <div className={containerClassName} ref={this.saveContinerRef}>
          {children}
        </div>
        {dots && (
          <div className={classes(cn, 'dots-wrapper')}>
            {React.Children.map(children, (child, index) => (
              <span
                className={classes(cn, 'dot', {
                  active: current === index + 1
                })}
                onClick={() => this.goTo(index + 1)}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default Slides

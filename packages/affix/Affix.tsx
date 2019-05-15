import * as React from 'react'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'
import './style'

export interface AffixProps {
  distance?: number
  className?: string
  style?: React.CSSProperties
}

const componentName = 'Affix'

class Affix extends React.Component<AffixProps> {
  public static displayName = componentName

  public static defaultProps = {
    distance: 0
  }

  public static propTypes = {
    distance: PropTypes.number,
    className: PropTypes.string,
    style: PropTypes.object
  }

  private top: number = 0
  private wrapperRef: HTMLDivElement
  private affixRef: HTMLDivElement

  public componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    this.setTop()
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  public setTop = () => {
    if (window.scrollY === 0) {
      this.top = this.affixRef.getBoundingClientRect().top
      // 挂载时若窗口滚动不为 0，先滚动至 0
    } else {
      const { scrollX, scrollY } = window
      window.scrollTo(scrollX, 0)
      this.top = this.affixRef.getBoundingClientRect().top
      window.scrollTo(scrollX, scrollY)
    }
  }

  public handleScroll = () => {
    const { distance } = this.props
    if (window.scrollY > this.top - distance!) {
      const {
        top,
        bottom,
        left,
        right
      } = this.wrapperRef.getBoundingClientRect()
      this.wrapperRef.style.width = right - left + 'px'
      this.wrapperRef.style.height = bottom - top + 'px'
      this.wrapperRef.style.left = left + 'px'
      this.wrapperRef.style.top = distance + 'px'
      this.wrapperRef.style.position = 'fixed'
    } else {
      this.wrapperRef.style.position = 'static'
    }
  }

  public saveAffixRef = (node: HTMLDivElement) => {
    this.affixRef = node
  }

  public saveWrapperRef = (node: HTMLDivElement) => {
    this.wrapperRef = node
  }

  public render() {
    const cn = componentName
    const { distance, className, style, children, ...rest } = this.props
    return (
      <div className={classes(cn, '')} ref={this.saveAffixRef}>
        <div
          className={classes(cn, 'wrapper', [className])}
          ref={this.saveWrapperRef}
          style={style}
          {...rest}
        >
          {children}
        </div>
      </div>
    )
  }
}

export default Affix

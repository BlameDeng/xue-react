import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'

export interface WaterfallProps {
  width?: number
}

export interface WaterfallState {
  colCount: number
  gutter: number
}

const componentName = 'Waterfall'

class Waterfall extends React.Component<WaterfallProps, WaterfallState> {
  public static displayName = componentName

  public static defaultProps = {
    width: 200
  }

  public static propTypes = {
    width: PropTypes.number
  }

  private wrapperEl: HTMLDivElement

  public componentDidMount() {
    const nodeList: HTMLElement[] = []
    this.wrapperEl.childNodes.forEach(node => {
      if (node.nodeType === 1) {
        nodeList.push(node as HTMLElement)
        console.log(this.calculateNodeHeight(node as HTMLElement))
      }
    })
  }

  public saveWrapperEl = (node: HTMLDivElement) => {
    this.wrapperEl = node
  }

  // 计算列数和间隙
  public calculateColCountAndGutter = () => {
    const { width } = this.props
    const { left, right } = this.wrapperEl.getBoundingClientRect()
    const wrapperWidth = right - left
    const colCount = Math.floor(wrapperWidth / width!)
    const gutter = (wrapperWidth - width! * colCount) / (colCount - 1 || 1)
    this.setState({
      colCount,
      gutter
    })
  }

  // 计算单个元素的高度
  public calculateNodeHeight = (node: HTMLElement): number => {
    const { top, bottom } = node.getBoundingClientRect()
    return bottom - top
  }

  public render() {
    const cn = componentName
    const { children } = this.props
    return (
      <div className={classes(cn, 'container')} ref={this.saveWrapperEl}>
        {children}
      </div>
    )
  }
}
export default Waterfall

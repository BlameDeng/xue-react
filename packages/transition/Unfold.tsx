import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'

export interface UnfoldProps {
  visible: boolean
  vertical?: boolean
  transitionTime?: number
}

export interface TransitionEffect {
  vertical: string
  horizontal: string
}

export interface LeaveTo {
  vertical: React.CSSProperties
  horizontal: React.CSSProperties
}

export interface PrevCssProp {
  paddingLeft: string | null
  paddingRight: string | null
  paddingTop: string | null
  paddingBottom: string | null
  borderTopWidth: string | null
  borderBottomWidth: string | null
  borderLeftWidth: string | null
  borderRightWidth: string | null
  width: string | null
  height: string | null
  overflowX: string | null
  overflowY: string | null
  overflow: string | null
}

export interface PrevSize {
  width: string | null
  height: string | null
}

const componentName = 'Unfold'

class Unfold extends React.Component<UnfoldProps> {
  public static displayName = componentName

  public static defaultProps = {
    vertical: false,
    transitionTime: 0.3
  }

  public static propTypes = {
    visible: PropTypes.bool.isRequired,
    vertical: PropTypes.bool,
    transitionTime: PropTypes.number
  }

  private node: HTMLElement
  private monitored: boolean = false
  private nodeDisplay: any
  private rendered: boolean
  private transitionEffect: TransitionEffect = {
    vertical: '',
    horizontal: ''
  }
  private leaveTo: LeaveTo = {
    vertical: {
      paddingTop: '0',
      paddingBottom: '0',
      borderTopWidth: '0',
      borderBottomWidth: '0',
      height: '0'
    },
    horizontal: {
      paddingLeft: '0',
      paddingRight: '0',
      borderLeftWidth: '0',
      borderRightWidth: '0',
      width: '0'
    }
  }
  private prevCssProp: PrevCssProp = {
    paddingLeft: '',
    paddingRight: '',
    paddingTop: '',
    paddingBottom: '',
    borderTopWidth: '',
    borderBottomWidth: '',
    borderLeftWidth: '',
    borderRightWidth: '',
    width: '',
    height: '',
    overflowX: '',
    overflowY: '',
    overflow: ''
  }
  private prevSize: PrevSize = {
    width: null,
    height: null
  }

  public componentDidMount() {
    const { visible, transitionTime } = this.props
    if (visible) {
      this.rendered = true
    }
    this.transitionEffect = {
      vertical: `
      ${transitionTime}s height cubic-bezier(.645, .045, .355, 1), 
      ${transitionTime}s padding-top cubic-bezier(.645, .045, .355, 1), 
      ${transitionTime}s padding-bottom cubic-bezier(.645, .045, .355, 1)`,
      horizontal: `
      ${transitionTime}s width cubic-bezier(.645, .045, .355, 1), 
      ${transitionTime}s padding-left cubic-bezier(.645, .045, .355, 1), 
      ${transitionTime}s padding-right cubic-bezier(.645, .045, .355, 1)`
    }
    this.addTransitionListener()
  }

  public componentDidUpdate(prevProps: UnfoldProps, prevState: {}) {
    if (!this.monitored) {
      this.addTransitionListener()
    }
    const { visible: prevVisible } = prevProps
    const { visible } = this.props
    // to enter
    if (visible && !prevVisible) {
      this.rendered = true
      this.showNode()
      // to leave
    } else if (!visible && prevVisible) {
      this.hideNode()
    }
  }

  public componentWillUnmount() {
    if (this.node) {
      this.node.removeEventListener('transitionend', this.handleTransitionEnd)
    }
  }

  public addTransitionListener() {
    if (!ReactDOM.findDOMNode(this)) {
      return
    }
    this.node = ReactDOM.findDOMNode(this) as HTMLElement
    this.node.addEventListener('transitionend', this.handleTransitionEnd)
    this.monitored = true
    this.getNodeSize(this.node)
  }

  public getNodeSize(node: HTMLElement) {
    const display = node.style.display
    if (display === 'none') {
      node.style.display = ''
    }
    const { top, left, right, bottom } = node.getBoundingClientRect()
    const rectWidth = right - left
    const rectHeight = bottom - top
    const {
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingBottom,
      borderTopWidth,
      borderBottomWidth,
      borderLeftWidth,
      borderRightWidth,
      width,
      height,
      overflowX,
      overflowY,
      overflow
    } = node.style
    if (display === 'none') {
      node.style.display = display
    }
    this.prevCssProp = {
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingBottom,
      borderTopWidth,
      borderBottomWidth,
      borderLeftWidth,
      borderRightWidth,
      width: width || rectWidth + 'px',
      height: height || rectHeight + 'px',
      overflowX,
      overflowY,
      overflow
    }
    this.prevSize = {
      width,
      height
    }
  }

  public hideNode() {
    // 关闭时先获取最新的 node 数据
    this.getNodeSize(this.node)
    const { node, leaveTo, transitionEffect, prevCssProp } = this
    const { vertical } = this.props
    const {
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingBottom,
      borderTopWidth,
      borderBottomWidth,
      borderLeftWidth,
      borderRightWidth,
      width,
      height
    } = prevCssProp
    this.nodeDisplay = node.style.display
    node.style.overflowX = 'hidden'
    node.style.overflowY = 'hidden'
    node.style.overflow = 'hidden'
    if (vertical) {
      this.setNodeStyle(this.node, {
        transition: '',
        paddingTop,
        paddingBottom,
        borderTopWidth,
        borderBottomWidth,
        width,
        height
      })
      // inforce repaint
      this.node.getBoundingClientRect()
      this.setNodeStyle(this.node, {
        transition: transitionEffect.vertical,
        ...leaveTo.vertical
      })
    } else {
      this.setNodeStyle(this.node, {
        transition: '',
        paddingLeft,
        paddingRight,
        borderLeftWidth,
        borderRightWidth,
        width,
        height
      })
      // inforce repaint
      this.node.getBoundingClientRect()
      this.setNodeStyle(this.node, {
        transition: transitionEffect.horizontal,
        ...leaveTo.horizontal
      })
    }
  }

  public showNode() {
    const { node, leaveTo, transitionEffect, prevCssProp } = this
    const { vertical } = this.props
    const {
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingBottom,
      borderTopWidth,
      borderBottomWidth,
      borderLeftWidth,
      borderRightWidth,
      width,
      height
    } = prevCssProp

    node.style.display = this.nodeDisplay
    node.style.overflowX = 'hidden'
    node.style.overflowY = 'hidden'
    node.style.overflow = 'hidden'
    if (vertical) {
      this.setNodeStyle(this.node, {
        transition: '',
        ...leaveTo.vertical
      })
      // inforce repaint
      this.node.getBoundingClientRect()
      this.setNodeStyle(this.node, {
        transition: transitionEffect.vertical,
        paddingTop,
        paddingBottom,
        borderTopWidth,
        borderBottomWidth,
        height,
        width
      })
    } else {
      this.setNodeStyle(this.node, {
        transition: '',
        ...leaveTo.horizontal
      })
      // inforce repaint
      this.node.getBoundingClientRect()
      this.setNodeStyle(this.node, {
        transition: transitionEffect.horizontal,
        paddingLeft,
        paddingRight,
        borderLeftWidth,
        borderRightWidth,
        height,
        width
      })
    }
  }

  public setNodeStyle = (node: HTMLElement, cssProp: object) => {
    Object.keys(cssProp).forEach(key => {
      node.style[key] = cssProp[key]
    })
  }

  public handleTransitionEnd = (e: Event) => {
    const { visible } = this.props
    const { overflowX, overflowY, overflow } = this.prevCssProp
    const { width, height } = this.prevSize
    this.setNodeStyle(this.node, {
      overflowX,
      overflowY,
      overflow,
      width,
      height
    })
    if (!visible && this.node) {
      this.node.style.display = 'none'
    }
  }

  public render() {
    const { rendered } = this
    const { visible, children, vertical, transitionTime, ...rest } = this.props
    return (
      ((visible || rendered) &&
        React.cloneElement(children as React.ReactElement<{}>, rest)) ||
      null
    )
  }
}

export default Unfold

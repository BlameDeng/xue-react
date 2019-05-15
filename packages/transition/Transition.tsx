import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'

export interface TransitionProps {
  visible: boolean
  beforeEnter?: React.CSSProperties
  afterEnter?: React.CSSProperties
  beforeLeave?: React.CSSProperties
  afterLeave?: React.CSSProperties
  transitionActive?: React.CSSProperties
}

const componentName = 'Transition'

class Transition extends React.Component<TransitionProps> {
  public static displayName = componentName

  public static defaultProps = {
    transitionActive: {
      transition: '300ms all cubic-bezier(.645, .045, .355, 1)'
    }
  }

  public static propTypes = {
    visible: PropTypes.bool.isRequired,
    afterEnter: PropTypes.object,
    afterLeave: PropTypes.object,
    beforeEnter: PropTypes.object,
    beforeLeave: PropTypes.object,
    transitionActive: PropTypes.object
  }

  private node: HTMLElement
  private monitored: boolean = false
  private nodeDisplay: any
  private rendered: boolean

  public componentDidMount() {
    const { visible } = this.props
    if (visible) {
      this.rendered = true
    }
    this.addTransitionListener()
  }

  public componentDidUpdate(prevProps: TransitionProps, prevState: {}) {
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
  }

  public hideNode() {
    const {
      transitionActive,
      beforeLeave,
      afterLeave,
      beforeEnter,
      afterEnter
    } = this.props
    this.nodeDisplay = this.node.style.display
    this.setNodeStyle(this.node, {
      transition: '',
      ...(beforeLeave || afterEnter || {})
    })
    // inforce repaint
    this.node.getBoundingClientRect()
    this.setNodeStyle(this.node, {
      ...transitionActive,
      ...(afterLeave || beforeEnter || {})
    })
  }

  public showNode() {
    const {
      transitionActive,
      beforeLeave,
      afterLeave,
      beforeEnter,
      afterEnter
    } = this.props
    this.node.style.display = this.nodeDisplay
    this.setNodeStyle(this.node, {
      transition: '',
      ...(beforeEnter || afterLeave || {})
    })
    // inforce repaint
    this.node.getBoundingClientRect()
    this.setNodeStyle(this.node, {
      ...transitionActive,
      ...(afterEnter || beforeLeave || {})
    })
  }

  public setNodeStyle = (node: HTMLElement, cssProp: React.CSSProperties) => {
    Object.keys(cssProp).forEach(key => {
      node.style[key] = cssProp[key]
    })
  }

  public handleTransitionEnd = (e: Event) => {
    const { visible } = this.props
    if (!visible && this.node) {
      this.node.style.display = 'none'
    }
  }

  public render() {
    const { rendered } = this
    const {
      visible,
      children,
      afterEnter,
      afterLeave,
      beforeEnter,
      beforeLeave,
      transitionActive,
      ...rest
    } = this.props
    return (
      ((visible || rendered) &&
        React.cloneElement(children as React.ReactElement<{}>, rest)) ||
      null
    )
  }
}

export default Transition

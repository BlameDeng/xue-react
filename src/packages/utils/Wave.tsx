import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'
import { classes } from '.'
import '../style/wave.scss'

interface IWaveProps {
  closeWave?: boolean
}

class Wave extends React.Component<IWaveProps> {
  public static displayName = 'Wave'

  public static propTypes = {
    closeWave: PropTypes.bool
  }

  public static defaultProps = {
    closeWave: false
  }

  private node: HTMLElement
  private animating: boolean = false
  private originClassName: string
  private animatingClassName = 'xue-react-wave-animation-animating'

  public componentDidMount() {
    const node = ReactDOM.findDOMNode(this) as HTMLElement
    if (node.nodeType !== 1) {
      return
    }
    this.node = node
    this.bindAnimationEvent()
  }

  public componentWillUnmount() {
    if (this.node) {
      this.node.removeEventListener('click', this.animationStart)
      this.node.removeEventListener('animationend', this.animationEnd)
    }
  }

  public bindAnimationEvent() {
    this.node.addEventListener('click', this.animationStart)
  }

  public animationStart = () => {
    if (this.animating || this.props.closeWave) {
      return
    }
    this.animating = true
    this.originClassName = this.node.className
    this.node.className = classes('', [
      this.originClassName,
      this.animatingClassName
    ])
    this.node.addEventListener('animationend', this.animationEnd)
  }

  public animationEnd = () => {
    this.animating = false
    this.node.className = classes('', [this.originClassName])
  }

  public render() {
    const { closeWave, children, ...rest } = this.props
    return React.cloneElement(children as React.ReactElement<{}>, rest) || null
  }
}

export default Wave

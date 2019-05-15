import * as React from 'react'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'
import { info, success, warning, error, removeMessage } from './openMessage'
import Transition from '../transition/Transition'
import Icon from '../icon/Icon'
import './style'

export interface MessageProps {
  content: string | React.ReactNode
  mode: 'info' | 'success' | 'warning' | 'error'
  top: number
  duration: number
  showIcon: boolean
  messageId: string
  onClose?: () => any
  className?: string
  style?: React.CSSProperties
}

export interface MessageState {
  visible: boolean
}

export interface Options {
  content: string | React.ReactNode
  duration?: number
  top?: number
  showIcon?: boolean
  onClose?: () => any
  className?: string
  style?: React.CSSProperties
}

const componentName = 'Message'

class Message extends React.Component<MessageProps, MessageState> {
  public static displayName = componentName

  public static info: (options: Options) => any = info
  public static success: (options: Options) => any = success
  public static warning: (options: Options) => any = warning
  public static error: (options: Options) => any = error
  public static removeMessage: (messageId: string) => any = removeMessage

  public static propTypes = {
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    mode: PropTypes.oneOf(['info', 'success', 'warning', 'error']).isRequired,
    top: PropTypes.number.isRequired,
    duration: PropTypes.number,
    showIcon: PropTypes.bool,
    messageId: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object
  }

  public state = {
    visible: false
  }

  private closeTimeout: any
  private leaveTimeout: any

  public componentDidMount() {
    const { duration } = this.props
    this.setState({
      visible: true
    })
    if (duration) {
      this.closeTimeout = setTimeout(() => {
        this.close()
      }, duration * 1000)
    }
  }

  public componentWillUnmount() {
    const { closeTimeout, leaveTimeout } = this
    if (closeTimeout) {
      window.clearTimeout(closeTimeout)
    }
    if (leaveTimeout) {
      window.clearTimeout(leaveTimeout)
    }
  }

  public close = () => {
    this.setState({
      visible: false
    })
    this.leaveTimeout = setTimeout(() => {
      this.afterLeave()
    }, 300)
  }

  public afterLeave = () => {
    const { messageId, onClose } = this.props
    Message.removeMessage(messageId)
    if (onClose) {
      onClose()
    }
  }

  public render() {
    const cn = componentName
    const {
      mode,
      top,
      content,
      showIcon,
      duration,
      className,
      style
    } = this.props
    const { visible } = this.state
    return (
      <Transition
        visible={visible}
        beforeEnter={{
          transform: `translateX(-50%) translateY(${-top}px)`,
          opacity: 0
        }}
        afterEnter={{
          transform: `translateX(-50%) translateY(0)`,
          opacity: 1
        }}
      >
        <div
          className={classes(cn, '', [className], { 'with-icon': showIcon })}
          style={Object.assign({}, { top: `${top}px` }, style)}
        >
          <span className={classes(cn, 'icon-wrapper', [mode])}>
            <Icon name={mode} size={16} />
          </span>
          {content}
          {duration === 0 && (
            <span className={classes(cn, 'close')} onClick={this.close}>
              <Icon name="close" size={12} />
            </span>
          )}
        </div>
      </Transition>
    )
  }
}

export default Message

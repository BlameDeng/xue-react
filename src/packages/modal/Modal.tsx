import * as React from 'react'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'
import { openModal, removeModal } from './openModal'
import Transition from '../transition/Transition'
import Button from '../button/Button'
import '../style/Modal.scss'

interface IPromiseHandler {
  resolve: () => any
  reject: () => any
}

interface IModalProps {
  // common
  visible: boolean
  title?: string | React.ReactNode
  footer?: React.ReactNode
  mode?: 'declarative' | 'imperative'
  className?: string
  style?: React.CSSProperties
  didLeave?: () => any
  // the declarative mode only
  onConfirm?: (e: React.MouseEvent) => any
  onCancel?: (e: React.MouseEvent) => any
  onMask?: (e: React.MouseEvent) => any
  // the imperative mode only
  okText?: string
  okType?: 'default' | 'dashed' | 'primary' | 'danger'
  cancelText?: string
  cancelType?: 'default' | 'dashed' | 'primary' | 'danger'
  maskClosable?: boolean
  promiseHandler?: IPromiseHandler
  modalId?: string
  content?: string | React.ReactNode
}

interface IModalState {
  modalVisible: boolean
}

class Modal extends React.Component<IModalProps, IModalState> {
  public static displayName = 'Modal'

  public static openModal = openModal
  public static removeModal = removeModal

  public static propTypes = {
    visible: PropTypes.bool.isRequired,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    footer: PropTypes.element,
    mode: PropTypes.oneOf(['declarative', 'imperative']),
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    onMask: PropTypes.func,
    maskClosable: PropTypes.bool,
    promiseHandler: PropTypes.object,
    modalId: PropTypes.string,
    didLeave: PropTypes.func,
    okText: PropTypes.string,
    okType: PropTypes.oneOf(['default', 'dashed', 'primary', 'danger']),
    cancelText: PropTypes.string,
    cancelType: PropTypes.oneOf(['default', 'dashed', 'primary', 'danger']),
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    className: PropTypes.string,
    style: PropTypes.object
  }

  public static defaultProps = {
    mode: 'declarative',
    maskClosable: false,
    okText: '确 定',
    okType: 'primary',
    cancelText: '取 消',
    cancelType: 'default'
  }

  private timerId: any = null

  constructor(props: IModalProps) {
    super(props)
    this.state = {
      modalVisible: props.mode === 'declarative'
    }
  }

  public componentDidMount() {
    if (!this.state.modalVisible) {
      this.setState({
        modalVisible: true
      })
    }
  }

  public componentWillUnmount() {
    if (this.timerId) {
      window.clearTimeout(this.timerId)
    }
  }

  public closeModal = () => {
    this.setState(
      {
        modalVisible: false
      },
      () => {
        this.timerId = setTimeout(() => {
          this.afterLeave()
        }, 300)
      }
    )
  }

  public handleOnConfirm = (e: React.MouseEvent) => {
    const { onConfirm, mode, promiseHandler } = this.props
    if (mode === 'declarative') {
      this.timerId = setTimeout(() => {
        this.afterLeave()
      }, 300)
      if (onConfirm) {
        onConfirm(e)
      }
    }
    if (mode === 'imperative' && promiseHandler) {
      this.closeModal()
      promiseHandler.resolve()
    }
  }

  public handleOnCancel = (e: React.MouseEvent) => {
    const { onCancel, mode, promiseHandler } = this.props

    if (mode === 'declarative') {
      this.timerId = setTimeout(() => {
        this.afterLeave()
      }, 300)
      if (onCancel) {
        onCancel(e)
      }
    }
    if (mode === 'imperative' && promiseHandler) {
      this.closeModal()
      promiseHandler.reject()
    }
  }

  public handleOnMask = (e: React.MouseEvent) => {
    const { onMask, mode, promiseHandler, maskClosable } = this.props
    if (onMask) {
      onMask(e)
    }
    if (mode === 'imperative' && maskClosable && promiseHandler) {
      this.closeModal()
      promiseHandler.reject()
    }
  }

  public afterLeave = () => {
    const { modalId, didLeave } = this.props
    if (didLeave) {
      didLeave()
    }
    if (modalId) {
      Modal.removeModal(modalId)
    }
  }

  public render() {
    const {
      title,
      footer,
      visible,
      mode,
      content,
      okText,
      okType,
      cancelText,
      cancelType,
      className,
      style,
      children
    } = this.props
    const { modalVisible } = this.state
    return (
      <>
        <Transition
          visible={visible && modalVisible}
          beforeEnter={{ opacity: 0 }}
          afterEnter={{ opacity: 0.7 }}
        >
          <div className="x-modal-mask" onClick={this.handleOnMask} />
        </Transition>
        <Transition
          visible={visible && modalVisible}
          beforeEnter={{
            opacity: 0,
            transform: 'translateX(-50%) translateY(-50%) scale(0)',
            top: '50%'
          }}
          afterEnter={{
            opacity: 1,
            transform: 'translateX(-50%) translateY(-50%) scale(1)',
            top: '30%'
          }}
        >
          <div className={classes('x-modal-content', className)} style={style}>
            <div className="x-modal-header">{title || 'Modal'}</div>
            <div className="x-modal-body">
              {mode === 'declarative' ? children : content}
            </div>
            <div className="x-modal-footer">
              {footer || (
                <>
                  <Button
                    style={{ marginRight: '8px' }}
                    onClick={this.handleOnCancel}
                    type={cancelType}
                  >
                    {cancelText}
                  </Button>
                  <Button type={okType} onClick={this.handleOnConfirm}>
                    {okText}
                  </Button>
                </>
              )}
            </div>
          </div>
        </Transition>
      </>
    )
  }
}

export default Modal

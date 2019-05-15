import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'
import { openModal, removeModal } from './openModal'
import Transition from '../transition/Transition'
import Button from '../button/Button'
import './style'

export interface PromiseHandler {
  resolve: () => any
  reject: () => any
}

export interface ModalProps {
  // common
  visible: boolean
  title?: string | React.ReactNode
  footer?: React.ReactNode
  mode?: 'declarative' | 'imperative'
  className?: string
  style?: React.CSSProperties
  afterClose?: () => any
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
  promiseHandler?: PromiseHandler
  modalId?: string
  content?: string | React.ReactNode
}

interface ModalState {
  modalVisible: boolean
}

const componentName = 'Modal'

class Modal extends React.Component<ModalProps, ModalState> {
  public static displayName = componentName

  public static openModal = openModal

  public static removeModal = removeModal

  public static defaultProps = {
    mode: 'declarative',
    maskClosable: false,
    okText: '确 定',
    okType: 'primary',
    cancelText: '取 消',
    cancelType: 'default'
  }

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
    afterClose: PropTypes.func,
    okText: PropTypes.string,
    okType: PropTypes.oneOf(['default', 'dashed', 'primary', 'danger']),
    cancelText: PropTypes.string,
    cancelType: PropTypes.oneOf(['default', 'dashed', 'primary', 'danger']),
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    className: PropTypes.string,
    style: PropTypes.object
  }

  private timeout: any
  private bodyOverflow: string | null
  private bodyPaddingRight: string | null

  constructor(props: ModalProps) {
    super(props)
    this.state = {
      modalVisible: props.mode === 'declarative'
    }
  }

  public componentDidMount() {
    const { visible } = this.props
    const { modalVisible } = this.state
    if (visible && modalVisible) {
      this.bodyPaddingRight = document.body.style.paddingRight
    }
    if (!modalVisible) {
      this.setState({
        modalVisible: true
      })
    }
  }

  public componentDidUpdate(prevProps: ModalProps, prevState: ModalState) {
    const { mode, visible } = this.props
    const { modalVisible } = this.state
    // 声明式调用
    if (mode === 'declarative') {
      // false => true 打开
      if (!prevProps.visible && visible) {
        this.bodyOverflow = document.body.style.overflow
        this.bodyPaddingRight = document.body.style.paddingRight
        document.body.style.paddingRight = this.getScrollBarWidth() + 'px'
        document.body.style.overflow = 'hidden'
        // true => false 关闭
      }
      // 命令式调用
    } else if (mode === 'imperative') {
      if (!prevState.modalVisible && modalVisible) {
        this.bodyOverflow = document.body.style.overflow
        this.bodyPaddingRight = document.body.style.paddingRight
        document.body.style.paddingRight = this.getScrollBarWidth() + 'px'
        document.body.style.overflow = 'hidden'
      }
    }
  }

  public componentWillUnmount() {
    if (this.timeout) {
      window.clearTimeout(this.timeout)
    }
  }

  // 获取滚动条宽度
  public getScrollBarWidth = (): number => {
    return (
      window.innerWidth - document.body.clientWidth ||
      document.documentElement.clientHeight
    )
  }

  // 'imperative' 模式下关闭 modal
  public closeModal = () => {
    this.setState(
      {
        modalVisible: false
      },
      () => {
        this.timeout = setTimeout(() => {
          this.afterLeave()
        }, 300)
      }
    )
  }

  public handleOnConfirm = (e: React.MouseEvent) => {
    const { onConfirm, mode, promiseHandler } = this.props
    if (mode === 'declarative') {
      this.timeout = setTimeout(() => {
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
      this.timeout = setTimeout(() => {
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
    // 关闭后还原
    document.body.style.overflow = this.bodyOverflow
    document.body.style.paddingRight = this.bodyPaddingRight
    const { modalId, afterClose } = this.props
    if (afterClose) {
      afterClose()
    }
    if (modalId) {
      Modal.removeModal(modalId)
    }
  }

  public render() {
    const cn = componentName
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
    return ReactDOM.createPortal(
      <>
        <Transition
          visible={visible && modalVisible}
          beforeEnter={{ opacity: 0 }}
          afterEnter={{ opacity: 0.7 }}
        >
          <div className={classes(cn, 'mask')} onClick={this.handleOnMask} />
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
          <div className={classes(cn, 'content', [className])} style={style}>
            <div className={classes(cn, 'header')}>{title || 'Modal'}</div>
            <div className={classes(cn, 'body')}>
              {mode === 'declarative' ? children : content}
            </div>
            <div className={classes(cn, 'footer')}>
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
      </>,
      document.body
    )
  }
}

export default Modal

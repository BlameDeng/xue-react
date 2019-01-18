import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { uniqueId } from '../utils'
import Message from './Message'

interface IOptions {
  content: string | React.ReactNode
  duration?: number
  top?: number
  showIcon?: boolean
  onClose?: () => any
  className?: string
  style?: React.CSSProperties
}

const messageContainerMap = {}

function addMessageContainer(messageId: string, container: HTMLDivElement) {
  messageContainerMap[messageId] = container
}

function ensureUniqueMessage(messageId: string) {
  if (messageContainerMap[messageId]) {
    throw new Error(`Dunplicate messageId found: ${messageId}`)
  }
}

function openMessage(
  options: IOptions,
  mode: 'info' | 'success' | 'warning' | 'error'
) {
  const messageId = uniqueId('$xue-message$-')
  ensureUniqueMessage(messageId)
  const {
    content,
    duration = 3,
    top = 24,
    showIcon = true,
    onClose,
    className,
    style
  } = options
  const container = document.createElement('div')
  document.body.append(container)
  const messageInstance = React.createElement(
    Message as React.ComponentClass,
    {
      content,
      mode,
      duration,
      top,
      showIcon,
      messageId,
      onClose,
      className,
      style
    } as React.ClassAttributes<any>
  )
  ReactDOM.render(messageInstance, container)
  addMessageContainer(messageId, container)
}

export function removeMessage(messageId: string) {
  if (!messageContainerMap[messageId]) {
    return
  }
  const container = messageContainerMap[messageId]
  ReactDOM.unmountComponentAtNode(container)
  container.remove()
  delete messageContainerMap[messageId]
}

export function info(options: IOptions) {
  openMessage(options, 'info')
}

export function success(options: IOptions) {
  openMessage(options, 'success')
}

export function warning(options: IOptions) {
  openMessage(options, 'warning')
}

export function error(options: IOptions) {
  openMessage(options, 'error')
}

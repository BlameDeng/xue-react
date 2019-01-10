import * as React from 'react'
import * as PropTypes from 'prop-types'
import { classes } from 'src/packages/utils'
import Icon from 'src/packages/icon/Icon'
import Transition from 'src/packages/transition/Transition'
import Popover from 'src/packages/popover/Popover'
const Unfold = Transition.Unfold

interface ICodeProps {
  title: string
  description: string
}

interface ICodeState {
  codeVisible: boolean
}

class Code extends React.Component<ICodeProps, ICodeState> {
  public static displayName = 'Code'

  public state = {
    codeVisible: false
  }

  public toggleVisible = () => {
    this.setState({
      codeVisible: !this.state.codeVisible
    })
  }

  public render() {
    const { title, description, children } = this.props
    const { codeVisible } = this.state
    return (
      <div className="code-example-box">
        <div className="code-title">{title}</div>
        <div
          className={classes('code-description', {
            'code-visible': codeVisible
          })}
        >
          {description}
          <Popover content={<div className="pop-content-code-tips">{codeVisible?'Hide Code':'Show Code'}</div>} style={{ backgroundColor: '#000' }}>
            <span className="icon-wrapper" onClick={this.toggleVisible}>
              <Icon name="codepen" />
            </span>
          </Popover>
        </div>
        <Unfold vertical={true} visible={codeVisible}>
          <div className="code-example">{children}</div>
        </Unfold>
      </div>
    )
  }
}

export default Code

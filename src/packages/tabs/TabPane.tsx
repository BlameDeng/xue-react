import * as React from 'react'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'

interface ITabPaneProps {
  title: string | React.ReactNode
  active?: boolean
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
}

class TabPane extends React.Component<ITabPaneProps, {}> {
  public static displayName = 'TabPane'

  public static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    active: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    disabled: PropTypes.bool
  }

  public static defaultProps = {
    disabled: false
  }

  public render() {
    const { active, className, style, children } = this.props
    return (
      <li
        className={classes('x-tabs-pane', className, { active })}
        style={style}
      >
        {children}
      </li>
    )
  }
}

export default TabPane

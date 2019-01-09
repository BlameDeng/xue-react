import * as React from 'react'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'

interface IButtonGroupProps {
  className?: string
  style?: React.CSSProperties
}

class ButtonGroup extends React.Component<IButtonGroupProps> {
  public static displayName = 'ButtonGroup'

  public static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
  }

  public render() {
    const { className, style, children } = this.props
    return (
      <div className={classes('x-button-group', className)} style={style}>
        {children}
      </div>
    )
  }
}

export default ButtonGroup

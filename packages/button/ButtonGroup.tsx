import * as React from 'react'
import * as PropTypes from 'prop-types'
import classes from '../utils/classes'

export interface ButtonGroupProps {
  className?: string
  style?: React.CSSProperties
}

const componentName = 'ButtonGroup'

class ButtonGroup extends React.Component<ButtonGroupProps> {
  public static displayName = componentName

  public static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
  }

  public render() {
    const { className, style, children } = this.props
    return (
      <div className={classes(componentName, '', [className])} style={style}>
        {children}
      </div>
    )
  }
}

export default ButtonGroup

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'
import './style'
import { classes } from '../utils'

interface IRowProps {
  gutter?: number
}

interface IColProps {
  gutter?: number
  span?: number
  offset?: number
}

const componentName = 'Row'

class Row extends React.Component<IRowProps> {
  public static displayName = componentName

  public static propTypes = {
    gutter: PropTypes.number
  }

  public static defaultProps = {
    gutter: 0
  }

  public render() {
    const cn = componentName
    const { gutter, children, ...rest } = this.props
    return (
      <div
        className={classes(cn, '')}
        {...rest}
        style={{
          marginLeft: `${-gutter! / 2}px`,
          marginRight: `${-gutter! / 2}px`
        }}
      >
        {React.Children.map(children, child => {
          return React.cloneElement(child as React.ReactElement<IColProps>, {
            gutter
          })
        })}
      </div>
    )
  }
}

export default Row

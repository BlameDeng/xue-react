import * as React from 'react'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'
import './style'

interface IRowProps {
  gutter?: number
  className?: string
  style?: React.CSSProperties
}

interface IOptions {
  span: number
  offset?: number
}

interface IColProps {
  gutter?: number
  span?: number
  offset?: number
  sm?: IOptions
  md?: IOptions
  lg?: IOptions
  xl?: IOptions
  className?: string
  style?: React.CSSProperties
}

const componentName = 'Row'

class Row extends React.Component<IRowProps> {
  public static displayName = componentName

  public static defaultProps = {
    gutter: 0
  }

  public static propTypes = {
    gutter: PropTypes.number,
    className: PropTypes.string,
    style: PropTypes.object
  }

  public render() {
    const cn = componentName
    const { gutter, className, style, children, ...rest } = this.props
    return (
      <div
        className={classes(cn, '', [className])}
        {...rest}
        style={{
          marginLeft: `${-gutter! / 2}px`,
          marginRight: `${-gutter! / 2}px`,
          ...style
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

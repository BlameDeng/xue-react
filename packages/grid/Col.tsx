import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'

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
}

const componentName = 'Col'

class Col extends React.Component<IColProps> {
  public static displayName = componentName

  public static propTypes = {
    gutter: PropTypes.number,
    span: PropTypes.number,
    offset: PropTypes.number
  }

  public static defaultProps = {
    gutter: 0
  }

  public getColClassName = (): string[] => {
    const { span, offset = 0, children, ...options } = this.props
    const className = [`col-span-${span}`, `col-offset-${offset}`]
    Object.keys(options).forEach(key => {
      if (options[key]) {
        const { span: optionSpan, offset: optionOffset = 0 } = options[key]
        className.push(`${key}-col-span-${optionSpan}`)
        className.push(`${key}-col-offset-${optionOffset}`)
      }
    })
    return className
  }

  public render() {
    const cn = componentName
    const {
      gutter,
      span,
      offset,
      sm,
      md,
      lg,
      xl,
      children,
      ...rest
    } = this.props
    return (
      <div
        className={classes(cn, '', this.getColClassName())}
        {...rest}
        style={{
          paddingLeft: `${gutter! / 2}px`,
          paddingRight: `${gutter! / 2}px`
        }}
      >
        {children}
      </div>
    )
  }
}

export default Col

import * as React from 'react'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'
import '../utils/svg.js'
import './style'

export interface IconProps extends React.SVGAttributes<SVGElement> {
  name: string
  size?: number
  className?: string
  style?: React.CSSProperties
}

const componentName = 'Icon'

const Icon: React.FunctionComponent<IconProps> = props => {
  const { className, size, style, name, children, ...rest } = props
  return (
    <svg
      className={classes(componentName, '', [className])}
      aria-hidden="true"
      style={Object.assign({}, style, {
        width: size + 'px',
        height: size + 'px'
      })}
      {...rest}
    >
      <use xlinkHref={`#icon-${name}`} />
    </svg>
  )
}

Icon.displayName = componentName

Icon.defaultProps = {
  size: 16
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string
}

export default Icon

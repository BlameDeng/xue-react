import * as React from 'react'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'
import '../utils/svg.js'
import './style'

interface IIconProps {
  name: string
  onClick?: React.MouseEventHandler
  className?: string
  style?: React.CSSProperties
  size?: number
}

const componentName = 'Icon'

const Icon: React.FunctionComponent<IIconProps> = props => {
  const { className, size, style, onClick, name } = props
  return (
    <svg
      className={classes(componentName, '', [className])}
      aria-hidden="true"
      style={Object.assign({}, style, {
        width: size + 'px',
        height: size + 'px'
      })}
      onClick={onClick}
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

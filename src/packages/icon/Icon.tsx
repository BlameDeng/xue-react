import * as React from 'react'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'
import '../utils/svg.js'
import '../style/Icon.scss'

interface IIconProps {
  name: string
  fill?: string
  onClick?: React.MouseEventHandler
  className?: string
  style?: React.CSSProperties
}

const Icon: React.FunctionComponent<IIconProps> = props => {
  const { className, fill, style, onClick, name } = props
  const styleObj = style ? { fill, ...style } : { fill }
  return (
    <svg
      className={classes('x-icon', className)}
      aria-hidden="true"
      style={styleObj}
      onClick={onClick}
    >
      <use xlinkHref={`#icon-${name}`} />
    </svg>
  )
}

Icon.displayName = 'Icon'

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  fill: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string
}

Icon.defaultProps = {
  fill: 'currentColor'
}

export default Icon

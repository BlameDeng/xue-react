import * as React from 'react'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'
import Transition from '../transition/Transition'

export interface MenuItemProps {
  uniqueKey?: string
  selectedKey?: string
  expandKeys?: string[]
  handleSelectedKey?: (key: string) => any
  handleExpandKeys?: (key: string) => any
  className?: string
  style?: React.CSSProperties
  mode?: 'vertical' | 'horizontal'
  theme?: 'light' | 'dark'
}

const componentName = 'MenuItem'

class MenuItem extends React.Component<MenuItemProps> {
  public static displayName = componentName

  public static propTypes = {
    uniqueKey: PropTypes.string,
    selectedKey: PropTypes.string,
    expandKeys: PropTypes.arrayOf(PropTypes.string),
    mode: PropTypes.oneOf(['vertical', 'horizontal']),
    theme: PropTypes.oneOf(['light', 'dark']),
    onSelectedChange: PropTypes.func,
    onExpandChange: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object
  }

  public render() {
    const cn = componentName
    const {
      uniqueKey,
      selectedKey,
      handleSelectedKey,
      children,
      className,
      style,
      mode,
      theme
    } = this.props
    return (
      <li
        className={classes(cn, '', [className, theme, mode], {
          active: uniqueKey === selectedKey
        })}
        style={style}
        onClick={() => handleSelectedKey!(uniqueKey!)}
      >
        {children}
        {mode === 'vertical' && theme === 'light' && (
          <Transition
            visible={uniqueKey === selectedKey && mode === 'vertical'}
            beforeEnter={{ height: '0', top: '50%', opacity: 0 }}
            afterEnter={{ height: '100%', top: '0', opacity: 1 }}
          >
            <div className={classes(cn, 'filler')} />
          </Transition>
        )}
      </li>
    )
  }
}

export default MenuItem

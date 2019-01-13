import * as React from 'react'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'
import Icon from '../icon/Icon'
import Transition from '../transition/Transition'
const Unfold = Transition.Unfold

interface ISubMenuProps {
  uniqueKey?: string
  selectedKey?: string
  expandKeys?: string[]
  title: string | React.ReactNode
  showArrow?: boolean
  handleSelectedKey?: (key: string) => any
  handleExpandKeys?: (key: string) => any
  className?: string
  style?: React.CSSProperties
  mode?: 'vertical' | 'horizontal'
  theme?: 'light' | 'dark'
  itemGroup?: boolean
}

interface IChildProps {
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

class SubMenu extends React.Component<ISubMenuProps> {
  public static displayName = 'SubMenu'

  public static propTypes = {
    uniqueKey: PropTypes.string,
    selectedKey: PropTypes.string,
    expandKeys: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    mode: PropTypes.oneOf(['vertical', 'horizontal']),
    theme: PropTypes.oneOf(['light', 'dark']),
    onSelectedChange: PropTypes.func,
    onExpandChange: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    showArrow: PropTypes.bool,
    itemGroup: PropTypes.bool
  }

  public static defaultProps = {
    showArrow: true,
    itemGroup: false
  }

  public state = {
    childrenVisible: true
  }

  private childrenKeys: string[] = []

  public renderChildren = (): Array<React.ReactElement<IChildProps>> => {
    const {
      selectedKey,
      expandKeys,
      handleSelectedKey,
      handleExpandKeys,
      mode,
      theme,
      children
    } = this.props
    return React.Children.map(
      children,
      (child: React.ReactElement<IChildProps>, index: number) => {
        const uniqueKey = this.getUniqueKeyFromChild(child, index)
        this.childrenKeys.push(uniqueKey)
        return React.cloneElement(child, {
          uniqueKey,
          selectedKey,
          expandKeys,
          handleSelectedKey,
          handleExpandKeys,
          mode,
          theme
        })
      }
    )
  }

  public getUniqueKeyFromChild = (
    child: React.ReactElement<IChildProps>,
    index: number
  ): string => {
    return (child.key as string) || `item-${index}`
  }

  public handleClick: React.ReactEventHandler = e => {
    const { uniqueKey, handleExpandKeys, itemGroup } = this.props
    if (!itemGroup) {
      handleExpandKeys!(uniqueKey as string)
    }
  }

  public render() {
    const {
      uniqueKey,
      selectedKey,
      expandKeys,
      title,
      className,
      style,
      theme,
      mode,
      showArrow,
      itemGroup
    } = this.props
    const { childrenKeys } = this
    return (
      <li
        className={classes('x-sub-menu', theme, {
          active: expandKeys!.indexOf(uniqueKey!) > -1,
          ['item-group']: itemGroup
        })}
      >
        <div
          className={classes('x-sub-menu-title', className, mode, {
            active: expandKeys!.indexOf(uniqueKey!) > -1,
            ['child-selected']:
              childrenKeys && childrenKeys.indexOf(selectedKey as string) > -1
          })}
          style={style}
          onClick={this.handleClick}
        >
          {title}
          {showArrow && (
            <span className="x-sub-menu-title-icon-wrapper">
              <Icon name="arrow" style={{ width: '8px', height: '8px' }} />
            </span>
          )}
        </div>
        <Unfold
          vertical={true}
          visible={expandKeys!.indexOf(uniqueKey!) > -1 || itemGroup!}
        >
          <ul className="x-sub-menu-children-wrapper">
            {this.renderChildren()}
          </ul>
        </Unfold>
      </li>
    )
  }
}

export default SubMenu

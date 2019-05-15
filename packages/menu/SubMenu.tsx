import * as React from 'react'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'
import Icon from '../icon/Icon'
import Unfold from '../transition/Unfold'

export interface SubMenuProps {
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

export interface ChildProps {
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

const componentName = 'SubMenu'

class SubMenu extends React.Component<SubMenuProps> {
  public static displayName = componentName

  public static defaultProps = {
    showArrow: true,
    itemGroup: false
  }

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

  public state = {
    childrenVisible: true
  }

  private childrenKeys: string[] = []

  public renderChildren = (): Array<React.ReactElement<ChildProps>> => {
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
      (child: React.ReactElement<ChildProps>, index: number) => {
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
    child: React.ReactElement<ChildProps>,
    index: number
  ): string => {
    return (child.key as string) || `item-${index}`
  }

  public handleClick: React.ReactEventHandler = e => {
    const { uniqueKey, handleExpandKeys, itemGroup } = this.props
    if (!itemGroup) {
      handleExpandKeys!(uniqueKey!)
    }
  }

  public render() {
    const cn = componentName
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
        className={classes(cn, '', [theme], {
          active: expandKeys!.indexOf(uniqueKey!) > -1,
          'item-group': itemGroup
        })}
      >
        <div
          className={classes(cn, 'title', [className, mode], {
            active: expandKeys!.indexOf(uniqueKey!) > -1,
            'child-selected':
              childrenKeys && childrenKeys.indexOf(selectedKey!) > -1
          })}
          style={style}
          onClick={this.handleClick}
        >
          {title}
          {showArrow && (
            <span className={classes(cn, 'title-icon-wrapper')}>
              <Icon name="arrow" size={8} />
            </span>
          )}
        </div>
        <Unfold
          vertical={true}
          visible={expandKeys!.indexOf(uniqueKey!) > -1 || itemGroup!}
        >
          <ul className={classes(cn, 'children-wrapper')}>
            {this.renderChildren()}
          </ul>
        </Unfold>
      </li>
    )
  }
}

export default SubMenu

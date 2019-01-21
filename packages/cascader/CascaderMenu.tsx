import * as React from 'react'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'
import Icon from '../icon/Icon'

interface IOption {
  value: string
  label: string
  children?: IOption[]
  disabled?: boolean
}

interface ICascaderMenuProps {
  options: IOption[]
  level: number
  handleChangeValue: (option: IOption, level: number) => any
  valueArr: string[]
  itemClassName?: string
  itemStyle?: React.CSSProperties
}

interface ICascaderMenuState {
  currentOption: IOption | null
}

const componentName = 'CascaderMenu'

class CascaderMenu extends React.Component<
  ICascaderMenuProps,
  ICascaderMenuState
> {
  public static displayName = componentName

  public static propTypes = {
    options: PropTypes.arrayOf(PropTypes.object),
    level: PropTypes.number,
    handleChangeValue: PropTypes.func,
    valueArr: PropTypes.arrayOf(PropTypes.string),
    itemClassName: PropTypes.string,
    itemStyle: PropTypes.object
  }

  public static getDerivedStateFromProps(
    nextProps: ICascaderMenuProps,
    prevState: ICascaderMenuState
  ) {
    // 未选中任何一项
    if (!nextProps.valueArr) {
      return { currentOption: null }
    }
    // 被截掉
    if (
      prevState.currentOption &&
      prevState.currentOption.value &&
      nextProps.valueArr.indexOf(prevState.currentOption.value) === -1
    ) {
      return { currentOption: null }
    }
    return null
  }

  constructor(props: ICascaderMenuProps) {
    super(props)
    this.state = {
      currentOption: null
    }
  }

  public handleClickItem = (option: IOption) => {
    if (option.disabled) {
      return
    }
    const { level, handleChangeValue } = this.props
    if (
      !this.state.currentOption ||
      option.value !== this.state.currentOption.value
    ) {
      this.setState({
        currentOption: option
      })
    }
    handleChangeValue(option, level)
  }

  public render() {
    const cn = componentName
    const {
      options,
      level,
      handleChangeValue,
      valueArr,
      itemClassName,
      itemStyle
    } = this.props
    const { currentOption } = this.state
    return (
      <>
        <ul className={classes(cn, '')}>
          {options.map(option => (
            <li
              className={classes(cn, 'item', [itemClassName], {
                selected: valueArr && valueArr.indexOf(option.value) > -1,
                'has-children': option.children && option.children.length,
                disabled: option.disabled
              })}
              style={itemStyle}
              key={option.value}
              onClick={() => this.handleClickItem(option)}
            >
              {option.label}
              {option.children && option.children.length && (
                <span className={classes(cn, 'item-icon-wrapper')}>
                  <Icon name="arrow" size={8} />
                </span>
              )}
            </li>
          ))}
        </ul>
        {currentOption &&
          currentOption.children &&
          currentOption.children.length && (
            <CascaderMenu
              options={currentOption.children}
              level={level + 1}
              handleChangeValue={handleChangeValue}
              valueArr={valueArr}
              itemClassName={itemClassName}
              itemStyle={itemStyle}
            />
          )}
      </>
    )
  }
}

export default CascaderMenu

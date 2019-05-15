import * as React from 'react'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'
import CascaderMenu from './CascaderMenu'
import Icon from '../icon/Icon'
import Unfold from '../transition/Unfold'
import './style'

export interface Option {
  value: string
  label: string
  children?: Option[]
  disabled?: boolean
}

export interface CascaderProps {
  options: Option[]
  placeholder?: string
  changeOnSelect?: boolean
  itemClassName?: string
  itemStyle?: React.CSSProperties
  onChange?: (valueArr: string[], selectedOptions: Option[]) => any
  onSelect?: (valueArr: string[], selectedOptions: Option[]) => any
  className?: string
  style?: React.CSSProperties
}

export interface CascaderState {
  valueArr: string[]
  selectedOptions: Option[]
  inputValueFromLabel: string
  menuVisible: boolean
  menuStyle: React.CSSProperties
}

const componentName = 'Cascader'

class Cascader extends React.Component<CascaderProps, CascaderState> {
  public static displayName = componentName

  public static defaultProps = {
    changeOnSelect: false
  }

  public static propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    placeholder: PropTypes.string,
    itemStyle: PropTypes.object,
    itemClassName: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    changeOnSelect: PropTypes.bool
  }

  private cascaderEl: HTMLDivElement

  constructor(props: CascaderProps) {
    super(props)
    this.state = {
      valueArr: [],
      selectedOptions: [],
      inputValueFromLabel: '',
      menuStyle: {
        top: ''
      },
      menuVisible: false
    }
  }

  public componentDidMount() {
    const { bottom, top } = this.cascaderEl.getBoundingClientRect()
    this.setState({
      menuStyle: {
        top: `${bottom - top + 4}px`
      }
    })
    document.addEventListener('click', this.handleClickDocument, true)
  }

  public componentWillUnmount() {
    document.removeEventListener('click', this.handleClickDocument, true)
  }

  // 监听 document，点击别处关闭
  public handleClickDocument: EventListener = e => {
    const target = e.target
    const { menuVisible } = this.state
    if (!this.cascaderEl.contains(target as Node) && menuVisible) {
      this.setState({
        menuVisible: false
      })
    }
  }

  public saveCascaderEl = (node: HTMLDivElement) => {
    this.cascaderEl = node
  }

  public handleClickInput = () => {
    this.setState({
      menuVisible: !this.state.menuVisible
    })
  }

  public handleChangeValue = (option: Option, level: number) => {
    // 最后一级
    if (!option.children) {
      this.handleClickLastLevel(option, level)
      // 中间层级
    } else {
      this.handleClickMidLevel(option, level)
    }
  }

  // 监听点击最后一层，点击后需要关闭菜单，若 valueArr 改变，需更新输入框显示的值
  public handleClickLastLevel = (option: Option, level: number) => {
    const { onChange } = this.props
    const valueArr = this.state.valueArr || []
    const selectedOptions = this.state.selectedOptions || []
    // 相同，未改变，关闭菜单
    if (valueArr![level] === option.value) {
      this.setState({
        menuVisible: false
      })
      // 不同，更改后关闭菜单
    } else {
      const valueArrCopy = JSON.parse(JSON.stringify(valueArr))
      const selectedOptionsCopy = JSON.parse(JSON.stringify(selectedOptions))
      valueArrCopy.splice(level, 1, option.value)
      selectedOptionsCopy.splice(level, 1, option)
      this.setState({
        valueArr: valueArrCopy,
        selectedOptions: selectedOptionsCopy,
        inputValueFromLabel: this.getLabelString(selectedOptionsCopy), // 关闭菜单时更新输入框显示的值
        menuVisible: false
      })
      if (onChange) {
        onChange(valueArrCopy, selectedOptionsCopy)
      }
    }
  }

  // 监听点击中间层，若改变，只在 changeOnSelect 为真时更新输入框显示的值
  public handleClickMidLevel = (option: Option, level: number) => {
    const { changeOnSelect, onSelect } = this.props
    const valueArr = this.state.valueArr || []
    const selectedOptions = this.state.selectedOptions || []
    // 相同，截掉后面的
    if (valueArr![level] === option.value) {
      // 选中即改变时,更新输入框显示的值
      if (changeOnSelect) {
        this.setState({
          valueArr: valueArr!.slice(0, level + 1),
          selectedOptions: selectedOptions!.slice(0, level + 1),
          inputValueFromLabel: this.getLabelString(
            selectedOptions!.slice(0, level + 1)
          )
        })
      } else {
        this.setState({
          valueArr: valueArr!.slice(0, level + 1),
          selectedOptions: selectedOptions!.slice(0, level + 1)
        })
      }
      // 始终调用回调
      if (onSelect) {
        onSelect(
          valueArr!.slice(0, level + 1),
          selectedOptions!.slice(0, level + 1)
        )
      }
      // 不同，替换并截掉后面的
    } else {
      const valueArrCopy = JSON.parse(JSON.stringify(valueArr))
      const selectedOptionsCopy = JSON.parse(JSON.stringify(selectedOptions))
      valueArrCopy.splice(level, 1, option.value)
      selectedOptionsCopy.splice(level, 1, option)
      // 选中即改变时,更新输入框显示的值
      if (changeOnSelect) {
        this.setState({
          valueArr: valueArrCopy.slice(0, level + 1),
          selectedOptions: selectedOptionsCopy.slice(0, level + 1),
          inputValueFromLabel: this.getLabelString(
            selectedOptionsCopy.slice(0, level + 1)
          )
        })
      } else {
        this.setState({
          valueArr: valueArrCopy.slice(0, level + 1),
          selectedOptions: selectedOptionsCopy.slice(0, level + 1)
        })
      }
      // 始终调用回调
      if (onSelect) {
        onSelect(
          valueArrCopy.slice(0, level + 1),
          selectedOptionsCopy.slice(0, level + 1)
        )
      }
    }
  }

  public getLabelString = (selectedOptions: Option[]): string => {
    const prev: string[] = []
    return (
      selectedOptions
        .reduce((base, current: Option) => {
          base.push(current.label)
          return base
        }, prev)
        .join(' / ') || ''
    )
  }

  public handleOnClear = () => {
    this.setState({
      valueArr: [],
      selectedOptions: [],
      inputValueFromLabel: '',
      menuVisible: false
    })
    if (this.props.onChange) {
      this.props.onChange([], [])
    }
  }

  public render() {
    const cn = componentName
    const {
      options,
      placeholder,
      itemClassName,
      itemStyle,
      className,
      style
    } = this.props
    const { valueArr, menuVisible, menuStyle, inputValueFromLabel } = this.state
    return (
      <div
        className={classes(cn, '', {
          active: menuVisible
        })}
        ref={this.saveCascaderEl}
      >
        <span className={classes(cn, 'input-wrapper')}>
          {placeholder && !inputValueFromLabel && (
            <span className={classes(cn, 'placeholder')}>{placeholder}</span>
          )}
          <input
            type="text"
            className={classes(cn, 'input', [className])}
            style={style}
            readOnly={true}
            onClick={this.handleClickInput}
            value={inputValueFromLabel}
          />
          <span className={classes(cn, 'icon-wrapper', ['arrow'])}>
            <Icon name="arrow" size={8} />
          </span>
          {inputValueFromLabel && (
            <span
              className={classes(cn, 'icon-wrapper', ['close'])}
              onClick={this.handleOnClear}
            >
              <Icon name="close" size={10} />
            </span>
          )}
        </span>
        {options && options.length && (
          <Unfold visible={menuVisible} vertical={true}>
            <div className={classes(cn, 'menu-container')} style={menuStyle}>
              <CascaderMenu
                options={options}
                level={0}
                handleChangeValue={this.handleChangeValue}
                valueArr={valueArr}
                itemClassName={itemClassName}
                itemStyle={itemStyle}
              />
            </div>
          </Unfold>
        )}
      </div>
    )
  }
}

export default Cascader

import * as React from 'react'
import * as PropTypes from 'prop-types'
import Icon from '../icon/Icon'
import { parseDateString, classes } from '../utils'
import Transition from '../transition/Transition'
import DatePanel from './DatePanel'
import MonthPanel from './MonthPanel'
import YearPanel from './YearPanel'
import DecadePanel from './DecadePanel'
import './style'

export interface DatePickerProps {
  value?: string
  defaultValue?: string
  defaultPickerValue?: string
  placeholder?: string
  footer?: string | React.ReactNode
  onChange?: (value: string, valueObject: DateValue | null) => any
  onOpenChange?: (visible: boolean) => any
  zIndex?: number
  className?: string
  style?: React.CSSProperties
}

export interface DateValue {
  year: number
  month: number
  date: number
}

export interface DatePickerState {
  derivedValue: DateValue | null
  pickerValue: DateValue
  calendarVisible: boolean
  mode: 'date' | 'month' | 'year' | 'decade'
  startYear: number
  startDecade: number
}

const componentName = 'DatePicker'

class DatePicker extends React.Component<DatePickerProps, DatePickerState> {
  public static displayName = componentName

  public static defaultProps = {
    zIndex: 80
  }

  public static propTypes = {
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    defaultPickerValue: PropTypes.string,
    placeholder: PropTypes.string,
    footer: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    onChange: PropTypes.func,
    onOpenChange: PropTypes.func,
    zIndex: PropTypes.number,
    className: PropTypes.string,
    style: PropTypes.object
  }

  public static getDerivedStateFromProps(
    nextProps: DatePickerProps,
    prevState: DatePickerState
  ) {
    if (nextProps.value && !isNaN(Date.parse(nextProps.value))) {
      return {
        derivedValue: parseDateString(nextProps.value),
        pickerValue: parseDateString(nextProps.value)
      }
    }
    return null
  }

  private datePickerRef: HTMLDivElement

  constructor(props: DatePickerProps) {
    super(props)
    const { defaultValue, defaultPickerValue } = props
    // 是否可被解析
    const valueCanBeParsed = defaultValue && !isNaN(Date.parse(defaultValue))
    const pickerValueCanBeParsed =
      defaultPickerValue && !isNaN(Date.parse(defaultPickerValue))
    this.state = {
      derivedValue: valueCanBeParsed ? parseDateString(defaultValue) : null,
      pickerValue: pickerValueCanBeParsed
        ? parseDateString(defaultPickerValue)
        : parseDateString(),
      calendarVisible: false,
      mode: 'date',
      startYear: 0,
      startDecade: 0
    }
  }

  public componentDidMount() {
    document.addEventListener('click', this.handleClickDocument, true) // 第三个参数为 true，让事件在捕获阶段触发，重要，否则被点击元素被移除的话会导致判断不准
  }

  public componentDidUpdate(
    prevProps: DatePickerProps,
    prevState: DatePickerState
  ) {
    const { onOpenChange } = this.props
    const { calendarVisible } = this.state
    if (onOpenChange && prevState.calendarVisible !== calendarVisible) {
      onOpenChange(calendarVisible)
    }
  }

  public componentWillUnmount() {
    document.removeEventListener('click', this.handleClickDocument, true)
  }

  public handleClickDocument: EventListener = e => {
    const { calendarVisible } = this.state
    const target = e.target
    if (!this.datePickerRef.contains(target as Node) && calendarVisible) {
      this.setState({
        calendarVisible: false
      })
    }
  }

  public saveDatePickerRef = (node: HTMLDivElement) => {
    this.datePickerRef = node
  }

  // 监听点击 input 打开 calendar 面板
  public handleClickInput = () => {
    this.setState({
      calendarVisible: true,
      mode: 'date'
    })
  }

  // 调用 onChange 回调
  public handleOnChange = () => {
    const { onChange } = this.props
    const { derivedValue } = this.state
    if (onChange) {
      if (derivedValue) {
        const { year, month, date } = derivedValue
        onChange(
          year +
            '-' +
            this.fixNumberToString(month) +
            '-' +
            this.fixNumberToString(date),
          derivedValue
        )
      } else {
        onChange('', null)
      }
    }
  }

  // 监听 date 面板点击
  public handleClickDate = (value: DateValue) => {
    this.setState(
      {
        derivedValue: value,
        pickerValue: value,
        calendarVisible: false
      },
      this.handleOnChange
    )
  }

  // 监听点击 date 面板设置为今天
  public handleClickToday = () => {
    this.setState(
      {
        derivedValue: parseDateString(),
        pickerValue: parseDateString(),
        calendarVisible: false
      },
      this.handleOnChange
    )
  }

  // 监听点击清除图标
  public handleOnClear = () => {
    this.setState(
      {
        derivedValue: null,
        pickerValue: parseDateString()
      },
      this.handleOnChange
    )
  }

  // 监听 month 面板点击
  public handleClickMonth = (month: number) => {
    const { pickerValue } = this.state
    this.setState({
      pickerValue: Object.assign({}, pickerValue, { month }),
      mode: 'date'
    })
  }

  // 监听 year 面板点击
  public handleClickYear = (
    year: number,
    type: 'first' | 'middle' | 'last'
  ) => {
    const { pickerValue } = this.state
    switch (type) {
      case 'first':
        this.setState({
          pickerValue: Object.assign({}, pickerValue, {
            year: pickerValue.year - 10
          })
        })
        break
      case 'middle':
        this.setState({
          pickerValue: Object.assign({}, pickerValue, { year }),
          mode: 'date'
        })
        break
      case 'last':
        this.setState({
          pickerValue: Object.assign({}, pickerValue, {
            year: pickerValue.year + 10
          })
        })
        break
      default:
        break
    }
  }

  // 监听 decade 面板点击
  public handleClickDecade = (
    decade: number,
    type: 'first' | 'middle' | 'last'
  ) => {
    const { pickerValue } = this.state
    switch (type) {
      case 'first':
        this.setState({
          pickerValue: Object.assign({}, pickerValue, {
            year: pickerValue.year - 100
          })
        })
        break
      case 'middle':
        this.setState({
          pickerValue: Object.assign({}, pickerValue, { year: decade }),
          mode: 'year'
        })
        break
      case 'last':
        this.setState({
          pickerValue: Object.assign({}, pickerValue, {
            year: pickerValue.year + 100
          })
        })
        break
      default:
        break
    }
  }

  // 渲染日历面板
  public renderCalendarBody = () => {
    const { mode, pickerValue, derivedValue } = this.state
    switch (mode) {
      case 'date':
        return (
          <DatePanel
            year={pickerValue.year}
            month={pickerValue.month}
            value={derivedValue}
            onClickDate={this.handleClickDate}
          />
        )
      case 'month':
        return (
          <MonthPanel
            month={pickerValue.month} // 设为 pickerValue.month 可让面板上始终有选中的月份，下同
            onClickMonth={this.handleClickMonth}
          />
        )
      case 'year':
        return (
          <YearPanel
            startYear={Math.floor(pickerValue.year / 10) * 10}
            year={pickerValue.year}
            onClickYear={this.handleClickYear}
          />
        )
      case 'decade':
        return (
          <DecadePanel
            startDecade={Math.floor(pickerValue.year / 100) * 100}
            decade={Math.floor(pickerValue.year / 10) * 10}
            onClickDecade={this.handleClickDecade}
          />
        )
      default:
        return null
    }
  }

  // 监听日期面板点击单箭头更改月份
  public handleClickArrow = (position: string) => {
    const { pickerValue } = this.state
    // month-1
    if (position === 'left') {
      pickerValue.month === 1
        ? this.setState({
            pickerValue: Object.assign({}, pickerValue, {
              year: pickerValue.year - 1,
              month: 12
            })
          })
        : this.setState({
            pickerValue: Object.assign({}, pickerValue, {
              month: pickerValue.month - 1
            })
          })
      // month+1
    } else {
      pickerValue.month === 12
        ? this.setState({
            pickerValue: Object.assign({}, pickerValue, {
              year: pickerValue.year + 1,
              month: 1
            })
          })
        : this.setState({
            pickerValue: Object.assign({}, pickerValue, {
              month: pickerValue.month + 1
            })
          })
    }
  }

  // 监听 month year decade 面板点击双箭头
  public handleClickDouble = (position: string) => {
    const { mode, pickerValue } = this.state
    // left -
    if (position === 'left') {
      switch (mode) {
        case 'month':
          this.setState({
            pickerValue: Object.assign({}, pickerValue, {
              year: pickerValue.year - 1
            })
          })
          break
        case 'year':
          this.setState({
            pickerValue: Object.assign({}, pickerValue, {
              year: pickerValue.year - 10
            })
          })
          break
        case 'decade':
          this.setState({
            pickerValue: Object.assign({}, pickerValue, {
              year: pickerValue.year - 100
            })
          })
          break
        default:
          break
      }
      // right +
    } else {
      switch (mode) {
        case 'month':
          this.setState({
            pickerValue: Object.assign({}, pickerValue, {
              year: pickerValue.year + 1
            })
          })
          break
        case 'year':
          this.setState({
            pickerValue: Object.assign({}, pickerValue, {
              year: pickerValue.year + 10
            })
          })
          break
        case 'decade':
          this.setState({
            pickerValue: Object.assign({}, pickerValue, {
              year: pickerValue.year + 100
            })
          })
          break
        default:
          break
      }
    }
  }

  // 监听点击动作条中间文字
  public handleClickValue = () => {
    const { mode } = this.state
    switch (mode) {
      case 'month':
        this.setState({
          mode: 'year'
        })
        break
      case 'year':
        this.setState({
          mode: 'decade'
        })
        break
      default:
        break
    }
  }

  // 渲染动作条
  public renderCalendarHandler = () => {
    const { mode, pickerValue } = this.state
    switch (mode) {
      case 'date':
        return (
          <>
            <li className="left">
              <span
                className="icon-wrapper"
                onClick={() =>
                  this.setState({
                    pickerValue: Object.assign({}, pickerValue, {
                      year: pickerValue.year - 1
                    })
                  })
                }
              >
                <Icon name="double" size={10} />
              </span>
              <span
                className="icon-wrapper"
                onClick={() => this.handleClickArrow('left')}
              >
                <Icon name="right" size={11} />
              </span>
            </li>
            <li className="middle">
              <span
                className="value"
                onClick={() => this.setState({ mode: 'year' })}
              >
                {pickerValue.year}年&nbsp;
              </span>
              <span
                className="value"
                onClick={() => this.setState({ mode: 'month' })}
              >
                {this.fixNumberToString(pickerValue.month)}月
              </span>
            </li>
            <li className="right">
              <span
                className="icon-wrapper"
                onClick={() => this.handleClickArrow('right')}
              >
                <Icon name="right" size={11} />
              </span>
              <span
                className="icon-wrapper"
                onClick={() =>
                  this.setState({
                    pickerValue: Object.assign({}, pickerValue, {
                      year: pickerValue.year + 1
                    })
                  })
                }
              >
                <Icon name="double" size={10} />
              </span>
            </li>
          </>
        )
      default:
        return (
          <>
            <li className="left">
              <span
                className="icon-wrapper"
                onClick={() => this.handleClickDouble('left')}
              >
                <Icon name="double" size={10} />
              </span>
            </li>
            <li className="middle">
              <span
                className={classes(componentName, ['value'], {
                  decade: mode === 'decade'
                })}
                onClick={this.handleClickValue}
              >
                {this.getHandleBarText()}
              </span>
            </li>
            <li className="right">
              <span
                className="icon-wrapper"
                onClick={() => this.handleClickDouble('right')}
              >
                <Icon name="double" size={10} />
              </span>
            </li>
          </>
        )
    }
  }

  // 动作条中间文字
  public getHandleBarText = (): string => {
    const { mode, pickerValue } = this.state
    if (mode === 'year') {
      const year = Math.floor(pickerValue.year / 10) * 10
      return year + '-' + (year + 9)
    } else if (mode === 'month') {
      return pickerValue.year + ''
    } else if (mode === 'decade') {
      const year = Math.floor(pickerValue.year / 100) * 100
      return year + '-' + (year + 99)
    }
    return ''
  }

  // 获取 input 渲染文字
  public getStringFromDerivedValue = (): string => {
    const { derivedValue } = this.state
    if (!derivedValue) {
      return ''
    } else {
      const { year, month, date } = derivedValue
      return (
        year +
        '-' +
        this.fixNumberToString(month) +
        '-' +
        this.fixNumberToString(date)
      )
    }
  }
  // 1 => '01'
  public fixNumberToString = (n: number): string => {
    if (n > 9) {
      return n + ''
    } else {
      return `0${n}`
    }
  }

  public render() {
    const cn = componentName
    const { placeholder, footer, className, style, zIndex } = this.props
    const { calendarVisible, mode } = this.state
    return (
      <div className={classes(cn, '')} ref={this.saveDatePickerRef}>
        <span className={classes(cn, 'input-wrapper')}>
          {placeholder && !this.getStringFromDerivedValue() && (
            <span className={classes(cn, 'placeholder')}>{placeholder}</span>
          )}
          <input
            type="text"
            value={this.getStringFromDerivedValue()}
            className={classes(cn, 'input', [className])}
            style={style}
            readOnly={true}
            onClick={this.handleClickInput}
          />
          <span className={classes(cn, 'icon-wrapper')}>
            <Icon name="calendar" size={16} />
          </span>
          {this.getStringFromDerivedValue() && (
            <span
              className={classes(cn, 'icon-wrapper', ['close'])}
              onClick={this.handleOnClear}
            >
              <Icon name="close" size={12} />
            </span>
          )}
        </span>
        <Transition
          visible={calendarVisible}
          beforeEnter={{ height: '260px', opacity: 0 }}
          afterEnter={{ height: '330px', opacity: 1 }}
        >
          <div className={classes(cn, 'calendar')} style={{ zIndex }}>
            {placeholder && !this.getStringFromDerivedValue() && (
              <span className="calendar-placeholder">{placeholder}</span>
            )}
            <input
              type="text"
              value={this.getStringFromDerivedValue()}
              className="calendar-input"
              readOnly={true}
            />
            <ul className="calendar-handlebar">
              {this.renderCalendarHandler()}
            </ul>
            <div className="calendar-body">{this.renderCalendarBody()}</div>
            {mode === 'date' && (
              <div className="calendar-footer">
                {footer ? (
                  footer
                ) : (
                  <span className="footer-text" onClick={this.handleClickToday}>
                    今&nbsp;天
                  </span>
                )}
              </div>
            )}
            {/* 页脚，只在日期面板显示 */}
          </div>
        </Transition>
      </div>
    )
  }
}

export default DatePicker

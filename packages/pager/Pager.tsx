import * as React from 'react'
import * as PropTypes from 'prop-types'
import { calculatePagerPages, classes } from '../utils'
import Icon from '../icon/Icon'
import './style'

export interface PagerProps {
  current?: number
  total: number
  onChange?: (current: number) => any
  simple?: boolean
  size?: 'small' | 'default'
  defaultCurrent?: number
  hideOnSinglePage?: boolean
  className?: string
  style?: React.CSSProperties
}

export interface PagerState {
  derivedCurrent: number
  derivedTotal: number
}

const componentName = 'Pager'

class Pager extends React.Component<PagerProps, PagerState> {
  public static displayName = componentName

  public static defaultProps = {
    simple: false,
    size: 'default',
    defaultCurrent: 1,
    hideOnSinglePage: false
  }

  public static propTypes = {
    current: PropTypes.number,
    total: PropTypes.number.isRequired,
    onChange: PropTypes.func,
    simple: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'default']),
    defaultCurrent: PropTypes.number,
    className: PropTypes.string,
    style: PropTypes.object,
    hideOnSinglePage: PropTypes.bool
  }

  public static getDerivedStateFromProps(
    nextProps: PagerProps,
    prevState: PagerState
  ) {
    const { current, total } = nextProps
    const { derivedCurrent, derivedTotal } = prevState
    const shouldChangeCurrent =
      'current' in nextProps && current !== derivedCurrent
    const shouldChangeTotal = 'total' in nextProps && total !== derivedTotal
    if (shouldChangeCurrent && shouldChangeTotal) {
      return { derivedCurrent: current, derivedTotal: total }
    } else if (shouldChangeCurrent && !shouldChangeTotal) {
      return { derivedCurrent: current }
    } else if (!shouldChangeCurrent && shouldChangeTotal) {
      return { derivedTotal: total }
    }
    return null
  }

  constructor(props: PagerProps) {
    super(props)
    this.state = {
      derivedCurrent: props.defaultCurrent || 1,
      derivedTotal: props.total
    }
  }

  public handleClickNum(n: number) {
    if (n !== this.state.derivedCurrent) {
      this.setState({
        derivedCurrent: n
      })
      this.handleOnChange(n)
    }
  }

  public handleSkip(payload: number) {
    const { derivedCurrent } = this.state
    const { total } = this.props
    if (derivedCurrent + payload > total || derivedCurrent + payload < 1) {
      return
    } else {
      this.setState({
        derivedCurrent: derivedCurrent + payload
      })
      this.handleOnChange(derivedCurrent + payload)
    }
  }

  // 监听点击省略号
  public handleClickDot = (index: number) => {
    const { derivedCurrent } = this.state
    const { total } = this.props
    // prev
    if (index === 1) {
      const n = derivedCurrent - 5 < 1 ? 1 : derivedCurrent - 5
      this.setState({
        derivedCurrent: n
      })
      this.handleOnChange(n)
    } else {
      const n = derivedCurrent + 5 > total ? total : derivedCurrent + 5
      this.setState({
        derivedCurrent: n
      })
      this.handleOnChange(n)
    }
  }

  public handleOnChange = (n: number) => {
    const { onChange } = this.props
    if (onChange) {
      onChange(n)
    }
  }

  public render() {
    const cn = componentName
    const { simple, size, className, style, hideOnSinglePage } = this.props
    const { derivedCurrent, derivedTotal } = this.state
    const pages = calculatePagerPages(derivedCurrent, derivedTotal)
    return derivedTotal === 1 && hideOnSinglePage ? null : (
      <ul
        className={classes(cn, '', [size, className], { simple })}
        style={style}
      >
        <li
          className={classes(cn, 'num', { disabled: derivedCurrent < 2 })}
          onClick={() => this.handleSkip(-1)}
        >
          <Icon
            name="arrow"
            className={classes(cn, 'icon', ['prev'])}
            size={10}
          />
        </li>
        {pages.map((item, index) =>
          item === '...' ? (
            <li
              className={classes(cn, 'num', ['seprator'])}
              key={`${item}-${index}`}
            >
              <Icon name="dot" onClick={() => this.handleClickDot(index)} />
            </li>
          ) : (
            <li
              className={classes(cn, 'num', {
                active: derivedCurrent === item
              })}
              key={`${item}-${index}`}
              onClick={() => this.handleClickNum(item)}
            >
              {item}
            </li>
          )
        )}
        <li
          className={classes(cn, 'num', {
            disabled: derivedCurrent >= derivedTotal
          })}
          onClick={() => this.handleSkip(1)}
        >
          <Icon name="arrow" className={classes(cn, 'icon')} size={10} />
        </li>
      </ul>
    )
  }
}

export default Pager

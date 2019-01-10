import * as React from 'react'
import * as PropTypes from 'prop-types'
import { calculatePagerPages, classes } from '../utils'
import Icon from '../icon/Icon'
import '../style/Pager.scss'

interface IPagerProps {
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

interface IPagerState {
  derivedCurrent: number
  derivedTotal: number
}

class Pager extends React.Component<IPagerProps, IPagerState> {
  public static displayName = 'Pager'

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

  public static defaultProps = {
    simple: false,
    size: 'default',
    defaultCurrent: 1,
    hideOnSinglePage: false
  }

  public static getDerivedStateFromProps(
    nextProps: IPagerProps,
    prevState: IPagerState
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

  constructor(props: IPagerProps) {
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
      const { onChange } = this.props
      if (onChange) {
        onChange(n)
      }
    }
  }

  public handleSkip(payload: -1 | 1) {
    const { derivedCurrent } = this.state
    const { total, onChange } = this.props
    if (derivedCurrent + payload > total || derivedCurrent + payload < 1) {
      return
    }
    this.setState({
      derivedCurrent: derivedCurrent + payload
    })
    if (onChange) {
      onChange(derivedCurrent + payload)
    }
  }

  public render() {
    const { simple, size, className, style, hideOnSinglePage } = this.props
    const { derivedCurrent, derivedTotal } = this.state
    const pages = calculatePagerPages(derivedCurrent, derivedTotal)
    return derivedTotal === 1 && hideOnSinglePage ? null : (
      <ul
        className={classes('x-pager', size, className, { simple })}
        style={style}
      >
        <li
          className={classes('x-pager-num', { disabled: derivedCurrent < 2 })}
          onClick={() => this.handleSkip(-1)}
        >
          <Icon name="arrow" className="pager-icon prev" />
        </li>
        {pages.map((item, index) =>
          item === '...' ? (
            <li className="x-pager-num seprator" key={`${item}-${index}`}>
              <Icon name="dot" />
            </li>
          ) : (
            <li
              className={classes('x-pager-num', {
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
          className={classes('x-pager-num', {
            disabled: derivedCurrent >= derivedTotal
          })}
          onClick={() => this.handleSkip(1)}
        >
          <Icon name="arrow" className="pager-icon" />
        </li>
      </ul>
    )
  }
}

export default Pager

import * as React from 'react'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'
import Icon from '../icon/Icon'
import Input from './Input'

interface ISearchProps {
  value?: string
  defaultValue?: string
  placeholder?: string
  enterButton?: boolean | string | React.ReactNode
  onSearch?: (value: string) => any
  onChange?: React.ChangeEventHandler
  className?: string
  style?: React.CSSProperties
}

interface ISearchState {
  derivedValue: string
}

class Search extends React.Component<ISearchProps, ISearchState> {
  public static displayName = 'Search'

  public static propTypes = {
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    enterButton: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.element
    ]),
    onSearch: PropTypes.func,
    style: PropTypes.object,
    className: PropTypes.string
  }

  public static defaultProps = {
    placeholder: '',
    enterButton: false
  }

  public static getDerivedStateFromProps(
    nextProps: ISearchProps,
    prevState: ISearchState
  ) {
    const { value } = nextProps
    const { derivedValue } = prevState
    if ('value' in nextProps && value !== derivedValue) {
      return { derivedValue: value }
    }
    return null
  }

  constructor(props: ISearchProps) {
    super(props)
    this.state = {
      derivedValue: props.defaultValue || ''
    }
  }

  public handleChange: React.ChangeEventHandler = e => {
    const target = e.target as HTMLInputElement
    this.setState({
      derivedValue: target.value
    })
    const { onChange } = this.props
    if (onChange) {
      onChange(e)
    }
  }

  public handleSearch = () => {
    const { onSearch } = this.props
    if (onSearch) {
      onSearch(this.state.derivedValue)
    }
  }

  public render() {
    const { enterButton, placeholder, className, style } = this.props
    const { derivedValue } = this.state
    return (
      <Input
        value={derivedValue}
        className={classes('search', className, {
          'enter-button': !!enterButton
        })}
        style={style}
        onChange={this.handleChange}
        onPressEnter={this.handleSearch}
        suffix={
          (enterButton === false && (
            <Icon
              name="search"
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              onClick={this.handleSearch}
            />
          )) ||
          null
        }
        addonAfter={
          enterButton ? (
            <div className="search-enter-button" onClick={this.handleSearch}>
              {enterButton === true ? (
                <Icon name="search" style={{ width: '20px', height: '20px' }} />
              ) : (
                enterButton
              )}
            </div>
          ) : null
        }
        placeholder={placeholder}
      />
    )
  }
}

export default Search

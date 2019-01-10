import * as React from 'react'
import * as PropTypes from 'prop-types'
import Menu from 'src/packages/menu/Menu'
import { RouteComponentProps } from 'react-router'
const { SubMenu, MenuItem } = Menu

interface INavBarProps extends RouteComponentProps {
  xxx?: string
}

class NavBar extends React.Component<INavBarProps> {
  public static displayName = 'NavBar'

  public state = {
    selectedKey: 'button'
  }

  public componentDidMount() {
    const reg = /\/(\w+)$/
    const pathname = this.props.location.pathname
    if (reg.test(pathname)) {
      this.setState({
        selectedKey: RegExp.$1
      })
    }
  }

  public handleSelectedChange = (key: string) => {
    const { selectedKey } = this.state
    if (key !== selectedKey) {
      this.setState({
        selectedKey: key
      })
    }
    const pathname = this.getPathname(key)
    const { location, history } = this.props
    if (location.pathname !== pathname) {
      history.push(pathname)
    }
  }

  public getPathname = (key: string) => {
    switch (key) {
      case 'introduction':
      case 'install':
      case 'start':
        return `/${key}`
      default:
        return `/components/${key}`
    }
  }

  public render() {
    return (
      <aside className="aside">
        <Menu
          onSelectedChange={this.handleSelectedChange}
          selectedKey={this.state.selectedKey}
          style={{ width: '200px', borderRight: 'none' }}
          defaultExpandKeys={['components']}
        >
          <MenuItem key="introduction">介绍</MenuItem>
          <MenuItem key="install">安装</MenuItem>
          <MenuItem key="start">快速上手</MenuItem>
          <SubMenu key="components" title="Components">
            <MenuItem key="button">Button</MenuItem>
            <MenuItem key="input">Input</MenuItem>
            <MenuItem key="switch">Switch</MenuItem>
            <MenuItem key="radio">Radio</MenuItem>
            <MenuItem key="popover">Popover</MenuItem>
            <MenuItem key="slides">Slides</MenuItem>
            <MenuItem key="pager">Pager</MenuItem>
            <MenuItem key="tabs">Tabs</MenuItem>
            <MenuItem key="menu">Menu</MenuItem>
            <MenuItem key="transition">Transition</MenuItem>
          </SubMenu>
        </Menu>
      </aside>
    )
  }
}

export default NavBar

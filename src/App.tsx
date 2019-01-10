import * as React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import './style/App.scss'
import Button from './packages/button/Button'
import ButtonExample from './examples/Button.example'
import InputExample from './examples/Input.example'
import SwitchExample from './examples/Switch.example'
import RadioExample from './examples/Radio.example'
import PopoverExample from './examples/Popover.example'
import SlidesExample from './examples/Slides.example'
import PagerExample from './examples/Pager.example'
import TransitionExample from './examples/Transition.example'
import TabsExample from './examples/Tabs.example'
import CollapseExample from './examples/Collapse.example'
import MenuExample from './examples/Menu.example'
import NavBar from './components/NavBar'

class App extends React.Component {
  public render() {
    return (
      <Router>
        <div className="App">
          <header
            className="header"
            style={{
              color: '#1890ff',
              fontSize: '24px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() =>
              window.open('https://github.com/BlameDeng/xue-re', '_self')
            }
          >
            文档持续施工中...
          </header>
          <main className="main">
            <Route path="/" component={NavBar} />
            <div className="container">
              <Route path="/components/button" component={ButtonExample} />
              <Route path="/components/input" component={InputExample} />
              <Route path="/components/switch" component={SwitchExample} />
              <Route path="/components/radio" component={RadioExample} />
              <Route path="/components/popover" component={PopoverExample} />
              <Route path="/components/slides" component={SlidesExample} />
              <Route path="/components/pager" component={PagerExample} />
              <Route
                path="/components/transition"
                component={TransitionExample}
              />
              <Route path="/components/tabs" component={TabsExample} />
              <Route path="/components/menu" component={MenuExample} />
            </div>
          </main>
          <footer className="footer">{''}</footer>
        </div>
      </Router>
    )
  }
}

export default App

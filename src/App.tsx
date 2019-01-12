import * as React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import './style/App.scss'
import NavBar from './components/NavBar'
import Icon from './packages/icon/Icon'
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
import ModalExample from './examples/Modal.example'
import DatePickerExample from './examples/DatePicker.example'
import CascaderExample from './examples/Cascader.example'

class App extends React.Component {
  public render() {
    return (
      <Router>
        <div className="App">
          <header className="header">
            <div className="logo">
              <span className="icon-wrapper">
                <Icon
                  name="snow"
                  style={{ fill: '#1890ff', width: '24px', height: '24px' }}
                />
              </span>
              <span className="text">Xue-react</span>
            </div>
            <div
              className="github"
              onClick={() =>
                window.open('https://github.com/BlameDeng/Xue-react', '_blank')
              }
            >
              <Icon
                name="github"
                style={{
                  fill: 'rgba(0,0,0,0.85)',
                  width: '24px',
                  height: '24px'
                }}
              />
            </div>
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
              <Route path="/components/tabs" component={TabsExample} />
              <Route path="/components/collapse" component={CollapseExample} />
              <Route path="/components/modal" component={ModalExample} />
              <Route path="/components/menu" component={MenuExample} />
              <Route path="/components/cascader" component={CascaderExample} />
              <Route
                path="/components/datepicker"
                component={DatePickerExample}
              />
              <Route
                path="/components/transition"
                component={TransitionExample}
              />
            </div>
          </main>
          <footer className="footer">
            <ul className="footer-link">
              <li
                onClick={() =>
                  window.open(
                    'https://github.com/BlameDeng/Xue-react',
                    '_blank'
                  )
                }
              >
                <span className="icon-wrapper">
                  <Icon name="github" />
                </span>
                Github
              </li>
              <li
                onClick={() =>
                  window.open('https://github.com/BlameDeng/Xue-ui', '_blank')
                }
              >
                <span className="icon-wrapper">
                  <Icon name="snow" />
                </span>
                Xue-ui
              </li>
            </ul>
          </footer>
        </div>
      </Router>
    )
  }
}

export default App

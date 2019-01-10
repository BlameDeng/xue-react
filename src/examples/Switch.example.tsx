import * as React from 'react'
import Switch from 'src/packages/switch/Switch'
import Code from '../components/Code'
import CodeBox from '../components/CodeBox'
import { renderString } from 'src/utils/renderCode'
import Button from 'src/packages/button/Button'

interface ISwitchExampleState {
  checked: boolean
}

class SwitchExample extends React.Component<{}, ISwitchExampleState> {
  public static displayName = 'SwitchExample'

  public state = {
    checked: false
  }

  public toggleChecked = () => {
    this.setState({ checked: !this.state.checked })
  }

  public handleOnChange = (checked: boolean) => {
    console.log('switch to', checked)
  }

  public render() {
    return (
      <div className="switch-example">
        <section>
          <h1>Switch 开关</h1>
          <p className="text">开关选择器。</p>
        </section>
        <section>
          <h2>何时使用</h2>
          <p className="text">需要在两种状态之间切换时。</p>
        </section>
        <section>
          <h2>代码示例</h2>
        </section>
        <div className="example">
          <div className="container">
            <Switch onChange={checked => this.handleOnChange(checked)} />
          </div>
          <CodeBox title="基本用法" description="最简单的用法。">
            {renderString(`import Switch from 'xue-ui-react'`)}
            <br />
            <Code
              code={`&lt;Switch onChange={(checked) => this.handleOnChange(checked)} /&gt;>`}
            />
          </CodeBox>
        </div>
        <div className="example">
          <div className="container">
            <Switch
              style={{ marginRight: '20px' }}
              onChange={checked => this.handleOnChange(checked)}
            />
            <Switch
              onChange={checked => this.handleOnChange(checked)}
              size="small"
            />
          </div>
          <CodeBox title="两种大小" description="不同尺寸大小。">
            {renderString(`import Switch from 'xue-ui-react'`)}
            <br />
            <Code
              code={`&lt;Switch onChange={(checked) => this.handleOnChange(checked)} /&gt;>`}
            />
            <Code
              code={`&lt;Switch onChange={(checked) => this.handleOnChange(checked)} size="small" /&gt;>`}
            />
          </CodeBox>
        </div>
        <div className="example">
          <div className="container">
            <Switch style={{ marginRight: '20px' }} disabled={true} />
            <Switch defaultChecked={true} disabled={true} />
          </div>
          <CodeBox title="禁用状态" description="设置 disabled 以禁用。">
            {renderString(`import Switch from 'xue-ui-react'`)}
            <br />
            <Code code={`&lt;Switch disabled={true} /&gt;>`} />
            <Code code={`&lt;Switch disabled={true} /&gt;>`} />
          </CodeBox>
        </div>
        <div className="example">
          <div className="container">
            <Switch
              style={{ marginRight: '20px' }}
              onChange={checked => this.handleOnChange(checked)}
            />
            <Switch
              defaultChecked={true}
              onChange={checked => this.handleOnChange(checked)}
            />
          </div>
          <CodeBox title="默认选中" description="设置默认选中状态。">
            {renderString(`import Switch from 'xue-ui-react'`)}
            <br />
            <Code
              code={`&lt;Switch onChange={(checked) => this.handleOnChange(checked)} /&gt;>`}
            />
            <Code
              code={`&lt;Switch onChange={(checked) => this.handleOnChange(checked)} defaultChecked={true} /&gt;>`}
            />
          </CodeBox>
        </div>
        <div className="example">
          <div className="container">
            <Switch
              checked={this.state.checked}
              style={{ marginRight: '20px' }}
            />
            <Button type="primary" onClick={this.toggleChecked}>
              Toggle Checked
            </Button>
          </div>
          <CodeBox
            title="受控"
            description="当前选中状态由 checked 控制。"
          >
            {renderString(`import Switch from 'xue-ui-react'`)}
            <br />
            <Code code={`&lt;Switch checked={this.state.checked} /&gt;>`} />
          </CodeBox>
        </div>
        <section>
          <h2>API</h2>
        </section>
        <table className="api-table">
          <thead>
            <tr>
              <th>参数</th>
              <th className="des">说明</th>
              <th className="type">类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>checked</td>
              <td className="des">当前选中状态</td>
              <td className="type">boolean</td>
              <td>——</td>
            </tr>
            <tr>
              <td>defaultChecked</td>
              <td className="des">默认选中状态</td>
              <td className="type">boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>size</td>
              <td className="des">尺寸大小</td>
              <td className="type">'small' | 'default'</td>
              <td>'default'</td>
            </tr>
            <tr>
              <td>disabled</td>
              <td className="des">禁用状态</td>
              <td className="type">boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>onChange</td>
              <td className="des">选中状态改变时的回调</td>
              <td className="type">
                (checked: boolean, e: React.MouseEvent) => any
              </td>
              <td>——</td>
            </tr>
            <tr>
              <td>className</td>
              <td className="des">自定义外层容器类名</td>
              <td className="type">string</td>
              <td>——</td>
            </tr>
            <tr>
              <td>style</td>
              <td className="des">自定义外层容器样式</td>
              <td className="type">React.CSSProperties</td>
              <td>——</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default SwitchExample

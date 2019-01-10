import * as React from 'react'
import Radio from 'src/packages/radio/Radio'
import Code from '../components/Code'
import CodeBox from '../components/CodeBox'
import Space from 'src/components/Space'
import { renderString } from 'src/utils/renderCode'
const Option = Radio.Option

interface IRadioExampleState {
  value: string
}

class RadioExample extends React.Component<{}, IRadioExampleState> {
  public static displayName = 'RadioExample'

  public state: IRadioExampleState = {
    value: 'apple'
  }

  public handleChange = (value: string) => {
    console.log('the value of Radio is', value)
  }

  public changeState = (value: string) => {
    this.setState({
      value
    })
  }

  public render() {
    return (
      <div className="radio-example">
        <section>
          <h1>Radio 单选框</h1>
          <p className="text">单选框。</p>
        </section>
        <section>
          <h2>何时使用</h2>
          <p className="text">需要在多个备选项中选择单个状态时。</p>
        </section>
        <section>
          <h2>代码示例</h2>
        </section>
        <div className="example">
          <div className="container">
            <Radio
              defaultValue="apple"
              onChange={value => this.handleChange(value)}
            >
              <Option value="apple">Apple</Option>
              <Option value="orange">Orange</Option>
              <Option value="pear">Pear</Option>
              <Option value="disabled" disabled={true}>
                Disabled
              </Option>
            </Radio>
          </div>
          <CodeBox title="基本用法" description="最简单的用法。">
            {renderString(`import Radio from 'xue-ui-react'`)}
            {renderString(`const Option = Radio.Option`)}
            <br />
            <Code
              code={`&lt;Radio defaultValue="apple" onChange={(value) => this.handleChange(value)}&gt;`}
            />
            <Space count={4} />
            <Code code={`&lt;Option value="apple"&gt;Apple&lt;/Option&gt;`} />
            <Space count={4} />
            <Code code={`&lt;Option value="orange"&gt;Orange&lt;/Option&gt;`} />
            <Space count={4} />
            <Code code={`&lt;Option value="pear"&gt;Pear&lt;/Option&gt;`} />
            <Space count={4} />
            <Code
              code={`&lt;Option value="disabled" disabled={true}&gt;Disabled&lt;/Option&gt;`}
            />
            <Code code={`&lt;/Radio&gt;`} />
          </CodeBox>
        </div>
        <div className="example">
          <div className="container">
            <Radio
              defaultValue="orange"
              vertical={true}
              onChange={value => this.handleChange(value)}
            >
              <Option value="apple">Apple</Option>
              <Option value="orange">Orange</Option>
              <Option value="pear">Pear</Option>
              <Option value="disabled" disabled={true}>
                Disabled
              </Option>
            </Radio>
          </div>
          <CodeBox title="纵向" description="设置纵向。">
            {renderString(`import Radio from 'xue-ui-react'`)}
            {renderString(`const Option = Radio.Option`)}
            <br />
            <Code
              code={`&lt;Radio defaultValue="orange" vertical={true} onChange={(value) => this.handleChange(value)}&gt;`}
            />
            <Space count={4} />
            <Code code={`&lt;Option value="apple"&gt;Apple&lt;/Option&gt;`} />
            <Space count={4} />
            <Code code={`&lt;Option value="orange"&gt;Orange&lt;/Option&gt;`} />
            <Space count={4} />
            <Code code={`&lt;Option value="pear"&gt;Pear&lt;/Option&gt;`} />
            <Space count={4} />
            <Code
              code={`&lt;Option value="disabled" disabled={true}&gt;Disabled&lt;/Option&gt;`}
            />
            <Code code={`&lt;/Radio&gt;`} />
          </CodeBox>
        </div>
        <div className="example">
          <div className="container">
            <Radio
              defaultValue="pear"
              radioStyle="button"
              onChange={value => this.handleChange(value)}
            >
              <Option value="apple">Apple</Option>
              <Option value="orange">Orange</Option>
              <Option value="pear">Pear</Option>
              <Option value="disabled" disabled={true}>
                Disabled
              </Option>
            </Radio>
          </div>
          <CodeBox title="按钮风格" description="设置按钮风格。">
            {renderString(`import Radio from 'xue-ui-react'`)}
            {renderString(`const Option = Radio.Option`)}
            <br />
            <Code
              code={`&lt;Radio defaultValue="pear" radioStyle="button" onChange={(value) => this.handleChange(value)}&gt;`}
            />
            <Space count={4} />
            <Code code={`&lt;Option value="apple"&gt;Apple&lt;/Option&gt;`} />
            <Space count={4} />
            <Code code={`&lt;Option value="orange"&gt;Orange&lt;/Option&gt;`} />
            <Space count={4} />
            <Code code={`&lt;Option value="pear"&gt;Pear&lt;/Option&gt;`} />
            <Space count={4} />
            <Code
              code={`&lt;Option value="disabled" disabled={true}&gt;Disabled&lt;/Option&gt;`}
            />
            <Code code={`&lt;/Radio&gt;`} />
          </CodeBox>
        </div>
        <div className="example">
          <div className="container">
            <Radio
              value={this.state.value}
              radioStyle="button"
              onChange={value => this.changeState(value)}
            >
              <Option value="apple">Apple</Option>
              <Option value="orange">Orange</Option>
              <Option value="pear">Pear</Option>
              <Option value="disabled" disabled={true}>
                Disabled
              </Option>
            </Radio>
          </div>
          <CodeBox
            title="受控"
            description="选中状态由 value 值控制。"
          >
            {renderString(`import Radio from 'xue-ui-react'`)}
            {renderString(`const Option = Radio.Option`)}
            <br />
            <Code
              code={`&lt;Radio defaultValue="pear" radioStyle="button" onChange={(value) => this.changeState(value)}&gt;`}
            />
            <Space count={4} />
            <Code code={`&lt;Option value="apple"&gt;Apple&lt;/Option&gt;`} />
            <Space count={4} />
            <Code code={`&lt;Option value="orange"&gt;Orange&lt;/Option&gt;`} />
            <Space count={4} />
            <Code code={`&lt;Option value="pear"&gt;Pear&lt;/Option&gt;`} />
            <Space count={4} />
            <Code
              code={`&lt;Option value="disabled" disabled={true}&gt;Disabled&lt;/Option&gt;`}
            />
            <Code code={`&lt;/Radio&gt;`} />
          </CodeBox>
        </div>
        <section>
          <h2>API</h2>
        </section>
        <section className="sub">
          <h3>Radio</h3>
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
              <td>value</td>
              <td className="des">Radio 当前选中项的值</td>
              <td className="type">any</td>
              <td>——</td>
            </tr>
            <tr>
              <td>defaultValue</td>
              <td className="des">Radio 默认选中项的值</td>
              <td className="type">any</td>
              <td>——</td>
            </tr>
            <tr>
              <td>onChange</td>
              <td className="des">选中项改变时的回调</td>
              <td className="type">(value: any, e: React.MouseEvent) => any</td>
              <td>——</td>
            </tr>
            <tr>
              <td>vertical</td>
              <td className="des">选项垂直排列</td>
              <td className="type">boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>radioStyle</td>
              <td className="des">选项风格</td>
              <td className="type">'radio' | 'button'</td>
              <td>'radio'</td>
            </tr>
            <tr>
              <td>className</td>
              <td className="des">自定义 Radio 类名</td>
              <td className="type">string</td>
              <td>——</td>
            </tr>
            <tr>
              <td>style</td>
              <td className="des">自定义 Radio 样式</td>
              <td className="type">React.CSSProperties</td>
              <td>——</td>
            </tr>
          </tbody>
        </table>
        <section className="sub">
          <h3>Option</h3>
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
              <td>value</td>
              <td className="des">选项的值，用于判断是否选中</td>
              <td className="type">any</td>
              <td>——</td>
            </tr>
            <tr>
              <td>disabled</td>
              <td className="des">禁用状态</td>
              <td className="type">boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>className</td>
              <td className="des">自定义 Option 类名</td>
              <td className="type">string</td>
              <td>——</td>
            </tr>
            <tr>
              <td>style</td>
              <td className="des">自定义 Option 样式</td>
              <td className="type">React.CSSProperties</td>
              <td>——</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default RadioExample

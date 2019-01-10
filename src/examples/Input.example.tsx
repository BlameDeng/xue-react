import * as React from 'react'
import Input from 'src/packages/input/Input'
const Textarea = Input.Textarea
const Search = Input.Search
import Code from '../components/Code'
import CodeBox from '../components/CodeBox'
import { renderString } from 'src/utils/renderCode'

class InputExample extends React.Component {
  public static displayName = 'InputExample'

  public handleChange: React.ChangeEventHandler = e => {
    const target = e.target as HTMLInputElement
    console.log('the value is', target.value)
  }

  public handleSearch = (value: string) => {
    console.log('the value of Search is', value)
  }

  public render() {
    return (
      <div className="input-example">
        <section>
          <h1>Input 输入框</h1>
          <p className="text">用于输入内容的基础表单组件。</p>
        </section>
        <section>
          <h2>何时使用</h2>
          <p className="text">需要用户输入内容时。</p>
        </section>
        <section>
          <h2>代码示例</h2>
        </section>
        <div className="example">
          <div className="container">
            <Input placeholder="placeholder" onChange={this.handleChange} />
          </div>
          <CodeBox title="基本使用" description="基本使用。">
            {renderString(`import Input from 'xue-ui-react'`)}
            <br />
            <Code
              code={`&lt;Input placeholder="placeholder" onChange={this.handleChange} /&gt;`}
            />
          </CodeBox>
        </div>
        <div className="example">
          <div className="container">
            <Input
              addonBefore="Http://"
              addonAfter=".com"
              placeholder="yoursite"
              onChange={this.handleChange}
            />
          </div>
          <CodeBox title="前置 / 后置标签" description="用于配置一些固定组合。">
            {renderString(`import Input from 'xue-ui-react'`)}
            <br />
            <Code
              code={`&lt;Input addonBefore="Http://" addonAfter=".com" placeholder="yoursite" onChange={this.handleChange} /&gt;`}
            />
          </CodeBox>
        </div>
        <div className="example">
          <div className="container" style={{ flexDirection: 'column',alignItems:'flex-start' }}>
            <Input
              prefix="user"
              placeholder="username"
              onChange={this.handleChange}
            />
            <br />
            <Input
              suffix="lock"
              placeholder="password"
              onChange={this.handleChange}
            />
          </div>
          <CodeBox
            title="前缀 / 后缀图标"
            description="在输入框上添加前缀或后缀图标。"
          >
            {renderString(`import Input from 'xue-ui-react'`)}
            <br />
            <Code
              code={`&lt;Input prefix="user" placeholder="username" onChange={this.handleChange} /&gt;`}
            />
            <Code
              code={`&lt;Input suffix="lock" placeholder="password" onChange={this.handleChange} /&gt;`}
            />
          </CodeBox>
        </div>
        <div className="example">
          <div className="container">
            <Input disabled={true} placeholder="disabled" />
          </div>
          <CodeBox title="禁用" description="禁用状态。">
            {renderString(`import Input from 'xue-ui-react'`)}
            <br />
            <Code
              code={`&lt;Input disabled={true} placeholder="disabled" /&gt;`}
            />
          </CodeBox>
        </div>
        <div className="example">
          <div className="container">
            <Input error={true} placeholder="error" />
          </div>
          <CodeBox title="错误" description="错误状态。">
            {renderString(`import Input from 'xue-ui-react'`)}
            <br />
            <Code code={`&lt;Input error={true} placeholder="error" /&gt;`} />
          </CodeBox>
        </div>
        <div className="example">
          <div className="container">
            <Search
              placeholder="default"
              onSearch={value => this.handleSearch(value)}
            />
          </div>
          <CodeBox title="搜索框" description="默认的搜索框。">
            {renderString(`import Input from 'xue-ui-react'`)}
            {renderString(`const Search = Input.Search`)}
            <br />
            <Code
              code={`&lt;Search placeholder="default" onSearch={(value) => this.handleSearch(value)} /&gt;`}
            />
          </CodeBox>
        </div>
        <div className="example">
          <div className="container">
            <Search
              enterButton={true}
              placeholder="enterButton"
              onSearch={value => this.handleSearch(value)}
            />
          </div>
          <CodeBox title="搜索按钮" description="带搜索按钮的搜索框。">
            {renderString(`import Input from 'xue-ui-react'`)}
            {renderString(`const Search = Input.Search`)}
            <br />
            <Code
              code={`&lt;Search enterButton={true} placeholder="enterButton" onSearch={(value) => this.handleSearch(value)} /&gt;`}
            />
          </CodeBox>
        </div>
        <div className="example">
          <div className="container">
            <Search
              enterButton="Search"
              onSearch={value => this.handleSearch(value)}
            />
          </div>
          <CodeBox title="自定义" description="自定义搜索按钮内容。">
            {renderString(`import Input from 'xue-ui-react'`)}
            {renderString(`const Search = Input.Search`)}
            <br />
            <Code
              code={`&lt;Search enterButton="Search" onSearch={(value) => this.handleSearch(value)} /&gt;`}
            />
          </CodeBox>
        </div>
        <div className="example">
          <div className="container">
            <Textarea placeholder="textarea" onChange={this.handleChange} />
          </div>
          <CodeBox title="文本输入框" description="默认的文本输入框。">
            {renderString(`import Input from 'xue-ui-react'`)}
            {renderString(`const Textarea = Input.Textarea`)}
            <br />
            <Code
              code={`&lt;Textarea placeholder="textarea" onChange={this.handleChange} /&gt;`}
            />
          </CodeBox>
        </div>
        <div className="example">
          <div className="container">
            <Textarea
              autosize={true}
              placeholder="autosize"
              onChange={this.handleChange}
            />
          </div>
          <CodeBox title="自适应" description="高度自适应的文本输入框。">
            {renderString(`import Input from 'xue-ui-react'`)}
            {renderString(`const Textarea = Input.Textarea`)}
            <br />
            <Code
              code={`&lt;Textarea autosize={true} placeholder="autosize" onChange={this.handleChange} /&gt;`}
            />
          </CodeBox>
        </div>
        <section>
          <h2>API</h2>
        </section>
        <section className="sub">
          <h3>Input</h3>
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
              <td className="des">输入框当前值</td>
              <td className="type">string</td>
              <td>——</td>
            </tr>
            <tr>
              <td>defaultValue</td>
              <td className="des">输入框默认值</td>
              <td className="type">string</td>
              <td>——</td>
            </tr>
            <tr>
              <td>placeholder</td>
              <td className="des">原生属性</td>
              <td className="type">string</td>
              <td>——</td>
            </tr>
            <tr>
              <td>addonBefore</td>
              <td className="des">前置标签</td>
              <td className="type">string | ReactNode</td>
              <td>——</td>
            </tr>
            <tr>
              <td>addonAfter</td>
              <td className="des">后置标签</td>
              <td className="type">string | ReactNode</td>
              <td>——</td>
            </tr>
            <tr>
              <td>prefix</td>
              <td className="des">
                前缀图标。设置为 string 时为对应的 Icon 图标
              </td>
              <td className="type">string | ReactNode</td>
              <td>——</td>
            </tr>
            <tr>
              <td>suffix</td>
              <td className="des">
                后缀图标。设置为 string 时为对应的 Icon 图标
              </td>
              <td className="type">string | ReactNode</td>
              <td>——</td>
            </tr>
            <tr>
              <td>disabled</td>
              <td className="des">禁用状态</td>
              <td className="type">boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>error</td>
              <td className="des">错误状态</td>
              <td className="type">boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>onChange</td>
              <td className="des">值改变时的回调</td>
              <td className="type">React.ChangeEventHandler</td>
              <td>——</td>
            </tr>
            <tr>
              <td>onPressEnter</td>
              <td className="des">按下回车键时的回调</td>
              <td className="type">React.KeyboardEventHandler</td>
              <td>——</td>
            </tr>
            <tr>
              <td>onKeyDown</td>
              <td className="des">按下键盘时的回调</td>
              <td className="type">React.KeyboardEventHandler</td>
              <td>——</td>
            </tr>
            <tr>
              <td>onFocus</td>
              <td className="des">聚焦时的回调</td>
              <td className="type">React.FocusEventHandler</td>
              <td>——</td>
            </tr>
            <tr>
              <td>onBlur</td>
              <td className="des">失去焦点时的回调</td>
              <td className="type">React.FocusEventHandler</td>
              <td>——</td>
            </tr>
            <tr>
              <td>className</td>
              <td className="des">自定义输入框外层 label 容器类名</td>
              <td className="type">string</td>
              <td>——</td>
            </tr>
            <tr>
              <td>style</td>
              <td className="des">自定义输入框样式</td>
              <td className="type">React.CSSProperties</td>
              <td>——</td>
            </tr>
          </tbody>
        </table>
        <section className="sub">
          <h3>Search</h3>
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
              <td className="des">搜索框当前值</td>
              <td className="type">string</td>
              <td>——</td>
            </tr>
            <tr>
              <td>defaultValue</td>
              <td className="des">搜索框默认值</td>
              <td className="type">string</td>
              <td>——</td>
            </tr>
            <tr>
              <td>placeholder</td>
              <td className="des">原生属性</td>
              <td className="type">string</td>
              <td>——</td>
            </tr>
            <tr>
              <td>onChange</td>
              <td className="des">值改变时的回调</td>
              <td className="type">React.ChangeEventHandler</td>
              <td>——</td>
            </tr>
            <tr>
              <td>onSearch</td>
              <td className="des">点击搜索图标 / 按钮 / 按下回车键时的回调</td>
              <td className="type">(value: string) => any</td>
              <td>——</td>
            </tr>
            <tr>
              <td>className</td>
              <td className="des">自定义搜索框外层 label 容器类名</td>
              <td className="type">string</td>
              <td>——</td>
            </tr>
            <tr>
              <td>style</td>
              <td className="des">自定义搜索框样式</td>
              <td className="type">React.CSSProperties</td>
              <td>——</td>
            </tr>
          </tbody>
        </table>
        <section className="sub">
          <h3>Textarea</h3>
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
              <td className="des">文本输入框当前值</td>
              <td className="type">string</td>
              <td>——</td>
            </tr>
            <tr>
              <td>defaultValue</td>
              <td className="des">文本输入框默认值</td>
              <td className="type">string</td>
              <td>——</td>
            </tr>
            <tr>
              <td>placeholder</td>
              <td className="des">原生属性</td>
              <td className="type">string</td>
              <td>——</td>
            </tr>
            <tr>
              <td>autosize</td>
              <td className="des">自适应高度</td>
              <td className="type">boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>size</td>
              <td className="des">设置文本输入框的 rows 和 cols 属性</td>
              <td className="type">
                {`{ rows: number | string, cols: number | string }`}
              </td>
              <td>——</td>
            </tr>
            <tr>
              <td>onChange</td>
              <td className="des">值改变时的回调</td>
              <td className="type">React.ChangeEventHandler</td>
              <td>——</td>
            </tr>
            <tr>
              <td>onPressEnter</td>
              <td className="des">按下回车键时的回调</td>
              <td className="type">React.KeyboardEventHandler</td>
              <td>——</td>
            </tr>
            <tr>
              <td>className</td>
              <td className="des">自定义文本输入框类名</td>
              <td className="type">string</td>
              <td>——</td>
            </tr>
            <tr>
              <td>style</td>
              <td className="des">自定义文本输入框样式</td>
              <td className="type">React.CSSProperties</td>
              <td>——</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default InputExample

import * as React from 'react'
import Button from 'src/packages/button/Button'
import Code from '../components/Code'
import CodeBox from '../components/CodeBox'
import Space from 'src/components/Space'
import { renderString } from 'src/utils/renderCode'
const ButtonGroup = Button.Group

interface IButtonExampleState {
  size: 'small' | 'medium' | 'large'
  loading: boolean
}

class ButtonExample extends React.Component<{}, IButtonExampleState> {
  public static displayName = 'ButtonExample'

  public state: IButtonExampleState = {
    size: 'medium',
    loading: false
  }

  public handleChangeSize = (size: 'small' | 'medium' | 'large') => {
    this.setState({ size })
  }

  public handleClick = () => {
    this.setState({
      loading: !this.state.loading
    })
  }

  public render() {
    const { loading } = this.state
    return (
      <div className="button-example">
        <section>
          <h1>Button 按钮</h1>
          <p className="text">点击以开始即时操作。</p>
        </section>
        <section>
          <h2>何时使用</h2>
          <p className="text">响应用户点击行为，触发相应业务逻辑。</p>
        </section>
        <section>
          <h2>代码示例</h2>
        </section>
        <div className="example">
          <div className="container">
            <Button style={{ marginRight: '20px' }}>Default</Button>
            <Button style={{ marginRight: '20px' }} type="primary">
              Primary
            </Button>
            <Button style={{ marginRight: '20px' }} type="dashed">
              Dashed
            </Button>
            <Button style={{ marginRight: '20px' }} type="danger">
              Danger
            </Button>
          </div>
          <CodeBox
            title="按钮类型"
            description="按钮有四种类型：默认按钮、主要按钮、虚线按钮和危险按钮。"
          >
            {renderString(`import Button from 'xue-ui-react'`)}
            <br />
            <Code code={`&lt;Button&gt;Default&lt;/Button&gt;`} />
            <Code
              code={`&lt;Button type="primary"&gt;Primary&lt;/Button&gt;`}
            />
            <Code code={`&lt;Button type="dashed"&gt;Dashed&lt;/Button&gt;`} />
            <Code code={`&lt;Button type="danger"&gt;Danger&lt;/Button&gt;`} />
          </CodeBox>
        </div>
        <div className="example">
          <div className="container">
            <Button disabled={true} style={{ marginRight: '20px' }}>
              Disabled
            </Button>
            <Button
              loading={true}
              type="primary"
              style={{ marginRight: '20px' }}
            >
              Loading
            </Button>
            <Button
              icon="setting"
              loading={loading}
              type="primary"
              onClick={this.handleClick}
            >
              Click me
            </Button>
          </div>
          <CodeBox
            title="Disabled 和 Loading 状态"
            description="设置按钮的禁用和加载中状态。"
          >
            {renderString(`import Button from 'xue-ui-react'`)}
            <br />
            <Code
              code={`&lt;Button disabled={true}&gt;Disabled&lt;/Button&gt;`}
            />
            <Code
              code={`&lt;Button loading={true} type="primary"&gt;Loading&lt;/Button&gt;`}
            />
            <Code
              code={`&lt;Button icon="setting" loading={this.state.loading} type="primary" onClick={this.handleClick}&gt;Click me&lt;/Button&gt;`}
            />
          </CodeBox>
        </div>
        <div className="example">
          <div className="container">
            <Button style={{ marginRight: '20px' }} icon="setting">
              Icon
            </Button>
            <Button icon="setting" position="right">
              Icon
            </Button>
          </div>
          <CodeBox title="Icon 图标" description="设置内嵌 Icon 图标和位置">
            {renderString(`import Button from 'xue-ui-react'`)}
            <br />
            <Code code={`&lt;Button icon="setting"&gt;Icon&lt;/Button&gt;`} />
            <Code
              code={`&lt;Button icon="setting" position="right"&gt;Icon&lt;/Button&gt;`}
            />
          </CodeBox>
        </div>
        <div className="example">
          <div
            className="container"
            style={{ backgroundColor: 'rgb(190,200,200)' }}
          >
            <Button style={{ marginRight: '20px' }} ghost={true}>
              Default
            </Button>
            <Button style={{ marginRight: '20px' }} ghost={true} type="primary">
              Primary
            </Button>
            <Button style={{ marginRight: '20px' }} ghost={true} type="dashed">
              Dashed
            </Button>
            <Button ghost={true} type="danger">
              Danger
            </Button>
          </div>
          <CodeBox title="幽灵按钮" description="幽灵按钮常用在有色背景上。">
            {renderString(`import Button from 'xue-ui-react'`)}
            <br />
            <Code code={`&lt;Button ghost={true}&gt;Default&lt;/Button&gt;`} />
            <Code
              code={`&lt;Button ghost={true} type="primary"&gt;Primary&lt;/Button&gt;`}
            />
            <Code
              code={`&lt;Button ghost={true} type="dashed"&gt;Dashed&lt;/Button&gt;`}
            />
            <Code
              code={`&lt;Button ghost={true} type="danger"&gt;Danger&lt;/Button&gt;`}
            />
          </CodeBox>
        </div>
        <div className="example">
          <div className="container">
            <Button
              style={{ marginRight: '20px' }}
              size={this.state.size}
              type="primary"
            >
              Click the ButtonGroup
            </Button>
            <Button
              style={{ marginRight: '20px' }}
              size={this.state.size}
              type="primary"
            >
              Click the ButtonGroup
            </Button>
            <Button size={this.state.size} type="primary">
              Click the ButtonGroup
            </Button>
          </div>
          <CodeBox
            title="按钮尺寸"
            description="按钮有大、中、小三种尺寸。点击下方的按钮组合查看各种尺寸的效果。"
          >
            {renderString(`import Button from 'xue-ui-react'`)}
            <br />
            <Code
              code={`&lt;Button size={this.state.size} type="primary"&gt;Click the ButtonGroup&lt;/Button&gt;`}
            />
            <Code
              code={`&lt;Button size={this.state.size} type="primary"&gt;Click the ButtonGroup&lt;/Button&gt;`}
            />
            <Code
              code={`&lt;Button size={this.state.size} type="primary"&gt;Click the ButtonGroup&lt;/Button&gt;`}
            />
          </CodeBox>
        </div>
        <div className="example">
          <div className="container">
            <ButtonGroup>
              <Button onClick={() => this.handleChangeSize('small')}>
                Small
              </Button>
              <Button onClick={() => this.handleChangeSize('medium')}>
                Medium
              </Button>
              <Button onClick={() => this.handleChangeSize('large')}>
                Large
              </Button>
            </ButtonGroup>
          </div>
          <CodeBox title="按钮组合" description="可以容纳多个按钮的容器。">
            {renderString(`import Button from 'xue-ui-react'`)}
            {renderString(`const ButtonGroup = Button.Group`)}
            <br />
            <Code code={`&lt;ButtonGroup&gt;`} />
            <Space count={4} />
            <Code
              code={`&lt;Button onClick={() => this.handleChangeSize('small')}&gt;Small&lt;/Button&gt;`}
            />
            <Space count={4} />
            <Code
              code={`&lt;Button onClick={() => this.handleChangeSize('medium')}&gt;Medium&lt;/Button&gt;`}
            />
            <Space count={4} />
            <Code
              code={`&lt;Button onClick={() => this.handleChangeSize('large')}&gt;Large&lt;/Button&gt;`}
            />
            <Code code={`&lt;/ButtonGroup&gt;`} />
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
              <td>icon</td>
              <td className="des">内嵌 Icon 图标的 name 属性</td>
              <td className="type">string</td>
              <td>——</td>
            </tr>
            <tr>
              <td>position</td>
              <td className="des">内嵌 Icon 图标的位置</td>
              <td className="type">'left' | 'right'</td>
              <td>'left'</td>
            </tr>
            <tr>
              <td>type</td>
              <td className="des">不同样式风格的按钮</td>
              <td className="type">
                'default' | 'dashed' | 'primary' | 'danger'
              </td>
              <td>'default'</td>
            </tr>
            <tr>
              <td>size</td>
              <td className="des">按钮的尺寸</td>
              <td className="type">'small' | 'medium' | 'large'</td>
              <td>'medium'</td>
            </tr>
            <tr>
              <td>loading</td>
              <td className="des">加载中状态</td>
              <td className="type">boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>disabled</td>
              <td className="des">禁用状态</td>
              <td className="type">boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>ghost</td>
              <td className="des">幽灵按钮</td>
              <td className="type">boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>htmlType</td>
              <td className="des">按钮的原生 type 属性</td>
              <td className="type">'button' | 'submit' | 'reset'</td>
              <td>'button'</td>
            </tr>
            <tr>
              <td>onClick</td>
              <td className="des">点击按钮时的回调</td>
              <td className="type">React.MouseEventHandler</td>
              <td>——</td>
            </tr>
            <tr>
              <td>className</td>
              <td className="des">自定义按钮类名</td>
              <td className="type">string</td>
              <td>——</td>
            </tr>
            <tr>
              <td>style</td>
              <td className="des">自定义按钮样式</td>
              <td className="type">React.CSSProperties</td>
              <td>——</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default ButtonExample

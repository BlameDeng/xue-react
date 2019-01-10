import * as React from 'react'
import * as PropTypes from 'prop-types'
import Pager from 'src/packages/pager/Pager'
import Button from 'src/packages/button/Button'
import Code from '../components/Code'
import CodeBox from '../components/CodeBox'
import Space from 'src/components/Space'
import { renderString } from 'src/utils/renderCode'

class PagerExample extends React.Component {
  public static displayName = 'PagerExample'

  public state = {
    current: 1
  }

  public changeState = (current: number) => {
    this.setState({
      current
    })
  }

  public handleChange = (current: number) => {
    console.log(current)
  }

  public render() {
    return (
      <div className="pager-example">
        <section>
          <h1>Pager 分页</h1>
          <p className="text">分隔长列表，展示单个页面。</p>
        </section>
        <section>
          <h2>何时使用</h2>
          <p className="text">加载/渲染所有数据开销较大时。</p>
        </section>
        <section>
          <h2>代码示例</h2>
        </section>
        <div className="example">
          <div className="container" style={{ flexWrap: 'wrap' }}>
            <Pager total={5} onChange={current => this.handleChange(current)} />
          </div>
          <CodeBox title="基本" description="最简单的用法。">
            {renderString(`import Pager from 'xue-ui-react'`)}
            <br />
            <Code
              code={`&lt;Pager total={5} onChange={(current) => this.handleChange(current)} /&gt;`}
            />
          </CodeBox>
        </div>
        <div className="example">
          <div className="container" style={{ flexWrap: 'wrap' }}>
            <Pager
              total={400}
              onChange={current => this.handleChange(current)}
            />
          </div>
          <CodeBox title="更多" description="页码更多时显示效果。">
            {renderString(`import Pager from 'xue-ui-react'`)}
            <br />
            <Code
              code={`&lt;Pager total={400} onChange={(current) => this.handleChange(current)} /&gt;`}
            />
          </CodeBox>
        </div>
        <div className="example">
          <div className="container" style={{ flexWrap: 'wrap' }}>
            <Pager
              total={20}
              size="small"
              onChange={current => this.handleChange(current)}
            />
          </div>
          <CodeBox title="迷你" description="迷你版本。">
            {renderString(`import Pager from 'xue-ui-react'`)}
            <br />
            <Code
              code={`&lt;Pager total={20} size="small" onChange={(current) => this.handleChange(current)} /&gt;`}
            />
          </CodeBox>
        </div>
        <div className="example">
          <div className="container" style={{ flexWrap: 'wrap' }}>
            <Pager
              total={20}
              simple={true}
              onChange={current => this.handleChange(current)}
            />
          </div>
          <CodeBox title="简洁" description="简洁版本。">
            {renderString(`import Pager from 'xue-ui-react'`)}
            <br />
            <Code
              code={`&lt;Pager total={20} simple={true} onChange={(current) => this.handleChange(current)} /&gt;`}
            />
          </CodeBox>
        </div>
        <div className="example">
          <div className="container" style={{ flexWrap: 'wrap' }}>
            <Pager
              total={20}
              current={this.state.current}
              onChange={current => this.changeState(current)}
            />
          </div>
          <CodeBox title="受控" description="页码由 current 控制。">
            {renderString(`import Pager from 'xue-ui-react'`)}
            <br />
            <Code
              code={`&lt;Pager total={20} current={this.state.current}  onChange={(current) => this.changeState(current)} /&gt;`}
            />
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
              <td>current</td>
              <td className="des">当前页码</td>
              <td className="type">number</td>
              <td>——</td>
            </tr>
            <tr>
              <td>defaultCurrent</td>
              <td className="des">默认的当前页码</td>
              <td className="type">number</td>
              <td>1</td>
            </tr>
            <tr>
              <td>total</td>
              <td className="des">总页数，必须项</td>
              <td className="type">number</td>
              <td>——</td>
            </tr>
            <tr>
              <td>size</td>
              <td className="des">尺寸</td>
              <td className="type">'small' | 'default'</td>
              <td>'default'</td>
            </tr>
            <tr>
              <td>simple</td>
              <td className="des">简洁版本</td>
              <td className="type">Boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>hideOnSinglePage</td>
              <td className="des">只有一页时是否隐藏</td>
              <td className="type">Boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>onChange</td>
              <td className="des">页码改变时的回调</td>
              <td className="type">(current: number) => any</td>
              <td>——</td>
            </tr>
            <tr>
              <td>className</td>
              <td className="des">自定义 Pager 类名</td>
              <td className="type">string</td>
              <td>——</td>
            </tr>
            <tr>
              <td>style</td>
              <td className="des">自定义 Pager 样式</td>
              <td className="type">React.CSSProperties</td>
              <td>——</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default PagerExample

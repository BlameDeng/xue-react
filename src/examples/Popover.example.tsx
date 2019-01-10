import * as React from 'react'
import Popover from 'src/packages/popover/Popover'
import Button from 'src/packages/button/Button'
import Code from '../components/Code'
import CodeBox from '../components/CodeBox'
import Space from 'src/components/Space'
import { renderString } from 'src/utils/renderCode'

class PopoverExample extends React.Component {
  public static displayName = 'PopoverExample'

  private content = (
    <div className="pop-example-content" style={{ width: '150px' }}>
      <div className="title">Title</div>
      <ul className="content-list">
        <li>Content</li>
        <li>Content</li>
        <li>Content</li>
      </ul>
    </div>
  )

  public render() {
    const { content } = this
    return (
      <div className="popover-example">
        <section>
          <h1>Popover 气泡卡片</h1>
          <p className="text">触发时弹出卡片浮层。</p>
        </section>
        <section>
          <h2>何时使用</h2>
          <p className="text">
            根据用户的操作行为展现目标元素的进一步提示或相关操作时。
          </p>
        </section>
        <section>
          <h2>代码示例</h2>
        </section>
        <div className="example">
          <div className="container">
            <Popover content={content}>
              <Button type="primary">Hover me</Button>
            </Popover>
          </div>
          <CodeBox
            title="基本"
            description="最简单的用法，浮层大小由内容区决定。"
          >
            {renderString(`import Popover from 'xue-ui-react'`)}
            <br />
            <Code code={`&lt;Popover content={content}&gt;`} />
            <Space count={4} />
            <Code
              code={`&lt;Button type="primary"&gt;Hover me&lt;/Button&gt;`}
            />
            <Code code={`&lt;/Popover&gt;`} />
          </CodeBox>
        </div>
        <div className="example">
          <div className="container">
            <Popover content={content} position="left">
              <Button type="primary">Left</Button>
            </Popover>
            <div style={{ width: '20px' }} />
            <Popover content={content}>
              <Button type="primary">Top</Button>
            </Popover>
            <div style={{ width: '20px' }} />
            <Popover content={content} position="bottom">
              <Button type="primary">Bottom</Button>
            </Popover>
            <div style={{ width: '20px' }} />
            <Popover content={content} position="right">
              <Button type="primary">Right</Button>
            </Popover>
          </div>
          <CodeBox title="四个方向" description="支持四个方向。">
            {renderString(`import Popover from 'xue-ui-react'`)}
            <br />
            <Code code={`&lt;Popover content={content} position="left"&gt;`} />
            <Space count={4} />
            <Code code={`&lt;Button type="primary"&gt;Left&lt;/Button&gt;`} />
            <Code code={`&lt;/Popover&gt;`} />
            <Code code={`&lt;Popover content={content}&gt;`} />
            <Space count={4} />
            <Code code={`&lt;Button type="primary"&gt;Top&lt;/Button&gt;`} />
            <Code code={`&lt;/Popover&gt;`} />
            <Code
              code={`&lt;Popover content={content} position="bottom"&gt;`}
            />
            <Space count={4} />
            <Code code={`&lt;Button type="primary"&gt;Bottom&lt;/Button&gt;`} />
            <Code code={`&lt;/Popover&gt;`} />
            <Code code={`&lt;Popover content={content} position="right"&gt;`} />
            <Space count={4} />
            <Code code={`&lt;Button type="primary"&gt;Right&lt;/Button&gt;`} />
            <Code code={`&lt;/Popover&gt;`} />
          </CodeBox>
        </div>
        <div className="example">
          <div className="container">
            <Popover content={content}>
              <Button type="primary">Hover</Button>
            </Popover>
            <div style={{ width: '20px' }} />
            <Popover content={content} trigger="click">
              <Button type="primary">Click</Button>
            </Popover>
            <div style={{ width: '20px' }} />
            <Popover content={content} trigger="focus">
              <Button type="primary">Focus</Button>
            </Popover>
          </div>
          <CodeBox
            title="触发方式"
            description="支持 hover, click, focus 三种触发方式。"
          >
            {renderString(`import Popover from 'xue-ui-react'`)}
            <br />
            <Code code={`&lt;Popover content={content}&gt;`} />
            <Space count={4} />
            <Code code={`&lt;Button type="primary"&gt;Hover&lt;/Button&gt;`} />
            <Code code={`&lt;/Popover&gt;`} />
            <Code code={`&lt;Popover content={content} trigger="click"&gt;`} />
            <Space count={4} />
            <Code code={`&lt;Button type="primary"&gt;Click&lt;/Button&gt;`} />
            <Code code={`&lt;/Popover&gt;`} />
            <Code code={`&lt;Popover content={content} trigger="focus"&gt;`} />
            <Space count={4} />
            <Code code={`&lt;Button type="primary"&gt;Focus&lt;/Button&gt;`} />
            <Code code={`&lt;/Popover&gt;`} />
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
              <td>visible</td>
              <td className="des">手动控制浮层显隐</td>
              <td className="type">boolean</td>
              <td>——</td>
            </tr>
            <tr>
              <td>defaultVisible</td>
              <td className="des">浮层默认贤隐</td>
              <td className="type">boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>content</td>
              <td className="des">浮层内容</td>
              <td className="type">string | React.ReactNode</td>
              <td>——</td>
            </tr>
            <tr>
              <td>trigger</td>
              <td className="des">触发方式</td>
              <td className="type">'hover' | 'click' | 'focus'</td>
              <td>'hover'</td>
            </tr>
            <tr>
              <td>position</td>
              <td className="des">浮层的相对位置</td>
              <td className="type">'top' | 'left' | 'right' | 'bottom'</td>
              <td>'top'</td>
            </tr>
            <tr>
              <td>clickPopClose</td>
              <td className="des">触发方式为 click 时点击浮层是否关闭</td>
              <td className="type">boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>onVisibleChange</td>
              <td className="des">浮层显隐状态改变时的回调</td>
              <td className="type">(visible: boolean) => any</td>
              <td>——</td>
            </tr>
            <tr>
              <td>className</td>
              <td className="des">自定义 content 容器类名</td>
              <td className="type">string</td>
              <td>——</td>
            </tr>
            <tr>
              <td>style</td>
              <td className="des">自定义 content 容器样式</td>
              <td className="type">React.CSSProperties</td>
              <td>——</td>
            </tr>
          </tbody>
        </table>
        <section>
          <h2>注意</h2>
          <p className="text">
            请确保 Popover 的子元素能接受
            onMouseEnter、onMouseLeave、onFocus、onBlur、onClick 事件。
          </p>
        </section>
      </div>
    )
  }
}

export default PopoverExample

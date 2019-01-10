import * as React from 'react'
import Slides from 'src/packages/slides/Slides'
import Code from '../components/Code'
import CodeBox from '../components/CodeBox'
import Space from 'src/components/Space'
import { renderString } from 'src/utils/renderCode'

class SlidesExample extends React.Component {
  public static displayName = 'SlidesExample'

  public render() {
    return (
      <div className="slides-example">
        <section>
          <h1>Slides 轮播</h1>
          <p className="text">一组轮播区域。</p>
        </section>
        <section>
          <h2>何时使用</h2>
          <p className="text">需要展现较多内容但空间不足时。</p>
        </section>
        <section>
          <h2>代码示例</h2>
        </section>
        <div className="example">
          <div className="container">
            <Slides style={{ width: '500px' }}>
              <div className="slide-demo">1</div>
              <div className="slide-demo">2</div>
              <div className="slide-demo">3</div>
              <div className="slide-demo">4</div>
            </Slides>
          </div>
          <CodeBox title="基本" description="最简单的用法。">
            {renderString(`import Slides from 'xue-ui-react'`)}
            <br />
            <Code code={`&lt;Slides&gt;`} />
            <Space count={4} />
            <span className="label">&lt;</span>
            <span className="htmltag">div</span>
            <span className="label">&gt;</span>
            <span className="htmlstr">1</span>
            <span className="label">&lt;</span>
            <span className="htmltag">/div</span>
            <span className="label">&gt;</span>
            <br />
            <Space count={4} />
            <span className="label">&lt;</span>
            <span className="htmltag">div</span>
            <span className="label">&gt;</span>
            <span className="htmlstr">2</span>
            <span className="label">&lt;</span>
            <span className="htmltag">/div</span>
            <span className="label">&gt;</span>
            <br />
            <Space count={4} />
            <span className="label">&lt;</span>
            <span className="htmltag">div</span>
            <span className="label">&gt;</span>
            <span className="htmlstr">3</span>
            <span className="label">&lt;</span>
            <span className="htmltag">/div</span>
            <span className="label">&gt;</span>
            <br />
            <Space count={4} />
            <span className="label">&lt;</span>
            <span className="htmltag">div</span>
            <span className="label">&gt;</span>
            <span className="htmlstr">4</span>
            <span className="label">&lt;</span>
            <span className="htmltag">/div</span>
            <span className="label">&gt;</span>
            <br />
            <Code code={`&lt;/Slides&gt;`} />
          </CodeBox>
        </div>
        <div className="example">
          <div className="container">
            <Slides duration={3} style={{ width: '500px' }}>
              <div className="slide-demo">1</div>
              <div className="slide-demo">2</div>
              <div className="slide-demo">3</div>
              <div className="slide-demo">4</div>
            </Slides>
          </div>
          <CodeBox
            title="自动播放"
            description="设置 duration 开始自动播放，单位：秒。"
          >
            {renderString(`import Slides from 'xue-ui-react'`)}
            <br />
            <Code code={`&lt;Slides duration={3}&gt;`} />
            <Space count={4} />
            <span className="label">&lt;</span>
            <span className="htmltag">div</span>
            <span className="label">&gt;</span>
            <span className="htmlstr">1</span>
            <span className="label">&lt;</span>
            <span className="htmltag">/div</span>
            <span className="label">&gt;</span>
            <br />
            <Space count={4} />
            <span className="label">&lt;</span>
            <span className="htmltag">div</span>
            <span className="label">&gt;</span>
            <span className="htmlstr">2</span>
            <span className="label">&lt;</span>
            <span className="htmltag">/div</span>
            <span className="label">&gt;</span>
            <br />
            <Space count={4} />
            <span className="label">&lt;</span>
            <span className="htmltag">div</span>
            <span className="label">&gt;</span>
            <span className="htmlstr">3</span>
            <span className="label">&lt;</span>
            <span className="htmltag">/div</span>
            <span className="label">&gt;</span>
            <br />
            <Space count={4} />
            <span className="label">&lt;</span>
            <span className="htmltag">div</span>
            <span className="label">&gt;</span>
            <span className="htmlstr">4</span>
            <span className="label">&lt;</span>
            <span className="htmltag">/div</span>
            <span className="label">&gt;</span>
            <br />
            <Code code={`&lt;/Slides&gt;`} />
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
              <td>duration</td>
              <td className="des">
                自动播放间隔，设置为 0 时不自动播放，单位：秒
              </td>
              <td className="type">number</td>
              <td>0</td>
            </tr>
            <tr>
              <td>dots</td>
              <td className="des">是否显示面板指示点</td>
              <td className="type">boolean</td>
              <td>true</td>
            </tr>
            <tr>
              <td>beforeChange</td>
              <td className="des">面板开始切换时的回调</td>
              <td className="type">(from: number, to: number) => any</td>
              <td>——</td>
            </tr>
            <tr>
              <td>beforeChange</td>
              <td className="des">面板切换完成（动画结束）时的回调</td>
              <td className="type">(current: number, from: number) => any</td>
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
        <section>
          <h2>Method</h2>
        </section>
        <table className="method-table">
          <thead>
            <tr>
              <th>名称</th>
              <th className="des">描述</th>
              <th>参数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>goTo()</td>
              <td className="des">切换到指定面板</td>
              <td className="params">slideNumber:number</td>
            </tr>
            <tr>
              <td>next()</td>
              <td className="des">切换到下一面板</td>
              <td className="params">——</td>
            </tr>
            <tr>
              <td>prev()</td>
              <td className="des">切换到上一面板</td>
              <td className="params">——</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default SlidesExample

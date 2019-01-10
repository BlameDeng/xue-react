import * as React from 'react'
import Button from 'src/packages/button/Button'
import Transition from 'src/packages/transition/Transition'
import Code from '../components/Code'
import CodeBox from '../components/CodeBox'
import Space from 'src/components/Space'
import { renderString } from 'src/utils/renderCode'
const Unfold = Transition.Unfold

class TransitionExample extends React.Component {
  public static displayName = 'TransitionExample'

  public state = {
    visible1: true,
    visible2: true,
    visible3: true
  }

  public render() {
    return (
      <div className="transition-example">
        <section>
          <h1>Transition 过渡</h1>
          <p className="text">提供入场/离场动画的功能组件。</p>
        </section>
        <section>
          <h2>何时使用</h2>
          <p className="text">适当的动画效果提升用户体验。</p>
        </section>
        <section>
          <h2>代码示例</h2>
        </section>
        <div className="example">
          <div
            className="container"
            style={{ height: '300px', alignItems: 'flex-start' }}
          >
            <Button
              type="primary"
              style={{ marginRight: '20px' }}
              onClick={() => this.setState({ visible1: !this.state.visible1 })}
            >
              Toggle Visible
            </Button>
            <Transition
              visible={this.state.visible1}
              beforeEnter={{ opacity: 0 }}
              afterEnter={{ opacity: 1 }}
              transitionActive={{
                transition: '1s all cubic-bezier(.645, .045, .355, 1)'
              }}
            >
              <div
                style={{
                  width: '150px',
                  height: '150px',
                  backgroundColor: 'rgb(52, 70, 110)',
                  fontSize: '24px',
                  fontWeight: 600,
                  textAlign: 'center',
                  lineHeight: '150px',
                  color: 'rgba(255,255,255,0.85)'
                }}
              >
                Transition
              </div>
            </Transition>
          </div>
          <CodeBox title="基本" description="基本用法">
            {renderString(`import Transition from 'xue-ui-react'`)}
            <br />
            <Code
              code={`&lt;Transition visible={this.state.visible1} beforeEnter={beforeEnterCSS} afterEnter={afterEnterCSS}&gt;`}
            />
            <Space count={4} />
            <span className="label">&lt;</span>
            <span className="htmltag">div</span>
            <span className="label">&gt;</span>
            <span className="htmlstr">Transition</span>
            <span className="label">&lt;</span>
            <span className="htmltag">/div</span>
            <span className="label">&gt;</span>
            <br />
            <Code code={`&lt;/Transition&gt;`} />
          </CodeBox>
        </div>
        <div className="example">
          <div
            className="container"
            style={{ height: '300px', alignItems: 'flex-start' }}
          >
            <Button
              type="primary"
              style={{ marginRight: '20px' }}
              onClick={() => this.setState({ visible2: !this.state.visible2 })}
            >
              Toggle Visible
            </Button>
            <Unfold visible={this.state.visible2}>
              <div
                style={{
                  width: '500px',
                  height: '150px',
                  backgroundColor: 'rgb(52, 70, 110)',
                  fontSize: '24px',
                  fontWeight: 600,
                  textAlign: 'center',
                  lineHeight: '150px',
                  color: '#c41d7f'
                }}
              >
                Horizontal
              </div>
            </Unfold>
          </div>
          <CodeBox
            title="横向展开/收起"
            description="Unfold 是对 Transition 的进一步封装，可以方便的提供横向/纵向的展开/收起动画。"
          >
            {renderString(`import Transition from 'xue-ui-react'`)}
            {renderString(`const Unfold = Transition.Unfold`)}
            <br />
            <Code code={`&lt;Unfold visible={this.state.visible2}&gt;`} />
            <Space count={4} />
            <span className="label">&lt;</span>
            <span className="htmltag">div</span>
            <span className="label">&gt;</span>
            <span className="htmlstr">Horizontal</span>
            <span className="label">&lt;</span>
            <span className="htmltag">/div</span>
            <span className="label">&gt;</span>
            <br />
            <Code code={`&lt;/Unfold&gt;`} />
          </CodeBox>
        </div>
        <div className="example">
          <div
            className="container"
            style={{ height: '300px', alignItems: 'flex-start' }}
          >
            <Button
              type="primary"
              style={{ marginRight: '20px' }}
              onClick={() => this.setState({ visible3: !this.state.visible3 })}
            >
              Toggle Visible
            </Button>
            <Unfold visible={this.state.visible3} vertical={true}>
              <div
                style={{
                  width: '500px',
                  height: '150px',
                  backgroundColor: 'rgb(52, 70, 110)',
                  fontSize: '24px',
                  fontWeight: 600,
                  textAlign: 'center',
                  lineHeight: '150px',
                  color: '#c41d7f'
                }}
              >
                Vertical
              </div>
            </Unfold>
          </div>
          <CodeBox title="纵向展开/收起" description="纵向的展开/收起动画。">
            {renderString(`import Transition from 'xue-ui-react'`)}
            {renderString(`const Unfold = Transition.Unfold`)}
            <br />
            <Code
              code={`&lt;Unfold visible={this.state.visible3} vertical={true}&gt;`}
            />
            <Space count={4} />
            <span className="label">&lt;</span>
            <span className="htmltag">div</span>
            <span className="label">&gt;</span>
            <span className="htmlstr">Vertical</span>
            <span className="label">&lt;</span>
            <span className="htmltag">/div</span>
            <span className="label">&gt;</span>
            <br />
            <Code code={`&lt;/Unfold&gt;`} />
          </CodeBox>
        </div>
        <section>
          <h2>API</h2>
        </section>
        <section className="sub">
          <h3>Transition</h3>
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
              <td className="des">可见状态</td>
              <td className="type">boolean</td>
              <td>——</td>
            </tr>
            <tr>
              <td>beforeEnter</td>
              <td className="des">入场动画开始前的样式</td>
              <td className="type">React.CSSProperties</td>
              <td>——</td>
            </tr>
            <tr>
              <td>afterEnter</td>
              <td className="des">入场动画结束时的样式</td>
              <td className="type">React.CSSProperties</td>
              <td>——</td>
            </tr>
            <tr>
              <td>beforeLeave</td>
              <td className="des">离场动画开始前的样式</td>
              <td className="type">React.CSSProperties</td>
              <td>——</td>
            </tr>
            <tr>
              <td>afterLeave</td>
              <td className="des">离场动画结束时的样式</td>
              <td className="type">React.CSSProperties</td>
              <td>——</td>
            </tr>
            <tr>
              <td>transitionActive</td>
              <td className="des">入场/离场动画时的过渡属性</td>
              <td className="type">React.CSSProperties</td>
              <td>{`{ transition: '.3s all cubic-bezier(.645, .045, .355, 1)' }`}</td>
            </tr>
          </tbody>
        </table>
        <section className="sub">
          <h3>Unfold</h3>
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
              <td className="des">展开状态</td>
              <td className="type">boolean</td>
              <td>——</td>
            </tr>
          </tbody>
        </table>
        <section>
          <h2>Tips</h2>
          <p className="text">
           Transition 组件接受 beforeEnter、afterEnter、beforeLeave、afterLeave 四个属性以达到对入场/离场动画的精确控制，不过如果你只需要一个简单的入场/离场动画（如：淡入淡出），设置 beforeEnter | afterLeave 和 beforeLeave | afterEnter 两个属性也能有不错的效果。
          </p>
        </section>
      </div>
    )
  }
}

export default TransitionExample

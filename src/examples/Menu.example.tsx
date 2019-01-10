import * as React from 'react'
import Menu from 'src/packages/menu/Menu'
import Code from '../components/Code'
import CodeBox from '../components/CodeBox'
import Space from 'src/components/Space'
import { renderString } from 'src/utils/renderCode'
const SubMenu = Menu.SubMenu
const MenuItem = Menu.MenuItem

class MenuExample extends React.Component {
  public static displayName = 'MenuExample'

  public render() {
    return (
      <div className="menu-example">
        <section>
          <h1>Menu 导航菜单</h1>
          <p className="text">为页面提供导航的菜单列表。</p>
        </section>
        <section>
          <h2>何时使用</h2>
          <p className="text">网站顶部和左侧的导航。</p>
        </section>
        <section>
          <h2>代码示例</h2>
        </section>
        <div className="example">
          <div
            className="container"
            style={{
              paddingTop: '50px',
              paddingBottom: '80px',
              display: 'block'
            }}
          >
            <Menu
              mode="horizontal"
              defaultSelectedKey="item1"
              onSelectedChange={(key, expand) =>
                console.log(
                  'selectedKey is',
                  key,
                  '\n',
                  'expandKeys is',
                  expand
                )
              }
              onExpandChange={expand => console.log('expandKeys is', expand)}
            >
              <MenuItem key="item1">Option 1</MenuItem>
              <MenuItem key="item2">Option 2</MenuItem>
              <MenuItem key="item3">Option 3</MenuItem>
              <SubMenu key="sub1" title="SubMenu">
                <MenuItem key="item4">Option 4</MenuItem>
                <MenuItem key="item5">Option 5</MenuItem>
                <MenuItem key="item6">Option 6</MenuItem>
              </SubMenu>
              <SubMenu key="sub2" title="SubMenu">
                <MenuItem key="item7">Option 7</MenuItem>
                <MenuItem key="item8">Option 8</MenuItem>
                <MenuItem key="item9">Option 9</MenuItem>
              </SubMenu>
            </Menu>
          </div>
          <CodeBox title="水平导航" description="水平的顶部导航菜单。">
            {renderString(`import Menu from 'xue-ui-react'`)}
            {renderString(`const SubMenu = Menu.SubMenu`)}
            {renderString(`const MenuItem = Menu.MenuItem`)}
            <br />
            <Code code={`&lt;Menu mode="horizontal"&gt;`} />
            <Space count={4} />
            <Code
              code={`&lt;MenuItem key="item1"&gt;Option 1&lt;/MenuItem&gt;`}
            />
            <Space count={4} />
            <Code
              code={`&lt;MenuItem key="item2"&gt;Option 2&lt;/MenuItem&gt;`}
            />
            <Space count={4} />
            <Code
              code={`&lt;MenuItem key="item3"&gt;Option 3&lt;/MenuItem&gt;`}
            />
            <Space count={4} />
            <Code code={`&lt;SubMenu key="sub1" title="SubMenu"&gt;`} />
            <Space count={8} />
            <Code
              code={`&lt;MenuItem key="item4"&gt;Option 4&lt;/MenuItem&gt;`}
            />
            <Space count={8} />
            <Code
              code={`&lt;MenuItem key="item5"&gt;Option 5&lt;/MenuItem&gt;`}
            />
            <Space count={8} />
            <Code
              code={`&lt;MenuItem key="item6"&gt;Option 6&lt;/MenuItem&gt;`}
            />
            <Space count={4} />
            <Code code={`&lt;/SubMenu&gt;`} />
            <Space count={4} />
            <Code code={`&lt;SubMenu key="sub2" title="SubMenu"&gt;`} />
            <Space count={8} />
            <Code
              code={`&lt;MenuItem key="item7"&gt;Option 7&lt;/MenuItem&gt;`}
            />
            <Space count={8} />
            <Code
              code={`&lt;MenuItem key="item8"&gt;Option 8&lt;/MenuItem&gt;`}
            />
            <Space count={8} />
            <Code
              code={`&lt;MenuItem key="item9"&gt;Option 9&lt;/MenuItem&gt;`}
            />
            <Space count={4} />
            <Code code={`&lt;/SubMenu&gt;`} />
            <Code code={`&lt;/Menu&gt;`} />
          </CodeBox>
        </div>
        <div className="example">
          <div
            className="container"
            style={{
              paddingTop: '50px',
              paddingBottom: '80px',
              display: 'block'
            }}
          >
            <Menu
              mode="vertical"
              theme="dark"
              defaultSelectedKey="item1"
              defaultExpandKeys={['sub1', 'sub2']}
              style={{ width: '250px' }}
              onSelectedChange={(key, expand) =>
                console.log(
                  'selectedKey is',
                  key,
                  '\n',
                  'expandKeys is',
                  expand
                )
              }
              onExpandChange={expand => console.log('expandKeys is', expand)}
            >
              <MenuItem key="item1">Option 1</MenuItem>
              <MenuItem key="item2">Option 2</MenuItem>
              <MenuItem key="item3">Option 3</MenuItem>
              <SubMenu key="sub1" title="SubMenu">
                <MenuItem key="item4">Option 4</MenuItem>
                <MenuItem key="item5">Option 5</MenuItem>
                <MenuItem key="item6">Option 6</MenuItem>
              </SubMenu>
              <SubMenu key="sub2" title="SubMenu">
                <MenuItem key="item7">Option 7</MenuItem>
                <MenuItem key="item8">Option 8</MenuItem>
                <MenuItem key="item9">Option 9</MenuItem>
              </SubMenu>
            </Menu>
          </div>
          <CodeBox title="垂直导航" description="垂直的侧边导航菜单。">
            {renderString(`import Menu from 'xue-ui-react'`)}
            {renderString(`const SubMenu = Menu.SubMenu`)}
            {renderString(`const MenuItem = Menu.MenuItem`)}
            <br />
            <Code code={`&lt;Menu mode="vertical" theme="dark"&gt;`} />
            <Space count={4} />
            <Code
              code={`&lt;MenuItem key="item1"&gt;Option 1&lt;/MenuItem&gt;`}
            />
            <Space count={4} />
            <Code
              code={`&lt;MenuItem key="item2"&gt;Option 2&lt;/MenuItem&gt;`}
            />
            <Space count={4} />
            <Code
              code={`&lt;MenuItem key="item3"&gt;Option 3&lt;/MenuItem&gt;`}
            />
            <Space count={4} />
            <Code code={`&lt;SubMenu key="sub1" title="SubMenu"&gt;`} />
            <Space count={8} />
            <Code
              code={`&lt;MenuItem key="item4"&gt;Option 4&lt;/MenuItem&gt;`}
            />
            <Space count={8} />
            <Code
              code={`&lt;MenuItem key="item5"&gt;Option 5&lt;/MenuItem&gt;`}
            />
            <Space count={8} />
            <Code
              code={`&lt;MenuItem key="item6"&gt;Option 6&lt;/MenuItem&gt;`}
            />
            <Space count={4} />
            <Code code={`&lt;/SubMenu&gt;`} />
            <Space count={4} />
            <Code code={`&lt;SubMenu key="sub2" title="SubMenu"&gt;`} />
            <Space count={8} />
            <Code
              code={`&lt;MenuItem key="item7"&gt;Option 7&lt;/MenuItem&gt;`}
            />
            <Space count={8} />
            <Code
              code={`&lt;MenuItem key="item8"&gt;Option 8&lt;/MenuItem&gt;`}
            />
            <Space count={8} />
            <Code
              code={`&lt;MenuItem key="item9"&gt;Option 9&lt;/MenuItem&gt;`}
            />
            <Space count={4} />
            <Code code={`&lt;/SubMenu&gt;`} />
            <Code code={`&lt;/Menu&gt;`} />
          </CodeBox>
        </div>
        <section>
          <h2>API</h2>
        </section>
        <section className="sub">
          <h3>Menu</h3>
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
              <td>selectedKey</td>
              <td className="des">当前激活子选项的 key </td>
              <td className="type">string</td>
              <td>——</td>
            </tr>
            <tr>
              <td>expandKeys</td>
              <td className="des">当前展开子菜单的 key 数组</td>
              <td className="type">string[]</td>
              <td>——</td>
            </tr>
            <tr>
              <td>defaultSelectedKey</td>
              <td className="des">默认激活子选项的 key</td>
              <td className="type">string</td>
              <td>——</td>
            </tr>
            <tr>
              <td>defaultExpandKeys</td>
              <td className="des">默认展开子菜单的 key 数组</td>
              <td className="type">string[]</td>
              <td>——</td>
            </tr>
            <tr>
              <td>mode</td>
              <td className="des">菜单类型</td>
              <td className="type">'vertical' | 'horizontal'</td>
              <td>'vertical'</td>
            </tr>
            <tr>
              <td>theme</td>
              <td className="des">主题颜色</td>
              <td className="type">'light' | 'dark'</td>
              <td>'light'</td>
            </tr>
            <tr>
              <td>onSelectedChange</td>
              <td className="des">激活子选项改变时的回调</td>
              <td className="type"> (selectedKey: string, expandKeys:string[]) => any</td>
              <td>——</td>
            </tr>
            <tr>
              <td>onExpandChange</td>
              <td className="des">展开子菜单改变时的回调</td>
              <td className="type">(expandKeys: string[]) => any</td>
              <td>——</td>
            </tr>
            <tr>
              <td>className</td>
              <td className="des">自定义 Menu 类名</td>
              <td className="type">string</td>
              <td>——</td>
            </tr>
            <tr>
              <td>style</td>
              <td className="des">自定义 Menu 样式</td>
              <td className="type">React.CSSProperties</td>
              <td>——</td>
            </tr>
          </tbody>
        </table>
        <section className="sub">
          <h3>SubMenu</h3>
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
              <td>key</td>
              <td className="des">唯一标志</td>
              <td className="type">string</td>
              <td>——</td>
            </tr>
            <tr>
              <td>title</td>
              <td className="des">子菜单标题</td>
              <td className="type">string | React.ReactNode</td>
              <td>——</td>
            </tr>
            <tr>
              <td>className</td>
              <td className="des">自定义子菜单标题类名</td>
              <td className="type">string</td>
              <td>——</td>
            </tr>
            <tr>
              <td>style</td>
              <td className="des">自定义子菜单标题样式</td>
              <td className="type">React.CSSProperties</td>
              <td>——</td>
            </tr>
          </tbody>
        </table>
        <section className="sub">
          <h3>MenuItem</h3>
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
              <td>key</td>
              <td className="des">唯一标志</td>
              <td className="type">string</td>
              <td>——</td>
            </tr>
            <tr>
              <td>className</td>
              <td className="des">自定义子选项类名</td>
              <td className="type">string</td>
              <td>——</td>
            </tr>
            <tr>
              <td>style</td>
              <td className="des">自定义子选项样式</td>
              <td className="type">React.CSSProperties</td>
              <td>——</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default MenuExample

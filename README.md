# Xue-react

## 一套小巧的 React 组件库

![](https://img.shields.io/badge/license-MIT-000000.svg)

> 本组件库仅供学习交流，请勿在生产环境中使用

## 安装

暂未发布，可克隆仓库后本地引入使用。

## 使用

```javascript
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Button from 'components/Button'

ReactDOM.render(
  <div>
    <Button>Default</Button>
  </div>,
  mountNode
)
```

## 特别提醒

使用 Xue-react 时，您需要使用 border-box 盒模型，否则会影响样式。代码示例：

```css
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

如果您觉得还不错，请 star

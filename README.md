# Xue-re

## 一套小巧的 React 组件库

![](https://img.shields.io/badge/license-MIT-000000.svg)

> 本组件库仅供学习交流，请勿在生产环境中使用

## 安装

```
$ npm install xue-re
$ yarn add xue-re
```

## 使用

```javascript
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Button } from 'xue-re'
import 'xue-re/lib/xue-re.css'

ReactDOM.render(
  <div>
    <Button>Default</Button>
  </div>,
  mountNode
)
```

以上便是 Xue-re 的用法。需要注意的是，样式文件需要在入口文件处单独引入。

## 特别提醒

使用 Xue-re 时，您需要使用 border-box 盒模型，否则会影响样式。代码示例：

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

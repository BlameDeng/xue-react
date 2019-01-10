import * as React from 'react'

// 获取<>内的字符串数组
function getTagStr(code: string): string[] | null {
  const regTagStr = /&lt;((?!&gt;).)+&gt;/g
  const arr = code.match(regTagStr)
  if (!arr) {
    return null
  }
  return arr.map(str => str.replace('&lt;', '').replace('&gt;', ''))
}

// 以空格分割字符串，获取一个字符串数组
function toStringArr(str: string): string[] {
  return str.split(' ').filter(v => v)
}

// <Button onClick={() => this.handleChangeSize('small')} onChange={this.handleChange} type="dashed">
// 这里的正则只匹配<>内的字符串

// <ButtonGroup></ButtonGroup> 匹配组件标签 大写字母或 / 开头  .component
const regComponent = /^(\/)?([A-Z][a-zA-Z]+)$/

// 等号前后  前为属性 后为字符串 属性 箭头函数 方法
// 等号字符串
const eqString = /^([a-zA-Z]+)=(["'].*["'])$/
// 等号 {this.state.属性}
const eqProperty = /^([a-zA-Z]+)=\{(this\.)?(state\.)?([a-zA-z\d]+)\}$/

// 等号 {true}
const eqTrue = /^([a-zA-Z]+)=\{true\}$/

// 等号 {false}
const eqFalse = /^([a-zA-Z]+)=\{false\}$/

// 等号 {num}
const eqNum = /^([a-zA-Z]+)=\{([\d]+)\}$/

// onClick={() => this.handleChangeSize('small')}
// 等号 箭头函数 左边部分 onClick={()
const arrowLeft = /^([a-zA-Z]+)=\{\(([a-zA-Z]*)\)$/
// 箭头函数中间部分 => .htmltag
const arrowMid = /^=\>$/
// 箭头函数右边部分 this.handleChangeSize('small')}
const arrRightWithParams = /this.([a-zA-z]+)\((["'].*["'])?([a-zA-Z]*)?\)/

function transferredToTsx(str: string, index: number): React.ReactNode {
  if (regComponent.test(str)) {
    return (
      <>
        {index !== 0 && <span className="space">&nbsp;&nbsp;</span>}
        {RegExp.$1 && <span className="label">/</span>}
        <span className="component">{RegExp.$2}</span>
      </>
    )
  }
  if (eqString.test(str)) {
    return (
      <>
        {index !== 0 && <span className="space">&nbsp;&nbsp;</span>}
        <span className="property">{RegExp.$1}</span>
        <span className="htmlstr">=</span>
        <span className="string">{RegExp.$2}</span>
      </>
    )
  }
  if (eqTrue.test(str)) {
    return (
      <>
        {index !== 0 && <span className="space">&nbsp;&nbsp;</span>}
        <span className="property">{RegExp.$1}</span>
        <span className="htmlstr">=</span>
        <span className="htmltag">{'{'}</span>
        <span className="htmltag">true</span>
        <span className="htmltag">{'}'}</span>
      </>
    )
  }
  if (eqFalse.test(str)) {
    return (
      <>
        {index !== 0 && <span className="space">&nbsp;&nbsp;</span>}
        <span className="property">{RegExp.$1}</span>
        <span className="htmlstr">=</span>
        <span className="htmltag">{'{'}</span>
        <span className="htmltag">false</span>
        <span className="htmltag">{'}'}</span>
      </>
    )
  }
  if (eqProperty.test(str)) {
    return (
      <>
        {index !== 0 && <span className="space">&nbsp;&nbsp;</span>}
        <span className="property">{RegExp.$1}</span>
        <span className="htmlstr">=</span>
        <span className="htmltag">{'{'}</span>
        {RegExp.$2 && (
          <>
            <span className="htmltag">{'this'}</span>
            <span className="htmlstr">.</span>
          </>
        )}

        {RegExp.$3 && (
          <>
            <span className="property">state</span>
            <span className="htmlstr">.</span>
          </>
        )}
        <span className="property">{RegExp.$4}</span>
        <span className="htmltag">{'}'}</span>
      </>
    )
  }
  if (eqNum.test(str)) {
    return (
      <>
        {index !== 0 && <span className="space">&nbsp;&nbsp;</span>}
        <span className="property">{RegExp.$1}</span>
        <span className="htmlstr">=</span>
        <span className="htmltag">{'{'}</span>
        <span className="num">{RegExp.$2}</span>
        <span className="htmltag">{'}'}</span>
      </>
    )
  }
  if (arrowLeft.test(str)) {
    return (
      <>
        {index !== 0 && <span className="space">&nbsp;&nbsp;</span>}
        <span className="property">{RegExp.$1}</span>
        <span className="htmlstr">=</span>
        <span className="htmltag">{'{'}</span>
        <span className="htmlstr">(</span>
        {RegExp.$2 && <span className="property">{RegExp.$2}</span>}
        <span className="htmlstr">)</span>
      </>
    )
  }
  if (arrowMid.test(str)) {
    return (
      <>
        {index !== 0 && <span className="space">&nbsp;&nbsp;</span>}
        <span className="htmltag">{str}</span>
      </>
    )
  }
  if (arrRightWithParams.test(str)) {
    return (
      <>
        {index !== 0 && <span className="space">&nbsp;&nbsp;</span>}
        <span className="htmltag">this</span>
        <span className="htmlstr">.</span>
        <span className="method">{RegExp.$1}</span>
        <span className="htmlstr">(</span>
        {RegExp.$2 && <span className="string">{RegExp.$2}</span>}
        {RegExp.$3 && <span className="property">{RegExp.$3}</span>}
        <span className="htmlstr">)</span>
        <span className="htmltag">{'}'}</span>
      </>
    )
  }
  if (str === '/') {
    return (
      <>
        {index !== 0 && <span className="space">&nbsp;&nbsp;</span>}
        <span className="label">{str}</span>
      </>
    )
  }
  return (
    <>
      {index !== 0 && <span className="space">&nbsp;&nbsp;</span>}
      <span className="htmlstr">{str}</span>
    </>
  )
}

function renderCode(code: string) {
  const tagStr = getTagStr(code)
  if (!tagStr) {
    return null
  }
  const text = /&gt;(.+)&lt;/.test(code) ? RegExp.$1 : ''

  const results: React.ReactNode[] = []

  tagStr.forEach((item, n: number) => {
    const strArr = toStringArr(item)

    const eleArr: React.ReactNode[] = strArr.map((str, index: number) => {
      return (
        <React.Fragment key={`${str}-${index}`}>
          {transferredToTsx(str, index)}
        </React.Fragment>
      )
    })

    results.push(
      <React.Fragment key={`${item}-${n}`}>
        <span className="label">{'<'}</span>
        {...eleArr}
        <span className="label">{'>'}</span>
      </React.Fragment>
    )
  })
  if (text) {
    results.splice(
      1,
      0,
      <React.Fragment key={text + 'html'}>
        <span className="text">{text}</span>
      </React.Fragment>
    )
  }
  return <>{...results}</>
}

function renderString(code: string) {
  const eleArr = code
    .split(' ')
    .filter(v => v)
    .map((str, index) => {
      return renderToEle(str, index)
    })
  return [
    ...eleArr,
    <React.Fragment key={eleArr.length}>
      <br />
    </React.Fragment>
  ]
}

function renderToEle(str: string, index: number) {
  if (str === 'import' || str === 'from') {
    return (
      <React.Fragment key={str + index}>
        {index !== 0 && <span className="space">&nbsp;&nbsp;</span>}
        <span className="keyword">{str}</span>
      </React.Fragment>
    )
  }
  if (str === 'const') {
    return (
      <React.Fragment key={str + index}>
        {index !== 0 && <span className="space">&nbsp;&nbsp;</span>}
        <span className="htmltag">const</span>
      </React.Fragment>
    )
  }
  if (str === '=') {
    return (
      <React.Fragment key={str + index}>
        {index !== 0 && <span className="space">&nbsp;&nbsp;</span>}
        <span className="htmlstr">=</span>
      </React.Fragment>
    )
  }
  // 'react-dom'
  if (/^["'].*["']$/.test(str)) {
    return (
      <React.Fragment key={str + index}>
        {index !== 0 && <span className="space">&nbsp;&nbsp;</span>}
        <span className="string">{str}</span>
      </React.Fragment>
    )
  }
  if (/([a-zA-Z]+)\.([a-zA-Z]+)/.test(str)) {
    return (
      <React.Fragment key={str + index}>
        {index !== 0 && <span className="space">&nbsp;&nbsp;</span>}
        <span className="property">{RegExp.$1}</span>
        <span className="htmlstr">.</span>
        <span className="property">{RegExp.$2}</span>
      </React.Fragment>
    )
  }
  return (
    <React.Fragment key={str + index}>
      {index !== 0 && <span className="space">&nbsp;&nbsp;</span>}
      <span className="property">{str}</span>
    </React.Fragment>
  )
}

export { renderCode, renderString }

import * as React from 'react'
import * as PropTypes from 'prop-types'
import Collapse from 'src/packages/collapse/Collapse'

class CollapseExample extends React.Component {
  public static displayName = 'CollapseExample'

  public render() {
    return (
      <div className="collapse-example">
        <Collapse>xxx</Collapse>
      </div>
    )
  }
}

export default CollapseExample

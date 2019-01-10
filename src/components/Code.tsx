import * as React from 'react'
import * as PropTypes from 'prop-types'
import { renderCode } from 'src/utils/renderCode'

interface ICodeProps {
  code: string
}

class Code extends React.Component<ICodeProps> {
  public static displayName = 'Code'

  public static propTypes = {
    code: PropTypes.string.isRequired
  }

  public render() {
    const { code } = this.props
    return (
      <>
        {renderCode(code)}
        <br />
      </>
    )
  }
}

export default Code

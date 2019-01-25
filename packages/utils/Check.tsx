import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'
import { classes, Wave } from '.'
import '../style/check.scss'

interface ICheckProps {
  checked: boolean
}

const componentName = 'Check'

class Check extends React.Component<ICheckProps> {
  public static displayName = componentName

  public static propTypes = {
    checked: PropTypes.bool
  }

  public render() {
    const cn = componentName
    const { checked } = this.props
    return (
      <span className={classes(cn, '', { checked })}>
        <Wave>
          <span className={classes(cn, 'box')} />
        </Wave>
      </span>
    )
  }
}

export default Check

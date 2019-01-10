import * as React from 'react'
import * as PropTypes from 'prop-types'

interface ISpaceProps {
  count?: number
}

class Space extends React.Component<ISpaceProps> {
  public static displayName = 'Space'

  public static propTypes = {
    count: PropTypes.number
  }

  public static defaultProps = {
    count: 2
  }

  public renderSpace = (): React.ReactNode[] => {
    const count = this.props.count!
    const eleArr = []
    for (let i = 0; i < count; i++) {
      eleArr.push(<React.Fragment key={i}>&nbsp;</React.Fragment>)
    }
    return eleArr
  }

  public render() {
    return <>{this.renderSpace()}</>
  }
}

export default Space

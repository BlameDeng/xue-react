import * as React from "react";
import * as ReactDOM from "react-dom";
import * as PropTypes from "prop-types";
import { classes } from ".";
import "../style/wave.scss";

interface IWaveProps {
  closeWave?: boolean;
}

const componentName = "Wave";

class Wave extends React.Component<IWaveProps> {
  public static displayName = componentName;

  public static defaultProps = {
    closeWave: false
  };

  public static propTypes = {
    closeWave: PropTypes.bool
  };

  private node: HTMLElement;
  private animating: boolean = false;
  private originClassName: string;
  private animatingClassName = "xue-react-wave-animation-animating";

  public componentDidMount() {
    this.node = ReactDOM.findDOMNode(this) as HTMLElement;
    this.node.addEventListener("click", this.animationStart);
  }

  public componentWillUnmount() {
    this.node.removeEventListener("click", this.animationStart);
    this.node.removeEventListener("animationend", this.animationEnd);
  }

  public animationStart = () => {
    if (this.animating || this.props.closeWave) {
      return;
    }
    this.animating = true;
    this.originClassName = this.node.className;
    this.node.className = classes("", [
      this.originClassName,
      this.animatingClassName
    ]);
    this.node.addEventListener("animationend", this.animationEnd);
  };

  public animationEnd = () => {
    this.animating = false;
    this.node.className = classes("", [this.originClassName]);
    this.node.removeEventListener("animationend", this.animationEnd);
  };

  public render() {
    const { children } = this.props;
    return typeof children === "string" ? (
      <span className="xue-wave-string-wrapper">{children}</span>
    ) : (
      children
    );
  }
}

export default Wave;

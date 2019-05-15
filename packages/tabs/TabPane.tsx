import * as React from "react";
import * as PropTypes from "prop-types";
import { classes } from "../utils";

export interface TabPaneProps {
  title: string | React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const componentName = "TabPane";

class TabPane extends React.Component<TabPaneProps> {
  public static displayName = componentName;

  public static defaultProps = {
    disabled: false
  };

  public static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
      .isRequired,
    active: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    disabled: PropTypes.bool
  };

  public render() {
    const { active, className, style, children } = this.props;
    return (
      <li
        className={classes(componentName, "", [className], { active })}
        style={style}
      >
        {children}
      </li>
    );
  }
}

export default TabPane;

import * as React from "react";
import * as PropTypes from "prop-types";
import { classes } from "../utils";

import "./style";

export interface CheckBoxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean, e: React.MouseEvent) => any;
}

interface CheckBoxState {
  derivedChecked: boolean;
}

const componentName = "CheckBox";

class CheckBox extends React.Component<CheckBoxProps, CheckBoxState> {
  public static displayName = componentName;

  public static propTypes = {
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    indeterminate: PropTypes.bool,
    onChange: PropTypes.func
  };

  public static getDerivedStateFromProps(
    nextProps: CheckBoxProps,
    prevState: CheckBoxState
  ) {
    if ("checked" in nextProps) {
      return { derivedChecked: nextProps.checked };
    }
    return null;
  }

  constructor(props: CheckBoxProps) {
    super(props);
    this.state = {
      derivedChecked: props.defaultChecked || false
    };
  }

  public handleClick = (e: React.MouseEvent) => {
    const { disabled, onChange } = this.props;
    const { derivedChecked } = this.state;
    if (disabled) {
      return;
    }
    this.setState({ derivedChecked: !derivedChecked });
    if (onChange) {
      onChange(!derivedChecked, e);
    }
  };

  public render() {
    const cn = componentName;
    const { disabled, indeterminate, children } = this.props;
    const { derivedChecked } = this.state;
    return (
      <div className={classes(cn, "")} onClick={this.handleClick}>
        <div
          className={classes(cn, "selection", {
            disabled,
            indeterminate,
            checked: derivedChecked
          })}
        />
        {children}
      </div>
    );
  }
}

export default CheckBox;

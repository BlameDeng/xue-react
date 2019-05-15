import * as React from "react";
import * as PropTypes from "prop-types";
import { classes } from "../utils";
import CheckBox from "./CheckBox";

interface Option {
  value: string;
  label: string | React.ReactNode;
  disabled?: boolean;
}

export interface CheckBoxGroupProps {
  options: Option[];
  defaultValue?: string[];
  title?: string | React.ReactNode;
  value?: string[];
  onChange?: (value: string[]) => any;
  className?: string;
  style?: React.CSSProperties;
}

interface CheckBoxGroupState {
  derivedValue: string[];
}

const componentName = "CheckBoxGroup";

class CheckBoxGroup extends React.Component<
  CheckBoxGroupProps,
  CheckBoxGroupState
> {
  public static displayName = componentName;

  public static defaultProps = {
    title: "All"
  };

  public static propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    defaultValue: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    value: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object
  };

  public static getDerivedStateFromProps(
    nextProps: CheckBoxGroupProps,
    prevState: CheckBoxGroupState
  ) {
    if ("value" in nextProps) {
      return { derivedValue: nextProps.value };
    }

    return null;
  }

  constructor(props: CheckBoxGroupProps) {
    super(props);
    this.state = {
      derivedValue: props.defaultValue || []
    };
  }

  public handleChange = (key: string) => {
    const { onChange } = this.props;
    const { derivedValue } = this.state;
    const newValue =
      derivedValue.indexOf(key) > -1
        ? derivedValue.filter(item => item !== key)
        : [key, ...derivedValue];
    this.setState({
      derivedValue: newValue
    });
    if (onChange) {
      onChange(newValue);
    }
  };

  public selectAll = (isAll: boolean) => {
    const { options, onChange } = this.props;
    const newValue = isAll
      ? options.reduce((prev, current) => [current.value, ...prev], [])
      : [];
    this.setState({
      derivedValue: newValue
    });
    if (onChange) {
      onChange(newValue);
    }
  };

  public getStatus = () => {
    const { options } = this.props;
    const { derivedValue } = this.state;
    if (derivedValue.length > 0 && derivedValue.length < options.length) {
      return "indeterminate";
    } else if (derivedValue.length === options.length) {
      return "all";
    } else {
      return "none";
    }
  };

  public handleAll = () => {
    if (this.getStatus() === "all") {
      this.selectAll(false);
    } else {
      this.selectAll(true);
    }
  };

  public render() {
    const cn = componentName;
    const { options, title, className, style } = this.props;
    const { derivedValue } = this.state;
    return (
      <div className={classes(cn, "", [className])} style={style}>
        <CheckBox
          indeterminate={this.getStatus() === "indeterminate"}
          checked={this.getStatus() === "all"}
          onChange={this.handleAll}
        >
          {title}
        </CheckBox>
        {options.map(option => (
          <CheckBox
            key={option.value}
            checked={derivedValue.indexOf(option.value) > -1}
            disabled={option.disabled === true}
            onChange={() => this.handleChange(option.value)}
          >
            {option.label}
          </CheckBox>
        ))}
      </div>
    );
  }
}

export default CheckBoxGroup;

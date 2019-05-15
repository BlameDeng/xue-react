import * as React from "react";
import * as PropTypes from "prop-types";
import { classes } from "../utils";
import "./style";

export interface TabsProps {
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (key: string) => any;
  vertical?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface TabsState {
  derivedActiveKey: string;
}

export interface TabPane {
  title: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const componentName = "Tabs";

class Tabs extends React.Component<TabsProps, TabsState> {
  public static displayName = componentName;

  public static propTypes = {
    activeKey: PropTypes.string,
    defaultActiveKey: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    vertical: PropTypes.bool
  };

  public static getDerivedStateFromProps(
    nextProps: TabsProps,
    prevState: TabsState
  ) {
    const { activeKey } = nextProps;
    if ("activeKey" in nextProps && activeKey !== prevState.derivedActiveKey) {
      return { derivedActiveKey: activeKey };
    }
    return null;
  }

  private headRef: HTMLUListElement;
  private roleRef: HTMLLIElement;
  private bodyRef: HTMLUListElement;
  private keys: string[] = [];

  constructor(props: TabsProps) {
    super(props);
    this.state = {
      derivedActiveKey: props.defaultActiveKey || ""
    };
  }

  public componentDidMount() {
    // set the first key as default
    if (!("defaultActiveKey" in this.props) && !("activeKey" in this.props)) {
      this.setState({
        derivedActiveKey: this.keys[0]
      });
    } else {
      const { derivedActiveKey } = this.state;
      this.locateUnderline(derivedActiveKey, this[derivedActiveKey]);
    }
  }

  public componentDidUpdate(prevProps: TabsProps, prevState: TabsState) {
    const { derivedActiveKey } = this.state;
    if (derivedActiveKey !== prevState.derivedActiveKey) {
      this.locateUnderline(derivedActiveKey, this[derivedActiveKey]);
    }
  }

  public getTitles = (): React.ReactNode[] => {
    const { children } = this.props;
    const { derivedActiveKey } = this.state;
    return React.Children.map(
      children,
      (child: React.ReactElement<TabPane>) => {
        if (!child) {
          return null;
        }
        const key = child.key as string;
        this.keys.push(key);
        return (
          <li
            key={key}
            ref={node => (this[key] = node)}
            onClick={(e: React.MouseEvent) =>
              this.handleClickTitle(key, child.props.disabled as boolean, e)
            }
            className={classes(componentName, "title", {
              active: key === derivedActiveKey,
              disabled: child.props.disabled
            })}
          >
            {child.props.title}
          </li>
        );
      }
    );
  };

  public getPanes = (): React.ReactNode[] => {
    const { vertical, children } = this.props;
    const { derivedActiveKey } = this.state;
    return React.Children.map(
      children,
      (child: React.ReactElement<TabPane>) => {
        if (!child) {
          return null;
        }
        this.keys.push(child.key as string);
        const active = child.key === derivedActiveKey;
        if (vertical && !active) {
          return null;
        }
        return React.cloneElement(child, { active });
      }
    );
  };

  public handleClickTitle = (
    key: string,
    disabled: boolean,
    e: React.MouseEvent
  ) => {
    if (disabled) {
      return;
    }
    if (key !== this.state.derivedActiveKey) {
      this.setState({
        derivedActiveKey: key
      });
      if (this.props.onChange) {
        this.props.onChange(key);
      }
    }
  };

  public locateUnderline = (key: string, node: HTMLLIElement) => {
    const { headRef: head, bodyRef: body, roleRef: role, keys } = this;
    const { vertical } = this.props;
    const { left: headLeft, top: headTop } = head.getBoundingClientRect();
    const { left, right, top, bottom } = node.getBoundingClientRect();
    if (vertical) {
      role.style.height = bottom - top + "px";
      role.style.transform = `translateY(${top - headTop}px)`;
    } else {
      // locate the underline
      role.style.width = right - left + "px";
      role.style.transform = `translateX(${left - headLeft}px)`;
      // switch the pane
      const index: number = keys.indexOf(key);
      body.style.transform = `translateX(${-100 * index}%)`;
    }
  };

  public saveHeadRef = (node: HTMLUListElement) => {
    this.headRef = node;
  };

  public saveRoleRef = (node: HTMLLIElement) => {
    this.roleRef = node;
  };

  public saveBodyRef = (node: HTMLUListElement) => {
    this.bodyRef = node;
  };

  public render() {
    const cn = componentName;
    const { vertical, className, style } = this.props;
    return (
      <div className={classes(cn, "", [className], { vertical })} style={style}>
        <ul
          className={classes(cn, "head", { vertical })}
          ref={this.saveHeadRef}
        >
          {this.getTitles()}
          <li
            className={classes(cn, "role", {
              vertical,
              horizontal: !vertical
            })}
            ref={this.saveRoleRef}
          />
        </ul>
        <ul
          className={classes(cn, "body", { vertical })}
          ref={this.saveBodyRef}
        >
          {this.getPanes()}
        </ul>
      </div>
    );
  }
}

export default Tabs;

/*
 * Derived from https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ListItem/ListItem.js
 */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";

export const styles = theme => ({
  /* Styles applied to the (normally root) `component` element. May be wrapped by a `container`. */
  root: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
    textDecoration: "none",
    width: "100%",
    boxSizing: "border-box",
    textAlign: "left",
    paddingTop: 12,
    paddingBottom: 12,
    "&$selected": {
      backgroundColor: theme.palette.action.selected
    }
  },
  // TODO: Sanity check this - why is focusVisibleClassName prop apparently applied to a div?
  /* Styles applied to the `component`'s `focusVisibleClassName` property if `button={true}`. */
  focusVisible: {
    backgroundColor: theme.palette.action.hover
  },
  /* Legacy styles applied to the root element. Use `root` instead. */
  default: {},
  /* Styles applied to the `component` element if `dense={true}` or `children` includes `Avatar`. */
  dense: {
    paddingTop: 8,
    paddingBottom: 8
  },
  /* Styles applied to the inner `component` element if `disabled={true}`. */
  disabled: {
    opacity: 0.5
  },
  /* Styles applied to the inner `component` element if `divider={true}`. */
  divider: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundClip: "padding-box"
  },
  /* Styles applied to the inner `component` element if `disableGutters={false}`. */
  gutters: theme.mixins.gutters(),
  /* Styles applied to the inner `component` element if `button={true}`. */
  button: {
    transition: theme.transitions.create("background-color", {
      duration: theme.transitions.duration.shortest
    }),
    "&:hover": {
      textDecoration: "none",
      backgroundColor: theme.palette.action.hover,
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    }
  },
  /* Styles applied to the `component` element if `children` includes `ListItemSecondaryAction`. */
  secondaryAction: {
    // Add some space to avoid collision as `ListItemSecondaryAction`
    // is absolutely positionned.
    paddingRight: 32
  },
  /* Styles applied to the root element if `selected={true}`. */
  selected: {}
});

class ListItem extends React.Component {
  getChildContext() {
    return {
      dense: this.props.dense || this.context.dense || false
    };
  }

  render() {
    const {
      button,
      children: childrenProp,
      classes,
      className: classNameProp,
      component: componentProp,
      dense,
      disabled,
      disableGutters,
      divider,
      focusVisibleClassName,
      selected,
      selectedBackgroundColor, // custom
      backgroundColor, // custom
      textColor, // custom
      selectedTextColor, // custom
      ...other
    } = this.props;

    const isDense = dense || this.context.dense || false;
    const children = React.Children.toArray(childrenProp);

    const className = classNames(
      classes.root,
      classes.default,
      {
        [classes.dense]: isDense,
        [classes.gutters]: !disableGutters,
        [classes.divider]: divider,
        [classes.disabled]: disabled,
        [classes.button]: button,
        [classes.selected]: selected
      },
      classNameProp
    );

    const neccessaryBackgroundColorProp = selected
      ? selectedBackgroundColor
      : backgroundColor;
    const backgroundStyle = neccessaryBackgroundColorProp
      ? { backgroundColor: neccessaryBackgroundColorProp }
      : null;

    const neccessaryTextColorProp = selected ? selectedTextColor : textColor;
    const textStyle = neccessaryTextColorProp
      ? { color: neccessaryTextColorProp }
      : null;

    const style = { ...textStyle, ...backgroundStyle };

    const componentProps = { className, disabled, ...other };
    let Component = componentProp || "li";

    if (button) {
      componentProps.component = componentProp || "div";
      componentProps.focusVisibleClassName = classNames(
        classes.focusVisible,
        focusVisibleClassName
      );
      Component = ButtonBase;
    }

    return (
      <Component style={style} {...componentProps}>
        {children}
      </Component>
    );
  }
}

ListItem.propTypes = {
  button: PropTypes.bool,
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object
  ]),
  dense: PropTypes.bool,
  disabled: PropTypes.bool,
  disableGutters: PropTypes.bool,
  divider: PropTypes.bool,
  focusVisibleClassName: PropTypes.string,
  selected: PropTypes.bool,
  backgroundColor: PropTypes.string,
  selectedBackgroundColor: PropTypes.string
};

ListItem.defaultProps = {
  button: false,
  dense: false,
  disabled: false,
  disableGutters: false,
  divider: false,
  selected: false
};

ListItem.contextTypes = {
  dense: PropTypes.bool
};

ListItem.childContextTypes = {
  dense: PropTypes.bool
};

export default withStyles(styles)(ListItem);

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import NavCol from "./NavCol";

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100%",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  nav: {
    zIndex: 2,
    height: "100%"
  },
  content: {
    zIndex: 1,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default
  },
  mainPadding: {
    padding: theme.spacing.unit * 3
  }
});

class AppNavigation extends React.Component {
  state = {
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, options: { withContentPadding = true } } = this.props;

    return (
      <div className={classes.root}>
        <nav className={classes.nav}>
          <NavCol />
        </nav>
        <div className={classes.content}>
          <main className={withContentPadding ? classes.mainPadding : ""}>
            {this.props.children}
          </main>
        </div>
      </div>
    );
  }
}

AppNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
  options: PropTypes.object,
  children: PropTypes.any
};

AppNavigation.defaultProps = {
  options: {}
};

const CAppNavigation = withStyles(styles)(AppNavigation);

export default CAppNavigation;

export function withAppNavigation(Component, options) {
  return () => (
    <CAppNavigation options={options}>
      <Component />
    </CAppNavigation>
  );
}

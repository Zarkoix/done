import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LoggedOutElements from "./LoggedOutElements.js";
import { isLoggedIn } from "../../auth.js";

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100%",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  title: {
    flexGrow: 1
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
});

const StaticNavigation = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography
            variant="title"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Done
          </Typography>
          {isLoggedIn() && <LoggedOutElements />}
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
};

StaticNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  children: PropTypes.any
};

const CStaticNavigation = withStyles(styles, { withTheme: true })(
  StaticNavigation
);

export default CStaticNavigation;

export function withStaticNavigation(Component) {
  return () => (
    <CStaticNavigation>
      <Component />
    </CStaticNavigation>
  );
}

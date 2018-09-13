import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MuiAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { Query } from "react-apollo";

import { jwtFromCache } from "../../auth.js";

import LoggedInElements from "./LoggedInElements.js";
import LoggedOutElements from "./LoggedOutElements.js";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing.unit
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

class AppBar extends Component {
  render() {
    const { classes } = this.props;

    const loggedIn = !!jwtFromCache();

    return (
      <div className={classes.root}>
        <MuiAppBar position="static">
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={classes.grow}
            >
              Done
            </Typography>
            {loggedIn ? <LoggedInElements /> : <LoggedOutElements />}
          </Toolbar>
        </MuiAppBar>
        {this.props.children}
      </div>
    );
  }
}

AppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppBar);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MuiAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { Query } from "react-apollo";

import { GET_JWT } from "../../auth.js";

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

            <Query query={GET_JWT}>
              {({ loading, error, data, startPolling, stopPolling }) => {
                if (loading) return null;
                if (error) return `Error!: ${error}`;

                if (data.JWT === null) {
                  // not logged in
                  return <LoggedOutElements />;
                } else {
                  return <LoggedInElements />;
                }
              }}
            </Query>
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

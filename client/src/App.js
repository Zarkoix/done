import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { Link } from 'react-router-dom'

import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_JWT = gql`
  {
    JWT @client
  }
`;

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

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={classes.grow}
            >
              Done
            </Typography>
            <Button
              variant="outlined"
              color="inherit"
              className={classes.button}
              component={Link}
              to={'Signup'}
            >
              Signup
            </Button>
            <Button
              color="inherit"
              className={classes.button}
              component={Link}
              to={'Login'}
            >
              Login
            </Button>
          </Toolbar>
        </AppBar>
        <Query query={GET_JWT}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;

            return (
              <h1>{JSON.stringify(data)}</h1>
            );
          }}
        </Query>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);

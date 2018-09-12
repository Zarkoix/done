import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { Link } from "react-router-dom";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

class LoggedOutElements extends Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Button
          variant="outlined"
          color="inherit"
          className={classes.button}
          component={Link}
          to={"Signup"}
        >
          Signup
        </Button>
        <Button
          color="inherit"
          className={classes.button}
          component={Link}
          to={"Log In"}
        >
          Login
        </Button>
      </React.Fragment>
    );
  }
}

LoggedOutElements.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoggedOutElements)

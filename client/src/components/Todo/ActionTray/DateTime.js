import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

const styles = theme => ({
  buttonOutline: {
    alignSelf: "center",
    padding: theme.spacing.unit + "px",
    margin: theme.spacing.unit + "px",
    borderRadius: "5px",
    background: theme.palette.divider,
    color: theme.palette.background.paper,
    transition: "color 0.1s ease-in",
    "&:hover": {
      color: theme.palette.text.primary
    }
  }
});

class DateTime extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Button size="small" className={classes.buttonOutline}>
          Sep. 24
        </Button>
        <Button size="small" className={classes.buttonOutline}>
          7:00
        </Button>
      </React.Fragment>
    );
  }
}

DateTime.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DateTime);

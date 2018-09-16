import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  buttonOutline: {
    alignSelf: "center",
    padding: theme.spacing.unit + "px",
    margin: theme.spacing.unit + "px",
    borderRadius: "5px",
    background: theme.palette.divider,
    color: theme.palette.background.paper
  }
});

class DateTime extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Typography className={classes.buttonOutline} variant="button">
          Sep. 24
        </Typography>
        <Typography className={classes.buttonOutline} variant="button">
          7:00
        </Typography>
      </React.Fragment>
    );
  }
}

DateTime.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DateTime);

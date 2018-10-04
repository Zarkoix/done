import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = theme => ({
  container: {
    height: theme.spacing.unit * 6 + "px",
    width: theme.spacing.unit * 6 + "px",
    lineHeight: theme.spacing.unit * 6 + "px",
    fontSize: theme.spacing.unit * 1.5,
    padding: "0 0 0 " + theme.spacing.unit + "px"
  }
});

class LeftGutterDate extends PureComponent {
  render() {
    let { classes, doWhenDate } = this.props;
    if (doWhenDate) {
      let date = doWhenDate.substring(5).replace("-", "/");
      return <div className={classes.container}>{date}</div>;
    } else {
      return <div className={classes.container} />;
    }
  }
}

LeftGutterDate.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  doWhenDate: PropTypes.string
};

export default withStyles(styles)(LeftGutterDate);

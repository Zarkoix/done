import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import DateTime from "../DateTime";
import classNames from "classnames";

const styles = theme => ({
  container: {
    height: theme.spacing.unit * 6 + "px",
    width: theme.spacing.unit * 6 + "px",
    minWidth: theme.spacing.unit * 6 + "px",
    lineHeight: theme.spacing.unit * 6 + "px",
    fontSize: theme.spacing.unit * 1.5,
    padding: "0 0 0 " + theme.spacing.unit + "px",
    textAlign: "center"
  },
  noDate: {
    opacity: 0,
    transition: "opacity " + theme.transitions.duration.enteringScreen + "ms"
  },
  showDateBtn: {
    opacity: 1
  }
});

class LeftGutterDate extends PureComponent {
  render() {
    let { classes, id, doWhenDate, showDate } = this.props;
    console.log("showDate", showDate)
    if (doWhenDate) {
      let date = doWhenDate.substring(5).replace("-", "/");
      return <div className={classes.container}>{date}</div>;
    } else {
      return (
        <div
          className={classNames(classes.container, classes.noDate, {
            [`${classes.showDateBtn}`]: showDate
          })}
        >
          <DateTime id={id} />
        </div>
      );
    }
  }
}

LeftGutterDate.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  showDate: PropTypes.bool.isRequired,
  doWhenDate: PropTypes.string,
  doWhenTime: PropTypes.string
};

export default withStyles(styles)(LeftGutterDate);

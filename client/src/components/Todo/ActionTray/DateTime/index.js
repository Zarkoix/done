import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

import CalendarIcon from "@material-ui/icons/CalendarToday";
import DateButton from "./DateButton.js";
import TimeButton from "./TimeButton.js";

class DateTime extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <IconButton className={classes.button} aria-label="Change planned time">
          <CalendarIcon />
        </IconButton>
        <DateButton />
        <TimeButton />
      </React.Fragment>
    );
  }
}

DateTime.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles({})(DateTime);

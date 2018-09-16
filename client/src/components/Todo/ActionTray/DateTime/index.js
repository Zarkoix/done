import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import DateButton from './DateButton.js'
import TimeButton from './TimeButton.js'

class DateTime extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
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

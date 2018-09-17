import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import DateSelect from "../../../Select/DateSelect.js";
import TimeSelect from "../../../Select/TimeSelect.js";

const styles = theme => ({
  ftdialog: {
    width: "336px"
  }
});

class DateTimeDialog extends Component {
  constructor(props) {
    super();
    const { doWhenDate, doWhenTime } = props;
    this.state = {
      value: 0,
      date: doWhenDate ? new Date(doWhenDate) : null,
      time: doWhenTime ? new Date(doWhenTime) : null
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleClose = () => this.props.onClose(this.state.date, this.state.time);

  handleDateUpdate = date =>
    this.setState({
      date: date
    });

  handleTimeUpdate = time =>
    this.setState({
      time: time
    });

  render() {
    const { theme, classes } = this.props;
    const { doWhenDate, doWhenTime } = this.props;
    return (
      <Dialog
        classes={{ paper: classes.ftdialog }}
        onClose={this.handleClose}
        aria-labelledby="date-dialog"
        open={this.props.open}
      >
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          fullWidth
        >
          <Tab label="Date" />
          <Tab label="Time" />
        </Tabs>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <div dir={theme.direction}>
            <DateSelect
              date={doWhenDate}
              onSelect={this.handleDateUpdate}
              onDone={this.handleClose}
            />
          </div>
          <div dir={theme.direction}>
            <TimeSelect
              time={doWhenTime}
              onSelect={this.handleTimeUpdate}
              onDone={this.handleClose}
            />
          </div>
        </SwipeableViews>
      </Dialog>
    );
  }
}

DateTimeDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  doWhenDate: PropTypes.object,
  doWhenTime: PropTypes.object,
  onClose: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(DateTimeDialog);

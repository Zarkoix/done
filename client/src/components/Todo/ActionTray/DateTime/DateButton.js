import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Calendar } from "material-ui-next-pickers";
import Dialog from "@material-ui/core/Dialog";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

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

class DateButton extends Component {
  constructor() {
    super();
    this.state = {
      date: null,
      dialogOpen: false
    };
  }

  onChangeDate = date => {
    console.log("Date: ", date);
    this.setState({ date });
  };

  handleClose = () => {
    this.setState({
      dialogOpen: false
    });
  };

  openDialog = () => {
    this.setState({
      dialogOpen: true
    });
  };

  render() {
    const { classes } = this.props;
    const { date } = this.state;
    return (
      <React.Fragment>
        <Button
          onClick={this.openDialog}
          size="small"
          className={classes.buttonOutline}
        >
          {date
            ? monthNames[date.getMonth()].substring(0, 3) + " " + date.getDate()
            : "Date"}
        </Button>

        <Dialog
          onClose={this.handleClose}
          aria-labelledby="date-dialog"
          open={this.state.dialogOpen}
        >
          <Calendar
            name="date-input"
            value={date}
            onChange={this.onChangeDate}
            closeCalendar={this.handleClose}
          />
          <Button
            onClick={() => {
              this.onChangeDate(null);
              this.handleClose();
            }}
            color="secondary"
            className={classes.button}
          >
            Clear
          </Button>
        </Dialog>
      </React.Fragment>
    );
  }
}

DateButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DateButton);

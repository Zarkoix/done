import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import { Clock } from "material-ui-next-pickers";
import Dialog from "@material-ui/core/Dialog";

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
  },
  dialogActions: {
    display: "flex"
  },
  dialogAction: {
    flexGrow: 1
  }
});

class TimeButton extends Component {
  constructor() {
    super();
    this.state = {
      time: null,
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
    const actionClassName = classNames(classes.button, classes.dialogAction);
    return (
      <React.Fragment>
        <Button
          onClick={this.openDialog}
          size="small"
          className={classes.buttonOutline}
        >
          {date ? date.getHours() + ":" + date.getMinutes() : "Time"}
        </Button>

        <Dialog
          onClose={this.handleClose}
          aria-labelledby="date-dialog"
          open={this.state.dialogOpen}
        >
          <Clock
            name="date-input"
            value={date}
            onChange={this.onChangeDate}
            closeCalendar={this.handleClose}
          />
          <div className={classes.dialogActions}>
            <Button
              onClick={() => {
                this.onChangeDate(null);
                this.handleClose();
              }}
              color="secondary"
              className={actionClassName}
            >
              Clear
            </Button>
            <Button
              onClick={() => {
                this.handleClose();
              }}
              color="primary"
              className={actionClassName}
            >
              Done
            </Button>
          </div>
        </Dialog>
      </React.Fragment>
    );
  }
}

TimeButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TimeButton);

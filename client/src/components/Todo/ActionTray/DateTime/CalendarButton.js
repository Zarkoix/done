import React, { Component } from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import moment from "moment";
import { SET_DO_WHEN } from "./queries.js";

import CalendarIcon from "@material-ui/icons/CalendarToday";
import DateTimeDialog from "./DateTimeDialog.js";

const styles = theme => ({});

class CalendarButton extends Component {
  constructor() {
    super();
    this.state = {
      dialogOpen: false
    };
  }

  handleClose = (date, time, setDoWhen) => {
    const newDate = date ? moment(date).format("YYYY-MM-DD") : null;
    const newTime = time ? moment(time).format("HH:mm") : null;
    setDoWhen({
      variables: {
        id: this.props.id,
        doWhenDate: newDate,
        doWhenTime: newTime
      },
      optimisticResponse: {
        updateTodoById: {
          __typename: "UpdateTodoPayload",
          todo: {
            id: this.props.id,
            __typename: "todo",
            doWhenDate: newDate,
            doWhenTime: newTime
          }
        }
      }
    });
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
    let { doWhenDate, doWhenTime } = this.props;
    return (
      <Mutation mutation={SET_DO_WHEN}>
        {setDoWhen => (
          <React.Fragment>
            <IconButton
              onClick={this.openDialog}
              className={classes.button}
              aria-label="Change planned time"
            >
              <CalendarIcon />
            </IconButton>
            <DateTimeDialog
              open={this.state.dialogOpen}
              doWhenDate={doWhenDate}
              doWhenTime={doWhenTime}
              onClose={(date, time) => this.handleClose(date, time, setDoWhen)}
            />
          </React.Fragment>
        )}
      </Mutation>
    );
  }
}

CalendarButton.propTypes = {
  id: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  doWhenDate: PropTypes.object,
  doWhenTime: PropTypes.object
};

export default withStyles(styles)(CalendarButton);

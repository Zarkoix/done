import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { Mutation } from "react-apollo";
import { SET_DO_WHEN_TIME } from "./queries.js";
import moment from "moment";

import TimeSelect from "../../Select/TimeSelect.js";

const styles = theme => ({
  buttonOutline: {
    alignSelf: "center",
    padding: theme.spacing.unit + "px",
    margin: theme.spacing.unit + "px",
    borderRadius: "5px",
    background: theme.palette.divider,
    color: theme.palette.text.primary,
    transition: "color 0.1s ease-in",
    "&:hover": {
      color: theme.palette.text.primary
    }
  }
});

class TimeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerTime: props.time,
      dialogOpen: false
    };
  }

  onChangeTime = time => {
    this.setState({ pickerTime: time });
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

  handleDone = (time, setDoWhen) => {
    const newTime = time ? moment(time).format("HH:mm") : null;
    setDoWhen({
      variables: {
        id: this.props.id,
        doWhenTime: newTime
      },
      optimisticResponse: {
        updateTodoById: {
          __typename: "UpdateTodoPayload",
          todo: {
            id: this.props.id,
            __typename: "todo",
            doWhenTime: newTime
          }
        }
      }
    });
    this.setState({
      dialogOpen: false
    });
  };

  handleSelect = time => {
    this.setState({
      pickerTime: time
    });
  };

  render() {
    const { classes } = this.props;
    const { pickerTime } = this.state;
    return (
      <Mutation mutation={SET_DO_WHEN_TIME}>
        {setDoWhen => (
          <React.Fragment>
            <Button
              onClick={this.openDialog}
              size="small"
              className={classes.buttonOutline}
            >
              {this.props.time.format("hh:mm A")}
            </Button>

            <Dialog
              onClose={this.handleClose}
              aria-labelledby="time-dialog"
              open={this.state.dialogOpen}
            >
              <TimeSelect
                time={pickerTime}
                onSelect={this.handleSelect}
                onDone={time => this.handleDone(time, setDoWhen)}
              />
            </Dialog>
          </React.Fragment>
        )}
      </Mutation>
    );
  }
}

TimeButton.propTypes = {
  id: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  time: PropTypes.object
};

export default withStyles(styles)(TimeButton);

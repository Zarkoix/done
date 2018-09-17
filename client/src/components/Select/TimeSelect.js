import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import { Clock } from "material-ui-next-pickers";

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

class TimeSelect extends Component {
  constructor(props) {
    super();
    this.state = {
      // TODO: this line may be useless
      time: props.time ? props.time.toDate() : null
    };
  }

  onChangeTime = time => {
    this.setState({ time });
    this.props.onSelect(time);
  };

  handleDone = () => this.props.onDone(this.state.time);

  handleClear = () => {
    this.onChangeTime(null);
    this.props.onDone(null);
  };

  render() {
    const { classes } = this.props;
    const { time } = this.state;
    const actionClassName = classNames(classes.button, classes.dialogAction);
    return (
      <React.Fragment>
        <Clock
          name="time-input"
          value={time}
          onChange={this.onChangeTime}
          closeCalendar={() => {}}
        />
        <div className={classes.dialogActions}>
          <Button
            onClick={this.handleClear}
            color="secondary"
            className={actionClassName}
          >
            Clear Time
          </Button>
          <Button
            onClick={this.handleDone}
            color="primary"
            className={actionClassName}
          >
            Done
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

TimeSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  time: PropTypes.any,
  onSelect: PropTypes.func,
  onDone: PropTypes.func
};

export default withStyles(styles)(TimeSelect);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import { Calendar } from "material-ui-next-pickers";

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

class DateSelect extends Component {
  constructor(props) {
    super();
    this.state = {
      // TODO: this line may be useless
      date: props.date ? props.date.toDate() : null
    };
  }

  onChangeDate = date => {
    this.setState({ date });
    this.props.onSelect(date);
  };

  handleDone = () => this.props.onDone(this.state.date);

  handleClear = () => {
    this.onChangeDate(null)
    this.props.onDone(null);
  }

  render() {
    const { classes } = this.props;
    const { date } = this.state;
    const actionClassName = classNames(classes.button, classes.dialogAction);
    return (
      <React.Fragment>
        <Calendar
          name="date-input"
          value={date}
          onChange={this.onChangeDate}
          closeCalendar={() => {}}
        />
        <div className={classes.dialogActions}>
          <Button
            onClick={this.handleClear}
            color="secondary"
            className={actionClassName}
          >
            Clear Date
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

DateSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  date: PropTypes.any,
  onSelect: PropTypes.func,
  onDone: PropTypes.func
};

export default withStyles(styles)(DateSelect);

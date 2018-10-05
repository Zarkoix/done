import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import classNames from "classnames";
import moment from "moment";
import ButtonBase from "@material-ui/core/ButtonBase";
import IconButton from "@material-ui/core/IconButton";
import CalendarIcon from "@material-ui/icons/CalendarToday";
import Dialog from "@material-ui/core/Dialog";
import DateSelect from "../../Select/DateSelect.js";

const styles = theme => ({
  container: {
    height: theme.spacing.unit * 6 + "px",
    width: theme.spacing.unit * 6 + "px",
    minWidth: theme.spacing.unit * 6 + "px",
    lineHeight: "44px", // TODO: fix why this isn't 48px
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
  },
  dateText: {
    color: theme.palette.text.primary,
    fontWeight: "bold",
    display: "inline",
    backgroundColor: "transparent",
    transition: "background-color 0.1s ease-in-out, opacity " + theme.transitions.duration.enteringScreen + "ms",
    borderRadius: "6px",
    opacity: 0,
    padding: "8px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main
    }
  },
  showDateText: {
    opacity: 1
  }
});

class LeftGutterDate extends PureComponent {
  constructor(props) {
    super(props);
    const { doWhenDate } = props;
    const momentDate = doWhenDate ? moment(doWhenDate, "YYYY-MM-DD") : null;
    this.state = {
      pickerDate: momentDate,
      dialogOpen: false
    };
  }

  onChangeDate = date => {
    this.setState({ pickerDate: date });
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

  handleDone = date => {
    const newDate = date ? moment(date).format("YYYY-MM-DD") : null;
    this.props.setDoWhen({
      variables: {
        id: this.props.id,
        doWhenDate: newDate
      },
      optimisticResponse: {
        updateTodoById: {
          __typename: "UpdateTodoPayload",
          todo: {
            id: this.props.id,
            __typename: "todo",
            doWhenDate: newDate
          }
        }
      }
    });
    this.handleClose();
  };

  handleSelect = date => {
    this.setState({
      pickerDate: date
    });
  };

  calculateClasses(doWhenDate, showDate) {
    const { classes } = this.props;
    return classNames(
      classes.container,
      {
        [`${classes.noDate}`]: !Boolean(doWhenDate)
      },
      {
        [`${classes.showDateBtn}`]: showDate
      }
    );
  }

  renderContents(doWhenDate) {
    if (doWhenDate) {
      const date = doWhenDate.substring(5).replace("-", "/");
      const {classes, showDoWhenDateByDefault=true, showDate } = this.props;
      return (
        <ButtonBase component={"span"} className={classNames(classes.dateText,       {
          [`${classes.showDateText}`]: showDoWhenDateByDefault || showDate 
        })}>
          {date}
        </ButtonBase>
      );
    } else {
      return (
        <IconButton>
          <CalendarIcon />
        </IconButton>
      );
    }
  }

  render() {
    let { doWhenDate, showDate } = this.props;
    return (
      <React.Fragment>
        <div
          onClick={this.openDialog}
          className={this.calculateClasses(doWhenDate, showDate)}
        >
          {this.renderContents(doWhenDate)}
        </div>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="date-dialog"
          open={this.state.dialogOpen}
        >
          <DateSelect
            date={this.state.pickerDate}
            onSelect={this.handleSelect}
            onDone={date => this.handleDone(date)}
          />
        </Dialog>
      </React.Fragment>
    );
  }
}

LeftGutterDate.propTypes = {
  classes: PropTypes.object.isRequired,
  showDate: PropTypes.bool.isRequired,
  setDoWhen: PropTypes.func.isRequired,
  doWhenDate: PropTypes.string,
  showDoWhenDateByDefault: PropTypes.bool
};

export default withStyles(styles)(LeftGutterDate);

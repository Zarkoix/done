import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { Mutation } from "react-apollo";
import { SET_DO_WHEN } from "./queries.js";
import moment from "moment";

import DateSelect from "../../../Select/DateSelect.js";

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

class DateButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerDate: props.date,
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

  handleDone = (date, setDoWhen) => {
    setDoWhen({
      variables: {
        id: this.props.id,
        doWhenDate: date ? moment(date).format("YYYY-MM-DD") : null
      }
    });
    this.setState({
      dialogOpen: false
    });
  };

  handleSelect = (date) => {
    this.setState({
      pickerDate: date
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <Mutation mutation={SET_DO_WHEN}>
        {setDoWhen => (
          <React.Fragment>
            <Button
              onClick={this.openDialog}
              size="small"
              className={classes.buttonOutline}
            >
              {this.props.date.format("MMM DD")}
            </Button>
            <Dialog
              onClose={this.handleClose}
              aria-labelledby="date-dialog"
              open={this.state.dialogOpen}
            >
              <DateSelect
                date={this.state.pickerDate}
                onSelect={this.handleSelect}
                onDone={date => this.handleDone(date, setDoWhen)}
              />
            </Dialog>
          </React.Fragment>
        )}
      </Mutation>
    );
  }
}

DateButton.propTypes = {
  id: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  date: PropTypes.object
};

export default withStyles(styles)(DateButton);

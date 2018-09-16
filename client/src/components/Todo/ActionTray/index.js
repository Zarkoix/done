import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DeleteButton from "./DeleteButton.js";
import DateTime from "./DateTime.js";

const styles = theme => ({
  tray: {
    display: "flex",
    flexDirection: "row"
  },
  spacer: {
    flexGrow: 1
  }
});

class ActionTray extends Component {
  constructor(props) {
    super();
    this.state = {
      text: props.text ? props.text : ""
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.tray}>
        <DateTime id={this.props.id} />
        <div className={classes.spacer} />
        <DeleteButton id={this.props.id} />
      </div>
    );
  }
}

ActionTray.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired
};

export default withStyles(styles)(ActionTray);

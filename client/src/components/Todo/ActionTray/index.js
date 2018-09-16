import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DeleteButton from "./DeleteButton.js";

const styles = theme => ({
  tray: {
    display: "flex",
    flexDirection: "row-reverse"
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
        <DeleteButton />
      </div>
    );
  }
}

ActionTray.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired
};

export default withStyles(styles)(ActionTray);

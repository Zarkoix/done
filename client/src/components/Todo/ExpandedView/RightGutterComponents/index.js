import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DeleteButton from "./DeleteButton.js";
import NewTagButton from "./NewTagButton.js";

const styles = theme => ({
  tray: {
    display: "flex",
    flexDirection: "column"
  },
  spacer: {
    flexGrow: 1
  }
});

class RightGutter extends Component {
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
        <NewTagButton id={this.props.id} />
        <div className={classes.spacer} />
        <DeleteButton id={this.props.id} />
      </div>
    );
  }
}

RightGutter.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired
};

export default withStyles(styles)(RightGutter);

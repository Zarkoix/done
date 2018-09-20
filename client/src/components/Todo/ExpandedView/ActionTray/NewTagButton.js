import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import TagIcon from "@material-ui/icons/Label";
import AddTagMenu from "../../../Tag/AddTagMenu";

class NewTagButton extends Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null
    }
  }
  handleClick = event => this.setState({ anchorEl: event.currentTarget });

  handleClose = () => this.setState({ anchorEl: null });

  render() {
    const { classes, id } = this.props;
    return (
      <React.Fragment>
        <IconButton
          className={classes.button}
          aria-label="New Tag"
          onClick={this.handleClick}
        >
          <TagIcon />
        </IconButton>
        <AddTagMenu
          id={id}
          handleClose={this.handleClose}
          anchorEl={this.state.anchorEl}
        />
      </React.Fragment>
    );
  }
}

export default withStyles({})(NewTagButton);

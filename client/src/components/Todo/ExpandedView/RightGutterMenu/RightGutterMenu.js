import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import AddTagMenu from "../../../Tag/AddTagMenu";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

class RightGutterMenu extends Component {
  state = {
    anchorEl: null,
    addTagAnchorEl: null
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = event => {
    this.setState({ anchorEl: null, addTagAnchorEl: null });
  };

  handleDelete = () => {
    this.handleClose();
    this.props.deleteTodo({
      variables: {
        id: this.props.id
      }
    });
  };

  handleOpenAddTagMenu = event => {
    this.setState({ addTagAnchorEl: event.currentTarget });
  }

  render() {
    const { classes, id } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <React.Fragment>
        <IconButton
          className={classes.button}
          aria-label="Open more options"
          onClick={this.handleMenu}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="menu-todo-more-options"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleOpenAddTagMenu}>Add Tag</MenuItem>
          <MenuItem onClick={this.handleDelete}>Delete Todo</MenuItem>
        </Menu>
        <AddTagMenu
            id={id}
            handleClose={this.handleClose}
            anchorEl={this.state.addTagAnchorEl}
        />
      </React.Fragment>
    );
  }
}

RightGutterMenu.propTypes = {
  id: PropTypes.number.isRequired,
  deleteTodo: PropTypes.func.isRequired
};

export default withStyles({})(RightGutterMenu);

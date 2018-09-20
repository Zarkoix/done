import React, { Component } from "react";
// import PropTypes from "prop-types";
import AddIcon from "@material-ui/icons/Add";
import IconTag from "../../Tag/IconTag.js";
import AddTagMenu from "../../Tag/AddTagMenu";

class NewTag extends Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null
    };
  }

  handleClick = event => this.setState({ anchorEl: event.currentTarget });

  handleClose = () => this.setState({ anchorEl: null });

  render() {
    const { anchorEl } = this.state;
    return (
      <React.Fragment>
        <IconTag ActionIcon={AddIcon} onClick={this.handleClick} />
        <AddTagMenu
          id={this.props.id}
          handleClose={this.handleClose}
          anchorEl={anchorEl}
        />
      </React.Fragment>
    );
  }
}

// TODO: add proptypes

export default NewTag;

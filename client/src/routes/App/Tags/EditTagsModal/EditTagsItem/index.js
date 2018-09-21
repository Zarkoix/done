import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Query } from "react-apollo";

import DeleteButton from "./DeleteButton"

const styles = theme => ({
  item: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit,
    marginBottom: theme.spacing.unit / 4,
    borderRadius: "16px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  nameInput: {
    ...theme.typography.subheading,
    background: "transparent",
    outline: "none",
    border: "none",
    flexGrow: 1
  },
  colorInput: {
    width: "24px",
    height: "24px",
    borderRadius: "4px",
    marginRight: "16px"
  }
});

class EditTagsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      color: props.color
    };
  }

  handleNameUpdate = e => {
    this.setState({
      name: e.target.value
    });
  };

  handleColorUpdate = e => {
    this.setState({
      color: e.target.value
    });
  };

  render() {
    const { classes, id } = this.props;
    const { name, color } = this.state;
    return (
      <div className={classes.item}>
        <input
          type="color"
          name="color"
          value={color}
          onChange={this.handleColorUpdate}
          className={classes.colorInput}
        />
        <input
          type="text"
          maxLength="32"
          value={name}
          onChange={this.handleNameUpdate}
          className={classes.nameInput}
        />
        <DeleteButton id={id}/>
      </div>
    );
  }
}

EditTagsItem.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  editName: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  editColor: PropTypes.func.isRequired,
};

export default withStyles(styles)(EditTagsItem);

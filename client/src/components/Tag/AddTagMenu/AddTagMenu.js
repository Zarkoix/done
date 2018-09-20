import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/Menu";
import ListItem from "@material-ui/core/MenuItem";

const styles = {
  input: {
    backgroundColor: "transparent",
    border: "none",
    outline: "none"
  }
};

const defaultColor = "#ffd1dc";

const CREATE_NEW_TAG = gql`
  mutation createnewtag($name: String!, $color: String!) {
    createNewTag(input: { name: $name, color: $color }) {
      tag {
        name
        color
        id
        authorId
      }
    }
  }
`;

class AddTagMenu extends Component {
  constructor() {
    super();
    this.state = {
      newTagText: ""
    };
  }

  handleChange = e => {
    this.setState({
      newTagText: e.target.value
    });
  };

  handleClose = () => this.props.handleClose();

  handleClick = (e, tagId, addTag) => {};

  handleKeyDown = (e, createnewtag) => {
    e.stopPropagation();
    if (e.keyCode === 13) {
      createnewtag({
        variables: {
          name: this.state.newTagText,
          color: defaultColor
        }
      });
      this.handleClose();
    } else if (e.keyCode === 27) {
      this.handleClose();
    }
  };

  render() {
    const { tags, anchorEl, classes } = this.props;
    const { newTagText } = this.state;
    const open = Boolean(anchorEl);
    return (
      <Popover
        anchorEl={this.props.anchorEl}
        open={open}
        onClose={this.handleClose}
        PaperProps={{
          style: {
            maxHeight: 400,
            width: 200
          }
        }}
      >
        <ListItem>
          <Mutation mutation={CREATE_NEW_TAG}>
            {createnewtag => (
              <input
                className={classes.input}
                placeholder="New Tag"
                value={newTagText}
                onChange={this.handleChange}
                onKeyDown={e => this.handleKeyDown(e, createnewtag)}
              />
            )}
          </Mutation>
        </ListItem>
        {tags.map(tag => (
          <ListItem key={tag.id} onClick={e => this.handleClick(e, tag.id)}>
            {tag.name}
          </ListItem>
        ))}
      </Popover>
    );
  }
}
// {allTags.nodes.map(tag => (
//                   <ListItem
//                     key={tag.name}
//                     onClick={e => this.handleClick(e, tag.id)}
//                   >
//                     {tag.name}
//                   </ListItem>
//                 ))}

AddTagMenu.propTypes = {
  id: PropTypes.number.isRequired,
  anchorEl: PropTypes.object,
  tags: PropTypes.array.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default withStyles(styles)(AddTagMenu);

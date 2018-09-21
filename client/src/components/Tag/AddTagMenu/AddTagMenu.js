import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Popover from "@material-ui/core/Popover";
// import List from "@material-ui/core/Menu";
import ListItem from "@material-ui/core/MenuItem";

import { GET_ALL_TAGS } from "../queries.js";

const styles = {
  input: {
    backgroundColor: "transparent",
    border: "none",
    outline: "none"
  }
};

const defaultColor = "#ffd1dc";

const CREATE_AND_ADD_TAG = gql`
  mutation todoCreateAndAddTag($todoId: Int!, $name: String!, $color: String!) {
    todoCreateAndAddTag(
      input: { todoId: $todoId, tagName: $name, tagColor: $color }
    ) {
      todo {
        id
        getTags {
          nodes {
            id
            name
            color
          }
        }
      }
    }
  }
`;

const TODO_ADD_TAG = gql`
  mutation todoAddTag($todoId: Int!, $tagId: Int!) {
    todoAddTag(input: { todoId: $todoId, tagId: $tagId }) {
      todo {
        id
        getTags {
          nodes {
            id
            name
            color
          }
        }
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

  handleClick = (e, tagId, addTag) => {
    e.stopPropagation();
    addTag({
      variables: {
        todoId: this.props.id,
        tagId: tagId
      }
    });
    this.handleClose();
  };

  handleKeyDown = (e, createnewtag) => {
    e.stopPropagation();
    if (e.keyCode === 13) {
      createnewtag({
        variables: {
          name: this.state.newTagText,
          color: defaultColor,
          todoId: this.props.id
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
          <Mutation
            mutation={CREATE_AND_ADD_TAG}
            update={(
              cache,
              {
                data: {
                  todoCreateAndAddTag: {
                    todo: {
                      getTags: { nodes }
                    }
                  }
                }
              }
            ) => {
              console.log(nodes);
              // this is ineffecient as we update the store for every tag on
              // the todo, not just the one that was added, but currently there
              // is no way to know which that is
              const { allTags } = cache.readQuery({ query: GET_ALL_TAGS });
              const idFirstAllTags = allTags.nodes.reduce((obj, item) => {
                obj[item["id"]] = item;
                return obj;
              }, {});
              const idFirstNewTags = nodes.reduce((obj, item) => {
                obj[item["id"]] = item;
                return obj;
              }, {});
              const newNodes = Object.values({
                ...idFirstAllTags,
                ...idFirstNewTags
              });
              cache.writeQuery({
                query: GET_ALL_TAGS,
                data: { allTags: { ...allTags, nodes: newNodes } }
              });
            }}
          >
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
        <Mutation mutation={TODO_ADD_TAG}>
          {todoAddTag =>
            tags.map(tag => (
              <ListItem
                key={tag.id}
                onClick={e => this.handleClick(e, tag.id, todoAddTag)}
              >
                {tag.name}
              </ListItem>
            ))
          }
        </Mutation>
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

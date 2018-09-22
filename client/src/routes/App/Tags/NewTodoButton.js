import React, { Component } from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Zoom from "@material-ui/core/Zoom";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import gql from "graphql-tag";
import { GET_ALL_TODOS } from "../../../queries";

const NEW_TODO_WITH_TAGS = gql`
mutation createTodoWithTags($tagIds: [Int]!){
	todoCreateWithTags(input: {tagIds: $tagIds}) {
    todo {
      id
      headline
      completed
      doWhenDate
      getTags {
        nodes {
          name
          id
          color
        }
      }
    }
  }
}
`;

const styles = theme => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

class NewTodoButton extends Component {
  render() {
    const { classes, selectedTagIds } = this.props;
    return (
      <Mutation
        mutation={NEW_TODO_WITH_TAGS}
        update={(cache, { data: { todoCreateWithTags: { todo } } }) => {
          const { allTodos } = cache.readQuery({ query: GET_ALL_TODOS });
          const newNodes = allTodos.nodes.concat([todo]);
          cache.writeQuery({
            query: GET_ALL_TODOS,
            data: { allTodos: { ...allTodos, nodes: newNodes } }
          });
        }}
      >
        {(newTodoWithTags, { data, loading, error }) => (
          <Zoom in={true}>
            <Button
              variant="fab"
              color="primary"
              aria-label="Add"
              className={classes.fab}
              onClick={() => newTodoWithTags({
                variables: {
                  tagIds: selectedTagIds
                }
              })}
            >
              <AddIcon />
            </Button>
          </Zoom>
        )}
      </Mutation>
    );
  }
}

NewTodoButton.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedTagIds: PropTypes.arrayOf(PropTypes.number)
};

export default withStyles(styles)(NewTodoButton);

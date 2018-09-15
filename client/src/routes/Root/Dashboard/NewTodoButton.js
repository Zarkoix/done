import React, { Component } from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import gql from "graphql-tag";
import { GET_ALL_TODOS } from './../../../queries'

const NEW_TODO = gql`
  mutation NewTodo{
    createtodo(input: {}) {
      todo {
        id
        headline
        completed
      }
    }
  }
`;

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  }
});

class NewTodoButton extends Component {
  render() {
    const { classes } = this.props;
    return (
        <Mutation
          mutation={NEW_TODO}
          update={(cache, { data: { createtodo: {todo}}}) => {
            const { allTodos } = cache.readQuery({ query: GET_ALL_TODOS });
            const newNodes = allTodos.nodes.concat([todo])
            cache.writeQuery({
              query: GET_ALL_TODOS,
              data: { allTodos: {...allTodos, nodes: newNodes }}
            });
          }}
        >
          {(newTodo, { data, loading, error }) => (
            <Button
              variant="fab"
              color="primary"
              aria-label="Add"
              className={classes.fab}
              onClick={newTodo}
            >
              <AddIcon />
            </Button>
          )}
        </Mutation>
    );
  }
}

NewTodoButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewTodoButton);

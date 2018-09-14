import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query, Mutation } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import gql from "graphql-tag";

const GET_ALL_TODOS = gql`
  query {
    allTodos {
      nodes {
        headline
      }
    }
  }
`;

const NEW_TODO = gql`
  mutation {
    createtodo(input: {}) {
      todo {
        headline
      }
    }
  }
`;

export const AUTHENTICATE = gql`
  mutation Authenticate($email: String!, $password: String!) {
    authenticate(input: { email: $email, password: $password }) {
      jwtToken
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

class Dashboard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <h1>Todos</h1>
        <Query query={GET_ALL_TODOS}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error!: ${error}`;
            return data.allTodos.nodes.map((todo, i) => (
              <Paper key={i}>
                <h2>{todo.headline}</h2>
              </Paper>
            ));
          }}
        </Query>
        <Mutation
          mutation={NEW_TODO}
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
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);

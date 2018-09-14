import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

const GET_TODO_DATA = gql`
  query getTodoData($id: Int!) {
    todoById(id: $id) {
      headline
      completed
      id
    }
  }
`;

export const SET_COMPLETED = gql`
  mutation setCompleted($id: Int!, $completed: Boolean!) {
    updateTodoById(input: { id: $id, todoPatch: { completed: $completed } }) {
      todo {
        id
        completed
      }
    }
  }
`;

const styles = theme => ({
  paper: {
    height: "48px",
    margin: "theme.spacing.unit 0",
    display: "flex",
    flexDirection: "row",
    transition: "box-shadow 0.2s ease-in",
    "&:hover": {
      boxShadow: "0 2px 8px 0 rgba(0,0,0,.25)"
    }
  },
  headline: {
    lineHeight: "48px",
    display: "inline"
  }
});

class Todo extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Query query={GET_TODO_DATA} variables={{ id: this.props.id }}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          let { headline, completed } = data.todoById;
          return (
            <div className={classes.paper}>
              <Mutation mutation={SET_COMPLETED}>
                {(setCompleted, { data, loading, error }) => (
                  <Checkbox
                    checked={completed}
                    onClick={() => setCompleted({
                      variables: {
                        id: this.props.id,
                        completed: !completed
                      }
                    })}
                  />
                )}
              </Mutation>
              <Typography variant="headline" className={classes.headline}>
                {headline}
              </Typography>
            </div>
          );
        }}
      </Query>
    );
  }
}

Todo.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired
};

export default withStyles(styles)(Todo);

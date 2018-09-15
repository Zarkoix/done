import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

const GET_TODO_COMPLETE_DATA = gql`
  query getCompleteTodoData($id: Int!) {
    todoById(id: $id) {
      id
      body
    }
  }
`;

export const SET_COMPLETED = gql`
  mutation setCompleted($id: Int!, $completed: Boolean!) {
    updateTodoById(input: { id: $id, todoPatch: { completed: $completed } }) {
      todo {
        id
        completed
        body
      }
    }
  }
`;

const styles = theme => ({
  content: {
  },
  body: {
    lineHeight: "14px",
    display: "block"
  }
});

class ExpandedContent extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false
    };
  }

  handleFocus = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Query query={GET_TODO_COMPLETE_DATA} variables={{ id: this.props.id }}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          let { body } = data.todoById;
          return (
            <div
              className={classes.content}
            >
              <Typography variant="body1" className={classes.body}>
                {body}Expanded Content woo
              </Typography>
            </div>
          );
        }}
      </Query>
    );
  }
}

ExpandedContent.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired
};

export default withStyles(styles)(ExpandedContent);

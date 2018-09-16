import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import ExpandedContent from "./ExpandedContent.js";
import Headline from "./Headline.js";

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
        body
      }
    }
  }
`;

const styles = theme => ({
  paper: {
    height: "auto",
    margin: theme.spacing.unit + "px " + theme.spacing.unit * 2 + "px",
    borderRadius: "5px",
    transition: "opacity 0.2s, box-shadow 0.2s, background-color 0.2s ease-in",
    "&:hover": {
      boxShadow: "0 2px 8px 0 rgba(0,0,0,.25)",
      backgroundColor: theme.palette.background.paper,
      opacity: '1 !important'
    }
  },
  topBar: {
    display: "flex",
    flexDirection: "row"
  },
  expandedContent: {
    padding: theme.spacing.unit + "px"
  },
  headline: {
    lineHeight: "48px",
    display: "inline"
  }
});

class Todo extends Component {
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
  };

  render() {
    const { classes } = this.props;
    return (
      <Query query={GET_TODO_DATA} variables={{ id: this.props.id }}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          const { headline, completed } = data.todoById;
          const stylesFromExpanded = this.state.expanded
            ? {
                boxShadow: "0 2px 8px 0 rgba(0,0,0,.25)",
                backgroundColor: this.props.theme.palette.background.paper,
                opacity: 1
              }
            : {
                cursor: "pointer"
              };
          const stylesFromCompleted = completed ? { opacity: 0.5 } : {};
          return (
            <div
              className={classes.paper}
              onClick={this.handleFocus}
              style={{ ...stylesFromCompleted, ...stylesFromExpanded }}
            >
              <div className={classes.topBar}>
                <Mutation mutation={SET_COMPLETED}>
                  {(setCompleted, { data, loading, error }) => (
                    <Checkbox
                      checked={completed}
                      onClick={e => {
                        e.stopPropagation();
                        setCompleted({
                          variables: {
                            id: this.props.id,
                            completed: !completed
                          }
                        });
                      }}
                    />
                  )}
                </Mutation>
                <Headline text={headline} id={this.props.id} />
              </div>
              {this.state.expanded ? (
                <div className={classes.expandedContent}>
                  <ExpandedContent id={this.props.id} />
                </div>
              ) : null}
            </div>
          );
        }}
      </Query>
    );
  }
}

Todo.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired
};

export default withStyles(styles, { withTheme: true })(Todo);

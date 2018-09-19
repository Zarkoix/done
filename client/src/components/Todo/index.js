import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import Checkbox from "@material-ui/core/Checkbox";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import classNames from "classnames";

import IconButton from "@material-ui/core/IconButton";
import DownIcon from "@material-ui/icons/KeyboardArrowDown";
import UpIcon from "@material-ui/icons/KeyboardArrowUp";

import Headline from "./Headline.js";
import ExpandedContent from "./ExpandedContent.js";
import Tags from "./Tags.js"

const GET_TODO_DATA = gql`
  query getTodoData($id: Int!) {
    todoById(id: $id) {
      headline
      completed
      id
      body
      doWhenDate
      doWhenTime
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
    height: "auto",
    margin: theme.spacing.unit / 4 + "px " + theme.spacing.unit * 2 + "px",
    borderRadius: "5px",
    transition: "opacity 0.2s, box-shadow 0.2s, background-color 0.2s ease-in",
    "&:hover": {
      boxShadow: "0 2px 8px 0 rgba(0,0,0,.25)",
      backgroundColor: theme.palette.background.paper,
      opacity: "1 !important"
    }
  },
  expandButton: {
    transition: "opacity ease-in 0.2s"
  },
  topBar: {
    display: "flex",
    flexDirection: "row",
    padding: theme.spacing.unit / 2 + "px",
    paddingLeft: 0
  },
  expandedContent: {
    padding: theme.spacing.unit + "px",
    paddingTop: 0
  },
  headlineContent: {
    lineHeight: "48px",
    display: "inline",
    flexGrow: 1
  },
  headlineTags: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }
});

class Todo extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
      hover: false
    };
  }

  toggleExpanded = () =>
    this.setState({
      expanded: !this.state.expanded
    });

  handleHover = hover => {
    this.setState({
      hover: hover
    });
  };

  render() {
    const { classes, width } = this.props;
    const isDense = width === "xs";
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
            : {};
          const stylesFromCompleted = completed ? { opacity: 0.5 } : {};
          return (
            <div
              className={classes.paper}
              style={{ ...stylesFromCompleted, ...stylesFromExpanded }}
              onMouseEnter={() => this.handleHover(true)}
              onMouseLeave={() => this.handleHover(false)}
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
                          },
                          optimisticResponse: {
                            updateTodoById: {
                              __typename: "UpdateTodoPayload",
                              todo: {
                                id: this.props.id,
                                __typename: "todo",
                                completed: !completed
                              }
                            }
                          }
                        });
                      }}
                    />
                  )}
                </Mutation>
                <Headline
                  text={headline}
                  id={this.props.id}
                  className={classes.headlineContent}
                />
                {!this.state.expanded && !isDense && (
                  <div className={classes.headlineTags}>
                    <Tags/>
                  </div>
                )}
                <IconButton
                  className={classNames(classes.button, classes.expandButton)}
                  component="span"
                  onClick={this.toggleExpanded}
                  style={
                    this.state.expanded || this.state.hover
                      ? { opacity: "1" }
                      : { opacity: "0" }
                  }
                >
                  {this.state.expanded ? <UpIcon /> : <DownIcon />}
                </IconButton>
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
  id: PropTypes.number.isRequired,
  width: PropTypes.string.isRequired
};

export default withWidth()(withStyles(styles, { withTheme: true })(Todo));

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import produce from "immer";

import Slide from "@material-ui/core/Slide";

import Todo from "../../../components/Todo";
import NewTodoButton from "./NewTodoButton.js";
import TagsNavigation from "./TagsNavigation";

import gql from "graphql-tag";

export const GET_ALL_TODOS = gql`
  query GetAllTodos {
    allTodos {
      nodes {
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

function meetsFilters(todo, selectedTagIdSet) {
  // check that every tag_id in `selectedTagIdSet` in in GET_TODO_TAGS
  if (selectedTagIdSet.size === 0) return true;
  let todoIds = new Set(todo.getTags.nodes.map(todo => todo.id));
  let selectedIds = [...selectedTagIdSet];
  for (let i = 0; i < selectedIds.length; i++) {
    if (!todoIds.has(selectedIds[i])) return false;
  }
  return true;
}

const styles = theme => ({
  layout: {
    display: "flex",
    flexDirection: "row",
    height: "100%"
  },
  titleText: {
    marginBottom: theme.spacing.unit + "px"
  },
  content: {
    padding: theme.spacing.unit / 2,
    flexGrow: 1
  }
});

class Tags extends Component {
  constructor() {
    super();
    this.state = {
      selectedTags: new Set()
    };
  }

  handleTagClick = id => {
    if (this.state.selectedTags.has(id)) {
      this.setState(
        produce(this.state, draftState => {
          draftState.selectedTags.delete(id);
        })
      );
    } else {
      this.setState(
        produce(this.state, draftState => {
          draftState.selectedTags.add(id);
        })
      );
    }
  };

  handleTagDoubleClick = id => {
    this.setState({
      selectedTags: new Set([id])
    });
  };

  render() {
    const { classes } = this.props;
    const { selectedTags } = this.state;
    return (
      <div className={classes.layout}>
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
          <TagsNavigation
            onTagClick={this.handleTagClick}
            onTagDoubleClick={this.handleTagDoubleClick}
            selected={selectedTags}
          />
        </Slide>
        <div className={classes.content}>
          <Query query={GET_ALL_TODOS}>
            {({ loading, error, data }) => {
              if (loading) return null;
              if (error) return `Error!: ${error}`;
              console.log(data.allTodos.nodes);
              return data.allTodos.nodes
                .filter(todo => meetsFilters(todo, selectedTags))
                .map((data, i) => <Todo key={i} id={data.id} />);
            }}
          </Query>
          <NewTodoButton />
        </div>
      </div>
    );
  }
}

Tags.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Tags);

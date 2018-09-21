import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import produce from "immer";

import Slide from "@material-ui/core/Slide";

import Todo from "../../../components/Todo";
import NewTodoButton from "./NewTodoButton.js";
import TagsNavigation from "./TagsNavigation";

import EditTagsModal from "./EditTagsModal";

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
  navigation: {
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid " + theme.palette.divider
  },
  titleText: {
    marginBottom: theme.spacing.unit + "px"
  },
  content: {
    padding: theme.spacing.unit / 2,
    flexGrow: 1
  },
  editTagsBtn: {
    borderRadius: 0
  }
});

class Tags extends Component {
  constructor() {
    super();
    this.state = {
      selectedTags: new Set(),
      openEditModal: false
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

  handleEditModalOpen = () => {
    this.setState({
      openEditModal: true
    });
  };

  handleEditModalClose = () => {
    this.setState({
      openEditModal: false
    });
  };

  render() {
    const { classes } = this.props;
    const { selectedTags, openEditModal } = this.state;
    return (
      <div className={classes.layout}>
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
          <div className={classes.navigation}>
            <Button
              className={classes.editTagsBtn}
              onClick={this.handleEditModalOpen}
            >
              Edit Tags
            </Button>
            <Divider />
            <TagsNavigation
              onTagClick={this.handleTagClick}
              onTagDoubleClick={this.handleTagDoubleClick}
              selected={selectedTags}
            />
          </div>
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
        <EditTagsModal
          open={openEditModal}
          onClose={this.handleEditModalClose}
        />
      </div>
    );
  }
}

Tags.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Tags);

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import Completion from "./Completion.js";
import ListViewHeadline from "./ListViewHeadline.js";
import ListViewTags from "./ListViewTags.js";

import clearHighlights from "../clearHighlights.js";

const GET_TODO_LISTVIEW_DATA = gql`
  query getCompleteTodoData($id: Int!) {
    todoById(id: $id) {
      id
      headline
      completed
    }
  }
`;

const styles = theme => ({
  topBar: {
    display: "flex",
    flexDirection: "row"
  }
});

const ListView = ({ classes, id, isDense }) => {
  clearHighlights();
  return (
    <Query query={GET_TODO_LISTVIEW_DATA} variables={{ id: id }}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return `Error!: ${error}`;
        let { completed, headline } = data.todoById;
        return (
          <div className={classes.topBar}>
            <Completion completed={completed} id={id} />
            <ListViewHeadline text={headline} />
            {!isDense && <ListViewTags id={id} />}
          </div>
        );
      }}
    </Query>
  );
};

ListView.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  isDense: PropTypes.bool
};

export default withStyles(styles)(ListView);

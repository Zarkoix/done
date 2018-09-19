// import React, { Component } from "react";
import React from "react";
import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
import { Mutation } from "react-apollo";
import Checkbox from "@material-ui/core/Checkbox";
import gql from "graphql-tag";

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

const Completion = ({ completed, id }) => {
  return (
    <Mutation mutation={SET_COMPLETED}>
      {(setCompleted, { data, loading, error }) => (
        <Checkbox
          checked={completed}
          onClick={e => {
            e.stopPropagation();
            setCompleted({
              variables: {
                id: id,
                completed: !completed
              },
              optimisticResponse: {
                updateTodoById: {
                  __typename: "UpdateTodoPayload",
                  todo: {
                    id: id,
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
  );
};

Completion.propTypes = {
  // classes: PropTypes.object.isRequired,
  completed: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired
};

export default Completion;

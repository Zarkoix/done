import React, { PureComponent } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import CCompletionCheckbox from "./CompletionCheckbox.js";

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

class CompletionCheckbox extends PureComponent {
  render() {
    return (
      <Mutation mutation={SET_COMPLETED}>
        {(setCompleted, { data, loading, error }) => (
          <CCompletionCheckbox setCompleted={setCompleted} {...this.props} />
        )}
      </Mutation>
    );
  }
}

export default CompletionCheckbox;

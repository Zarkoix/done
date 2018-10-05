import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { SET_DO_WHEN } from "../DateTime/queries.js";

import LeftGutterDate from "./LeftGutterDate.js";

const GET_TODO_DATE = gql`
  query getCompleteTodoData($id: Int!) {
    todoById(id: $id) {
      id
      doWhenDate
      doWhenTime
    }
  }
`;

class CLeftGutterDate extends PureComponent {
  render() {
    return (
      <Mutation mutation={SET_DO_WHEN}>
        {setDoWhen => (
          <Query query={GET_TODO_DATE} variables={{ id: this.props.id }}>
            {({ loading, error, data }) => {
              if (loading) return null;
              if (error) return `Error!: ${error}`;
              let { doWhenDate } = data.todoById;
              return (
                <LeftGutterDate
                  setDoWhen={setDoWhen}
                  doWhenDate={doWhenDate}
                  {...this.props}
                />
              );
            }}
          </Query>
        )}
      </Mutation>
    );
  }
}

CLeftGutterDate.propTypes = {
  id: PropTypes.number.isRequired
};

export default CLeftGutterDate;

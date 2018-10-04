import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import LeftGutterDate from './LeftGutterDate.js'

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
      <Query query={GET_TODO_DATE} variables={{ id: this.props.id }}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          let { doWhenDate } = data.todoById;
          return (
              <LeftGutterDate doWhenDate={doWhenDate} id={this.props.id} />
          );
        }}
      </Query>
    );
  }
}

CLeftGutterDate.propTypes = {
  id: PropTypes.number.isRequired,
  onClose: PropTypes.func
};

export default CLeftGutterDate;

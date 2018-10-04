import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";

import CalendarButton from "./CalendarButton.js";
import DateButton from "./DateButton.js";
import TimeButton from "./TimeButton.js";

const GET_TODO_DATA = gql`
  query getTodoData($id: Int!) {
    todoById(id: $id) {
      id
      doWhenDate
      doWhenTime
    }
  }
`;

class DateTime extends Component {
  render() {
    // const { classes } = this.props;
    return (
      <Query query={GET_TODO_DATA} variables={{ id: this.props.id }}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          let { doWhenDate, doWhenTime } = data.todoById;
          doWhenDate = doWhenDate ? moment(doWhenDate, "YYYY-MM-DD") : null;
          doWhenTime = doWhenTime ? moment(doWhenTime, "HH:mm:SS") : null;
          return (
            <React.Fragment>
              <CalendarButton
                id={this.props.id}
                doWhenDate={doWhenDate}
                doWhenTime={doWhenTime}
              />
              {doWhenDate && (
                <React.Fragment>
                  <DateButton id={this.props.id} date={doWhenDate} />
                  {doWhenTime && (
                    <TimeButton id={this.props.id} time={doWhenTime} />
                  )}
                </React.Fragment>
              )}
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

DateTime.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired
};

export default withStyles({})(DateTime);

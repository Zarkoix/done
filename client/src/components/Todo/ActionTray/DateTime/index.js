import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

import CalendarIcon from "@material-ui/icons/CalendarToday";
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
    const { classes } = this.props;
    return (
      <Query query={GET_TODO_DATA} variables={{ id: this.props.id }}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          let { do_when_date, do_when_time } = data.todoById;
          console.log(do_when_date, do_when_time);
          return (
            <React.Fragment>
              <IconButton
                className={classes.button}
                aria-label="Change planned time"
              >
                <CalendarIcon />
              </IconButton>
              {do_when_date && (
                <React.Fragment>
                  <DateButton />
                  {do_when_time && <TimeButton />}
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

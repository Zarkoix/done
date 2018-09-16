import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import gql from "graphql-tag";

import { GET_ALL_TODOS } from '../../queries'

import Todo from '../../components/Todo'
import NewTodoButton from './NewTodoButton.js'

export const AUTHENTICATE = gql`
  mutation Authenticate($email: String!, $password: String!) {
    authenticate(input: { email: $email, password: $password }) {
      jwtToken
    }
  }
`;

const styles = theme => {
  console.log(theme)
  return {}
};

class Today extends Component {
  render() {
    // const { classes } = this.props;
    return (
      <div>
        <Typography variant="display1">Today</Typography>
        <Query query={GET_ALL_TODOS}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error!: ${error}`;
            console.log(data)
            return data.allTodos.nodes.map((data, i) => (
              <Todo key={i} id={data.id} />
            ));
          }}
        </Query>
        <NewTodoButton />
      </div>
    );
  }
}

Today.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Today);

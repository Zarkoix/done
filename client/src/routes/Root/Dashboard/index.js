import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import gql from "graphql-tag";

import { GET_ALL_TODOS } from '../../../queries'

import Todo from '../../../components/Todo'
import NewTodoButton from './NewTodoButton.js'

export const AUTHENTICATE = gql`
  mutation Authenticate($email: String!, $password: String!) {
    authenticate(input: { email: $email, password: $password }) {
      jwtToken
    }
  }
`;

const styles = theme => ({

});

class Dashboard extends Component {
  render() {
    // const { classes } = this.props;
    return (
      <div>
        <h1>Todos</h1>
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

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);

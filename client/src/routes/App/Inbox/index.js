import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Todo from "../../../components/Todo";
import NewTodoButton from "./NewTodoButton.js";

import { GET_ALL_TODOS } from "../../../queries";

const styles = theme => ({
  titleText: {
    marginBottom: theme.spacing.unit + "px"
  }
});

class Inbox extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography className={classes.titleText} variant="display1">
          Inbox
        </Typography>
        <Query query={GET_ALL_TODOS}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error!: ${error}`;
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

Inbox.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Inbox);

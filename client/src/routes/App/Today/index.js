import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

import Todo from "../../../components/Todo";
import NewTodoTodayButton from "./NewTodoTodayButton.js";

import { GET_ALL_TODOS } from "../../../queries";

const styles = theme => ({
  titleText: {
    marginBottom: theme.spacing.unit + "px"
  }
});

class Today extends Component {
  ifToday = todo => todo.doWhenDate === moment().format("YYYY-MM-DD");

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography className={classes.titleText} variant="display1">
          Today
        </Typography>
        <Query query={GET_ALL_TODOS}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error!: ${error}`;
            return data.allTodos.nodes
              .filter(this.ifToday)
              .map((data, i) => <Todo key={i} id={data.id} />);
          }}
        </Query>
        <NewTodoTodayButton />
      </div>
    );
  }
}

Today.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Today);

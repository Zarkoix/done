import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

import Todo from "../../components/Todo";
import NewTodoButton from "./NewTodoButton.js";

import { GET_TODOS_FOR_DATE } from '../../queries'

const styles = theme => ({
  titleText: {
    marginBottom: theme.spacing.unit + "px"
  }
});

class Today extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography className={classes.titleText} variant="display1">
          Today
        </Typography>
        <Query
          query={GET_TODOS_FOR_DATE}
          variables={{ date: moment().format("YYYY-MM-DD") }}
        >
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

Today.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Today);

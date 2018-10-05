import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Todo from "../../../components/Todo";
import NewTodoButton from "./NewTodoButton.js";
import DateHeader from "./DateHeader";

const styles = theme => ({
  titleText: {
    marginBottom: theme.spacing.unit + "px"
  },
  dateGroup: {
    marginBottom: theme.spacing.unit * 2 + "px"
  }
});

function renderTodosByDate(nodes, classes) {
  let dates = {};
  nodes.forEach(todoData => {
    if (todoData.doWhenDate) {
      // only include todos that have a doWhenDate
      if (!dates[todoData.doWhenDate]) {
        dates[todoData.doWhenDate] = []; // if the datesMap doesn't have the date, add an array
      }
      dates[todoData.doWhenDate].push(todoData); // add the todo to the proper place in dateMap
    }
  });
  return Object.keys(dates).map(date => (
    <div key={date} className={classes.dateGroup}>
      <DateHeader text={date} />
      {dates[date].map(todo => (
        <Todo id={todo.id} key={todo.id} showDoWhenDateByDefault={false} />
      ))}
    </div>
  ));
}

class UpcomingTodoList extends Component {
  shouldComponentUpdate(newProps, newState) {
    const { nodes } = this.props;
    const { nodes: newNodes } = newProps;
    console.log(nodes, newNodes);
    if (nodes.length !== newNodes.length) return true;
    let length = nodes.length;
    for (let i = 0; i < length; i++) {
      if (nodes[i].id !== newNodes[i].id) return true;
    }
    return false;
  }

  render() {
    const { classes, nodes } = this.props;
    return (
      <React.Fragment>
        <Typography className={classes.titleText} variant="display1">
          Upcoming
        </Typography>
        {renderTodosByDate(nodes, classes)}
        {/* <NewTodoButton /> */}
      </React.Fragment>
    );
  }
}

UpcomingTodoList.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UpcomingTodoList);

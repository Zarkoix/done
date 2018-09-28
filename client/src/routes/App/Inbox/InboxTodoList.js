import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Todo from "../../../components/Todo";
import NewTodoButton from "./NewTodoButton.js";

const styles = theme => ({
  titleText: {
    marginBottom: theme.spacing.unit + "px"
  }
});

class InboxTodoList extends Component {
  shouldComponentUpdate(newProps, newState) {
    const { nodes } = this.props;
    const { newNodes } = newProps;
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
          Inbox
        </Typography>
        {nodes.map((data, i) => (
          <Todo key={i} id={data.id} />
        ))}
        <NewTodoButton />
      </React.Fragment>
    );
  }
}

InboxTodoList.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InboxTodoList);

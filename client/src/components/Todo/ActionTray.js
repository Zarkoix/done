import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { GET_ALL_TODOS } from '../../queries'

const DELTE_TODO = gql`
  mutation deleteTodo($id: Int!) {
    deleteTodoById(input: { id: $id }) {
      todo {
        id
      }
    }
  }
`;

const styles = theme => ({
  tray: {
    display: 'flex',
    flexDirection: 'row-reverse'
  }
});

class ActionTray extends Component {
  constructor(props) {
    super();
    this.state = {
      text: props.text ? props.text : ""
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.tray}>
        <Mutation mutation={DELTE_TODO}
          update={(cache, { data: { deleteTodoById: {todo: { id }}} }) => {
            const { allTodos } = cache.readQuery({ query: GET_ALL_TODOS });
            const newNodes = allTodos.nodes.filter(node => node.id !== id)
            cache.writeQuery({
              query: GET_ALL_TODOS,
              data: { allTodos: {...allTodos, nodes: newNodes }}
            });
          }}
        >
          {deleteTodo => (
            <IconButton
              className={classes.button}
              aria-label="Delete"
              onClick={() =>
                deleteTodo({
                  variables: {
                    id: this.props.id
                  }
                })
              }
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Mutation>
      </div>
    );
  }
}

ActionTray.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired
};

export default withStyles(styles)(ActionTray);

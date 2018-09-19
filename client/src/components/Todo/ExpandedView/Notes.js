import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const SET_BODY = gql`
  mutation setBODY($id: Int!, $body: String!) {
    updateTodoById(input: { id: $id, todoPatch: { body: $body } }) {
      todo {
        id
        body
      }
    }
  }
`;

const styles = theme => ({
  textarea: {
    ...theme.typography.body1,
    background: "transparent",
    border: "none",
    outline: "none",
    resize: "none",
    width: "100%"
  }
});

class Notes extends Component {
  constructor(props) {
    super();
    this.state = {
      text: props.text ? props.text : ""
    };
  }

  handleChange = event => {
    this.setState({ text: event.target.value });
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.id !== this.props.id) {
      this.setState({
        text: nextProps.text ? nextProps.text : ""
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Mutation mutation={SET_BODY}>
        {setBody => (
          <textarea
            type="text"
            placeholder="Notes..."
            className={classes.textarea}
            value={this.state.text}
            onChange={this.handleChange}
            onClick={e => e.stopPropagation()}
            onBlur={() => {
              setBody({
                variables: {
                  id: this.props.id,
                  body: this.state.text
                }
              });
            }}
          />
        )}
      </Mutation>
    );
  }
}

Notes.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  text: PropTypes.string
};

export default withStyles(styles)(Notes);

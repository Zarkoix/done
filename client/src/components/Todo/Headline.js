import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const GET_HEADLINE = gql`
  query getTodoData($id: Int!) {
    todoById(id: $id) {
      id
      headline
    }
  }
`;

const SET_HEADLINE = gql`
  mutation setHeadline($id: Int!, $headline: String!) {
    updateTodoById(input: { id: $id, todoPatch: { headline: $headline } }) {
      todo {
        id
        headline
      }
    }
  }
`;

const styles = theme => ({
  input: {
    ...theme.typography.headline,
    border: "none",
    outline: "none"
  }
});

class Headline extends Component {
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
    if (nextProps.text !== this.state.text) {
      this.setState({
        text: nextProps.text
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Mutation mutation={SET_HEADLINE}>
        {setHeadline => (
          <input
            type="text"
            placeholder="Title this todo!"
            maxLength="280"
            className={classes.input}
            value={this.state.text}
            onChange={this.handleChange}
            onClick={e => e.stopPropagation()}
            onBlur={() => {
              setHeadline({
                variables: {
                  id: this.props.id,
                  headline: this.state.text
                }
              });
            }}
          />
        )}
      </Mutation>
    );
  }
}

Headline.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  text: PropTypes.string
};

export default withStyles(styles)(Headline);

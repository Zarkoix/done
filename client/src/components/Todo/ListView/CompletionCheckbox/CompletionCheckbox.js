import React, { PureComponent } from "react";
import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";

class CCompletionCheckbox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      completed: props.completed
    };
  }

  handleToggle = (e) => {
    const { id, setCompleted, completed } = this.props; 
    e.stopPropagation();
    setCompleted({
      variables: {
        id: id,
        completed: !completed
      },
      optimisticResponse: {
        updateTodoById: {
          __typename: "UpdateTodoPayload",
          todo: {
            id: id,
            __typename: "todo",
            completed: !completed
          }
        }
      }
    });
    this.setState({
      completed: !completed
    })
  }

  render() {
    const { completed } = this.props;
    return (
      <Checkbox
        checked={completed}
        onClick={this.handleToggle}
      />
    );
  }
}

CCompletionCheckbox.propTypes = {
  // classes: PropTypes.object.isRequired,
  completed: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  setCompleted: PropTypes.func.isRequired
};

export default CCompletionCheckbox;

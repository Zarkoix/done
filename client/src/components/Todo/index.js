import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import withWidth from "@material-ui/core/withWidth";

import ListView from "./ListView";
import ExpandedView from "./ExpandedView";

const styles = theme => ({
  paper: {
    height: "auto",
    overflow: "hidden",
    margin: theme.spacing.unit / 4 + "px " + theme.spacing.unit * 2 + "px",
    borderRadius: "5px",
    transition:
      "opacity 0.2s, box-shadow 0.2s, background-color 0.2s ease-in, height 0.2s ease-in",
    "&:hover": {
      backgroundColor: theme.palette.background.paper,
      opacity: "1 !important"
    }
  },
  paperSelected: {
    opacity: "1 !important",
    backgroundColor: theme.palette.background.paper
  },
  paperExpanded: {
    backgroundColor: theme.palette.background.paper,
    opacity: "1 !important",
    boxShadow: "0 2px 8px 0 rgba(0,0,0,.25)"
  }
});

class ToDo extends Component {
  constructor() {
    super();
    this.state = {
      selected: false,
      expanded: false,
      height: 56
    };
    this.todoContent = React.createRef();
  }

  componentDidMount() {
    const height = this.todoContent.current.clientHeight;
    console.log(height);
    this.setState({ height });
  }

  canSelect = () => {
    return !this.state.expanded;
  };

  handleSelect = () => {
    if (this.canSelect()) {
      this.setState({
        selected: true,
        expanded: false
      });
    }
  };

  toggleExpand = () => {
    if (this.state.expanded) {
      this.collapse();
    } else {
      this.expand();
    }
  };

  handleClickAway = () => {
    this.setState({
      selected: false
    });
  };

  // todo move to a switch
  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.expand();
    } else if (e.keyCode === 27) {
      this.collapse();
    }
  };

  expand = () => {
    this.setState(
      {
        selected: false,
        expanded: true
      },
      () => {
        const height = this.todoContent.current.clientHeight;
        console.log("expand", height);
        this.setState({ height });
      }
    );
  };

  collapse = () => {
    this.setState(
      {
        selected: false,
        expanded: false
      },
      () => {
        const height = this.todoContent.current.clientHeight;
        console.log("collapse", height);
        this.setState({ height });
      }
    );
  };

  calculateClasses = classes => {
    return classNames({
      [classes.paper]: true,
      [classes.paperSelected]: this.state.selected,
      [classes.paperExpanded]: this.state.expanded
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <div
          className={this.calculateClasses(classes)}
          onClick={this.handleSelect}
          onDoubleClick={this.toggleExpand}
          onKeyDown={this.handleKeyDown}
          tabIndex="0"
          style={{ height: Math.max(this.state.height, 56) }}
        >
          <div ref={this.todoContent}>
            {!this.state.expanded ? (
              <ListView
                id={this.props.id}
                selected={this.state.selected}
                isDense={false}
              />
            ) : (
              <ExpandedView
                id={this.props.id}
                selected={this.state.selected}
                isDense={false}
                onClose={this.toggleExpand}
              />
            )}
          </div>
        </div>
      </ClickAwayListener>
    );
  }
}

ToDo.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  width: PropTypes.string.isRequired
};

export default withWidth()(withStyles(styles, { withTheme: true })(ToDo));

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
    outline: "none",
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
    };
    this.todoContent = React.createRef();
  }

  shouldComponentUpdate = (newProps, newState) => {
    if (this.state.selected !== newState.selected) return true;
    if (this.state.expanded !== newState.expanded) return true;
    if (this.props.id === newProps.id) return false;
    return true;
  }

  canSelect = () => {
    return !this.state.expanded;
  };

  handleClick = (e) => {
    e.stopPropagation();
    e.stopPropagation();
    if (this.canSelect() && this.state.selected === false) {
      this.setState({
        selected: true,
        expanded: false
      });
    }
  };

  handleDoubleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    this.toggleExpand();
    return false;
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
    this.setState({
        selected: false,
        expanded: true
      }, () => {
        const expandedHeight = this.todoContent.current.clientHeight;
        this.setState({ expandedHeight });
      });
  };

  collapse = () => {
    this.setState({
        selected: false,
        expanded: false
      });
  };

  calculateClasses = classes => {
    return classNames({
      [classes.paper]: true,
      [classes.paperSelected]: this.state.selected,
      [classes.paperExpanded]: this.state.expanded
    });
  };

  calculateHeight = () => {
    if (this.state.expanded) {
      // const calculatedHeight = this.state.expandedHeight
      // if (calculatedHeight && calculatedHeight !== 56) {
      //   return this.todoContent.current.clientHeight
      // }
      return 'auto' // reasonable default while we calculate actual value
    } else {
      return '56px' // height of listView
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <div
          className={this.calculateClasses(classes)}
          onClick={this.handleClick}
          onDoubleClick={this.handleDoubleClick}
          onKeyDown={this.handleKeyDown}
          tabIndex="0"
          style={{ height: this.calculateHeight()}}
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

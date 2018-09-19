import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "./TagsNavigationItem";
import produce from "immer";

import Tag from "../../../components/Tag"

const styles = theme => ({
  list: {
    borderRight: "1px solid " + theme.palette.divider,
    paddingTop: 0
  },
  listItem: {
    // backgroundColor: "transparent"
  },
  listItemSelected: {
    // backgroundColor: "transparent"
  }
});

class TagsNavigation extends Component {
  constructor() {
    super();
    this.state = {
      tags: {
        red: {
          selected: true,
          color: "#ffb3ba"
        },
        orange: {
          selected: false,
          color: "#ffdfba"
        },
        yellow: {
          selected: false,
          color: "#ffffba"
        },
        green: {
          selected: false,
          color: "#baffc9"
        },
        blue: {
          selected: false,
          color: "#bae1ff"
        }
      }
    };
  }

  handleListItemClick = key => {
    console.log('handling click for', key)
    this.setState(
      produce(this.state, draftState => {
        draftState.tags[key].selected = !draftState.tags[key].selected;
      })
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <List component="nav" className={classes.list}>
        {Object.entries(this.state.tags).map(([name, data]) => (
          <ListItem
            button
            key={name}
            selected={data.selected}
            selectedBackgroundColor={data.color}
            textColor={data.color}
            selectedTextColor="black"
            onClick={() => this.handleListItemClick(name)}
          >
            {name}
          </ListItem>
        ))}
      </List>
    );
  }
}

export default withStyles(styles)(TagsNavigation);

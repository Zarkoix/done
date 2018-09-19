import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import produce from "immer";

const styles = theme => ({
  list: {
    borderRight: "1px solid " + theme.palette.divider,
    paddingTop: 0
  },
  listItem: {
    backgroundColor: "transparent"
  },
  listItemSelected: {
    backgroundColor: "transparent"
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
    this.setState(
      produce(this.state, draftState => {
        draftState.tags[key] = !draftState.tags[key];
        return draftState;
      })
    );
  };

  calculateTypographyProps = data => {
    if (data.color) {
      return {
        style: {
          color: "black"
        }
      };
    } else {
      return null;
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <List component="nav" className={classes.list}>
        {Object.entries(this.state.tags).map(([name, data]) => (
          <ListItem
            style={{
              backgroundColor: data.color
            }}
            button
            key={name}
            selected={data.selected}
            onClick={() => this.handleListItemClick(name)}
            classes={{
              root: classes.listItem,
              selected: classes.listItemSelected
            }}
          >
            <ListItemText
              primaryTypographyProps={this.calculateTypographyProps(data)}
              primary={name}
            />
          </ListItem>
        ))}
      </List>
    );
  }
}

export default withStyles(styles)(TagsNavigation);

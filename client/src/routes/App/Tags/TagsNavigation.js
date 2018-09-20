import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "./TagsNavigationItem";
import produce from "immer";
import { Query } from "react-apollo";
import { GET_ALL_TAGS } from "../../../components/Tag/queries.js"

const styles = theme => ({
  list: {
    borderRight: "1px solid " + theme.palette.divider,
    paddingTop: 0
  }
});

class TagsNavigation extends Component {
  render() {
    const { id, classes, selected, onTagClick, onTagDoubleClick } = this.props;
    return (
      <List component="nav" className={classes.list}>
        <Query query={GET_ALL_TAGS} variables={{ id: id }}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error!: ${error}`;
            let tags = data.allTags.nodes;
            return tags.map(tag => (
              <ListItem
                button
                key={tag.id}
                selected={selected.has(tag.id)}
                selectedBackgroundColor={tag.color}
                textColor={tag.color}
                selectedTextColor="black"
                onClick={() => onTagClick(tag.id)}
                onDoubleClick={() => onTagDoubleClick(tag.id)}
              >
                {tag.name}
              </ListItem>
            ));
          }}
        </Query>
      </List>
    );
  }
}

TagsNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.instanceOf(Set).isRequired,
  onTagClick: PropTypes.func.isRequired,
  onTagDoubleClick: PropTypes.func.isRequired
};

export default withStyles(styles)(TagsNavigation);

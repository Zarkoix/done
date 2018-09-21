import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import { Query } from "react-apollo";
import { GET_ALL_TAGS } from "../../../../components/Tag/queries.js";
import NewTagButton from "./NewTagButton.js"

import EditTagsItem from "./EditTagsItem";

const styles = theme => ({
  paper: {
    position: "absolute",
    width: "50%",
    marginLeft: "25%",
    marginTop: "20%",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 4,
    outline: "none",
    borderRadius: "16px"
  },
  container: {
    marginTop: theme.spacing.unit
  }
});

class EditTagsModal extends Component {
  render() {
    const { open, onClose, classes } = this.props;
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={onClose}
      >
        <div className={classes.paper}>
          <Typography variant="title" id="modal-title">
            Edit Tags
          </Typography>
          <div className={classes.container}>
            <Query query={GET_ALL_TAGS}>
              {({ loading, error, data }) => {
                if (loading) return null;
                if (error) return `Error!: ${error}`;
                let tags = data.allTags.nodes;
                return tags.map(tag => (
                  <EditTagsItem
                    key={tag.id}
                    id={tag.id}
                    name={tag.name}
                    color={tag.color}
                    editName={() => {}}
                    editColor={() => {}}
                  />
                ));
              }}
            </Query>
          </div>
          <NewTagButton />
        </div>
      </Modal>
    );
  }
}

EditTagsModal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default withStyles(styles)(EditTagsModal);

import React from "react";
import { Query } from "react-apollo";
import AddTagMenu from "./AddTagMenu.js";

import { GET_ALL_TAGS } from "../queries.js"

export default ({ ...props }) => (
  <Query query={GET_ALL_TAGS}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return `Error!: ${error}`;
      const tags = data.allTags.nodes
      return <AddTagMenu tags={tags} {...props} />;
    }}
  </Query>
);

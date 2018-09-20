import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import AddTagMenu from "./AddTagMenu.js";

const GET_ALL_TAGS = gql`
  query {
    allTags {
      nodes {
        name
        color
        id
      }
    }
  }
`;

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

import React from "react";

import { Query } from "react-apollo";

import { GET_JWT } from "../../../auth.js";

export default () => (
  <Query query={GET_JWT}>
    {({ loading, error, data, startPolling, stopPolling }) => {
      if (loading) return null;
      if (error) return `Error!: ${error}`;

      return <p>{data.JWT}</p>;
    }}
  </Query>
);

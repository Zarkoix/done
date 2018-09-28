import React, { PureComponent } from "react";
import { Query } from "react-apollo";

import InboxTodoList from "./InboxTodoList.js";

import { GET_ALL_TODO_IDS } from "../../../queries";

export default () => {
  return (<Query query={GET_ALL_TODO_IDS}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return `Error!: ${error}`;
      return <InboxTodoList nodes={data.allTodos.nodes} />;
    }}
  </Query>)
}

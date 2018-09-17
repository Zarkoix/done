import gql from "graphql-tag";

export const SET_DO_WHEN = gql`
  mutation setDoWhen($id: Int!, $doWhenDate: Date, $doWhenTime: Date) {
    updateTodoById(
      input: {
        id: $id
        todoPatch: { doWhenDate: $doWhenDate, doWhenTime: $doWhenTime }
      }
    ) {
      todo {
        id
        doWhenDate
        doWhenTime
      }
    }
  }
`;

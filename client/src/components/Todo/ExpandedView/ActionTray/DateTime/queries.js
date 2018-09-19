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

export const SET_DO_WHEN_DATE = gql`
  mutation setDoWhen($id: Int!, $doWhenDate: Date) {
    updateTodoById(input: { id: $id, todoPatch: { doWhenDate: $doWhenDate } }) {
      todo {
        id
        doWhenDate
      }
    }
  }
`;

export const SET_DO_WHEN_TIME = gql`
  mutation setDoWhen($id: Int!, $doWhenTime: Date) {
    updateTodoById(input: { id: $id, todoPatch: { doWhenTime: $doWhenTime } }) {
      todo {
        id
        doWhenTime
      }
    }
  }
`;

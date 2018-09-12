import gql from "graphql-tag";

export const GET_JWT = gql`
  {
    JWT @client
  }
`;

const AUTHENTICATE = gql`
  mutation Authenticate($email: String!, $password: String!) {
    authenticate(input: { email: $email, password: $password }) {
      jwtToken
    }
  }
`;

const JWT_CACHE_LOC = 'JWT'

export const jwtFromCache = () => {
  return localStorage.getItem(JWT_CACHE_LOC)
}

export const jwtToCache = (jwt) => {
  localStorage.setItem(JWT_CACHE_LOC, jwt)
}

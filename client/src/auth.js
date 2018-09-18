import gql from "graphql-tag";

export const AUTHENTICATE = gql`
  mutation Authenticate($email: String!, $password: String!) {
    authenticate(input: { email: $email, password: $password }) {
      jwtToken
    }
  }
`;

export const REGISTER = gql`
  mutation Register($email: String!, $pass: String!) {
    registerUser(input: { email: $email, pass: $pass }) {
      clientMutationId
    }
  }
`;

const JWT_CACHE_LOC = "JWT";
const UUID_CACHE_LOC = "userid";

export function getJwt() {
  return localStorage.getItem(JWT_CACHE_LOC);
}

export function getUuid() {
  return localStorage.getItem(UUID_CACHE_LOC);
}

export function isLoggedIn() {
  return Boolean(getJwt(JWT_CACHE_LOC));
}

function getClaims(jwt) {
  return JSON.parse(atob(jwt.split(".")[1]));
}

export function login(jwt) {
  localStorage.setItem(JWT_CACHE_LOC, jwt);
  localStorage.setItem(UUID_CACHE_LOC, getClaims(jwt).user_id);
}

export function logout() {
  localStorage.removeItem(JWT_CACHE_LOC);
  localStorage.removeItem(UUID_CACHE_LOC);
}

import gql from "graphql-tag"

export default gql`
  query GetUserPermissions($email: String!, $permissions: [String!]) {
    userPermissions(email: $email, permissions: $permissions) {
      name
    }
  }
`

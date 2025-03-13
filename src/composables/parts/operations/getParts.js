import gql from "graphql-tag"

export default gql`
  query GetParts {
    parts {
      id
      name
    }
  }
`

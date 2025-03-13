import gql from "graphql-tag"

export default gql`
  query GetCategories {
    categories {
      id
      name
    }
  }
`

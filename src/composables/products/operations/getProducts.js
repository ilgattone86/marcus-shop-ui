import gql from "graphql-tag"

export default gql`
  query GetProducts {
    products {
      id
      name
      description
      category {
        id
        name
      }
      parts {
        id
      }
    }
  }
`

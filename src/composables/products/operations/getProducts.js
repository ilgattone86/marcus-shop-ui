import gql from "graphql-tag"

export default gql`
  query GetAllProducts {
    allProducts {
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

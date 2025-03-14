import gql from "graphql-tag"

export default gql`
  query GetPartOptions($productId: ID) {
    partOptions(productId: $productId) {
      id
      name
      price
      part {
        id
        name
      }
    }
  }
`

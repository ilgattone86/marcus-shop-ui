import gql from "graphql-tag"

export default gql`
  query GetPartOptions($product: ID) {
    partOptions(product: $product) {
      id
      name
      price
      stock
      part {
        id
        name
      }
    }
  }
`

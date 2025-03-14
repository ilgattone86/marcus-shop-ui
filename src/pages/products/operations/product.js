import gql from "graphql-tag"

export default gql`
  query product($product: ID!) {
    product(product: $product) {
      id
      name
      parts {
        id
        name
        partOptions {
          id
          name
        }
      }
    }
  }
`

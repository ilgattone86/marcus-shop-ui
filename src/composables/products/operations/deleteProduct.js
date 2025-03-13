import gql from "graphql-tag"

export default gql`
  mutation DeleteProduct($product: ID!) {
    deleteProduct(product: $product) {
      id
      name
      category {
        id
        name
      }
    }
  }
`

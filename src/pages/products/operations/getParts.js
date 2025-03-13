import gql from "graphql-tag"

export default gql`
  query GetParts($productId: ID!) {
    parts(productId: $productId) {
      id
      name
    }
  }
`

import gql from "graphql-tag"

export default gql`
  query ValidateNewProductPrice($options: [ID!]!) {
    newProductPriceValidation(options: $options) {
      price
      errors
    }
  }
`

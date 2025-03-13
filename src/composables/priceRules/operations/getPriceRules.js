import gql from "graphql-tag"

export default gql`
  query GetPriceRules {
    priceRules {
      id
      priceAdjustment
      baseOption {
        id
        name
      }
      dependentOption {
        id
        name
      }
    }
  }
`

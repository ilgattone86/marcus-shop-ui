import gql from "graphql-tag"

export default gql`
  mutation CreatePriceRule($priceAdjustment: Float!, $baseOption: ID!, $dependentOption: ID!) {
    createPriceRule(priceAdjustment: $priceAdjustment, baseOption: $baseOption, dependentOption: $dependentOption) {
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

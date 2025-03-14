import gql from "graphql-tag"

export default gql`
  mutation EditPriceRule($priceRule: ID!, $priceAdjustment: Float!, $baseOption: ID!, $dependentOption: ID!) {
    editPriceRule(priceRule: $priceRule, baseOption: $baseOption, dependentOption: $dependentOption, priceAdjustment: $priceAdjustment) {
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

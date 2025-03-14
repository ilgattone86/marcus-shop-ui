import gql from "graphql-tag"

export default gql`
  mutation DeletePriceRule($priceRule: ID!) {
    deletePriceRule(priceRule: $priceRule) {
      id
    }
  }
`

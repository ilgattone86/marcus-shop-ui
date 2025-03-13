import gql from "graphql-tag"

export default gql`
  mutation EditPriceRule($restriction: ID!, $dependentOption: ID!, $blockedOption: ID!) {
    editPriceRule(restriction: $restriction, dependentOption: $dependentOption, blockedOption: $blockedOption) {
      id
      dependentOption {
        id
        name
      }
      blockedOption {
        id
        name
      }
    }
  }
`

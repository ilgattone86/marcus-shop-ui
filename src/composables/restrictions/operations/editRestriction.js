import gql from "graphql-tag"

export default gql`
  mutation EditRestriction($restriction: ID!, $dependentOption: ID!, $blockedOption: ID!) {
    editRestriction(restriction: $restriction, dependentOption: $dependentOption, blockedOption: $blockedOption) {
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

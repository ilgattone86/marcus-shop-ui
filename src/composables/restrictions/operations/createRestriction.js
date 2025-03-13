import gql from "graphql-tag"

export default gql`
  mutation CreateRestriction($dependentOption: ID!, $blockedOption: ID!) {
    createRestriction(dependentOption: $dependentOption, blockedOption: $blockedOption) {
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

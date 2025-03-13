import gql from "graphql-tag"

export default gql`
  query GetRestrictions($partOption: ID) {
    restrictions(partOption: $partOption) {
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

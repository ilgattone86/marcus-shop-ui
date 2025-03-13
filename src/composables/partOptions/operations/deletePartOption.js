import gql from "graphql-tag"

export default gql`
  mutation DeletePartOption($partOption: ID!) {
    deletePartOption(partOption: $partOption) {
      id
    }
  }
`

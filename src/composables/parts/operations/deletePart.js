import gql from "graphql-tag"

export default gql`
  mutation DeletePart($part: ID!) {
    deletePart(part: $part) {
      id
    }
  }
`

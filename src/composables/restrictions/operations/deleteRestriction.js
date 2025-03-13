import gql from "graphql-tag"

export default gql`
  mutation DeleteRestriction($restriction: ID!) {
    deleteRestriction(restriction: $restriction) {
      id
    }
  }
`

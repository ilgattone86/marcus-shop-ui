import gql from "graphql-tag"

export default gql`
  mutation EditPart($part: ID!, $name: String!) {
    editPart(part: $part, name: $name) {
      id
      name
    }
  }
`

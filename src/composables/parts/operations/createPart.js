import gql from "graphql-tag"

export default gql`
  mutation CreatePart($name: String!) {
    createPart(name: $name) {
      id
      name
    }
  }
`

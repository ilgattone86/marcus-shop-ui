import gql from "graphql-tag"

export default gql`
  mutation CreatePartOption($name: String!, $price: Float!, $part: ID!) {
    createPartOption(name: $name, price: $price, part: $part) {
      id
      name
    }
  }
`

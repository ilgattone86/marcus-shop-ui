import gql from "graphql-tag"

export default gql`
  mutation EditPartOption($partOption: ID!, $name: String!, $price: Float!, $part: ID!) {
    editPartOption(partOption: $partOption, name: $name, price: $price, part: $part) {
      id
      name
      price
      part {
        id
        name
      }
    }
  }
`

import gql from "graphql-tag"

export default gql`
  mutation EditPartOption($partOption: ID!, $name: String!, $price: Float!, $part: ID!, $stock: Boolean!) {
    editPartOption(partOption: $partOption, name: $name, price: $price, part: $part, stock: $stock) {
      id
      name
      price
      stock
      part {
        id
        name
      }
    }
  }
`

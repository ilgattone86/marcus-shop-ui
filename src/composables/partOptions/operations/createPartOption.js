import gql from "graphql-tag"

export default gql`
  mutation CreatePartOption($name: String!, $price: Float!, $part: ID!, $stock: Boolean!) {
    createPartOption(name: $name, price: $price, part: $part, stock: $stock) {
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

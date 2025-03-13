import gql from "graphql-tag"

export default gql`
  mutation EditProduct($product: ID!, $name: String!, $description: String, $category: ID!) {
    editProduct(product: $product, name: $name, description: $description, category: $category) {
      id
      name
      description
      category {
        id
        name
      }
    }
  }
`

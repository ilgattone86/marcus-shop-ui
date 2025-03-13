import gql from "graphql-tag"

export default gql`
  mutation CreateProduct($name: String!, $description: String, $category: ID!) {
    createProduct(name: $name, description: $description, category: $category) {
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

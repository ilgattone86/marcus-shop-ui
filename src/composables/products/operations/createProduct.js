import gql from "graphql-tag"

export default gql`
  mutation CreateProduct($name: String!, $description: String, $category: ID!, $parts: [ID!]!) {
    createProduct(name: $name, description: $description, category: $category, parts: $parts) {
      id
      name
      description
      category {
        id
        name
      }
      parts {
        id
      }
    }
  }
`

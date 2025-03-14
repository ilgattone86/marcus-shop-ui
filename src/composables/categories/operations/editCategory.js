import gql from "graphql-tag"

export default gql`
  mutation EditCategory($category: ID!, $name: String!) {
    editCategory(category: $category, name: $name) {
      id
      name
    }
  }
`

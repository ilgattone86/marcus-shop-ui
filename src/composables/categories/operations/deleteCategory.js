import gql from "graphql-tag"

export default gql`
  mutation DeleteCategory($category: ID!) {
    deleteCategory(category: $category) {
      id
    }
  }
`

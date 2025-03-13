import gql from "graphql-tag"

export default gql`
  mutation EditCategory($id: ID!, $name: String!) {
    editCategory(id: $id, name: $name) {
      id
      name
    }
  }
`

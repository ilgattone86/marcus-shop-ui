import gql from "graphql-tag"

export default gql`
  query GetProducts {
    products(first: 20) {
      edges {
        node {
          id
          name
          description
          category {
            name
          }
        }
      }
    }
  }
`

import { ApolloClient, InMemoryCache } from "@apollo/client/core"

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:3001/graphql",
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
    },
    query: {
      fetchPolicy: "no-cache",
    },
  },
})

export default apolloClient

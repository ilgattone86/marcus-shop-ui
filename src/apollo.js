import { ApolloClient, InMemoryCache } from "@apollo/client/core"

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:3001/graphql",
})

export default apolloClient

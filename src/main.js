// Libraries
import { createApp, h, provide } from "vue"
import { DefaultApolloClient } from "@vue/apollo-composable"
import OhVueIcon from "./icon"
import { router } from "./routes"
import apolloClient from "./apollo"
// Css
import "./assets/main.css"
// Components
import App from "./App.vue"

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

app.use(router).component("v-icon", OhVueIcon).mount("#app")

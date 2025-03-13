import "./assets/main.css"

import { createApp, h, provide } from "vue"
import App from "./App.vue"
import { DefaultApolloClient } from "@vue/apollo-composable"
import { OhVueIcon, addIcons } from "oh-vue-icons"
import { PrSpinner, MdKeyboardarrowdownRound, IoWarning, IoCloseCircle, BiBicycle, BiLockFill, BiUnlockFill, MdEditRound, MdDeleteRound } from "oh-vue-icons/icons"
import { router } from "./routes"
import apolloClient from "./apollo"

addIcons(PrSpinner, MdKeyboardarrowdownRound, IoWarning, IoCloseCircle, BiBicycle, BiLockFill, BiUnlockFill, MdEditRound, MdDeleteRound)

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

app.use(router).component("v-icon", OhVueIcon).mount("#app")

import { createWebHistory, createRouter } from "vue-router"

import ProductsView from "@/pages/products/index.vue"
import NewProductModal from "@/pages/products/NewProductModal.vue"
import SettingsView from "@/pages/settings/index.vue"

const routes = [
  { path: "/", redirect: { name: "products" } },
  { path: "/products", name: "products", component: ProductsView, children: [{ path: "/products/:id", name: "product", component: NewProductModal }] },
  { path: "/settings", name: "settings", component: SettingsView },
  { path: "/settings2", name: "settings2", component: SettingsView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { router, routes }

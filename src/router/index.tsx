import Layout from "../layout"
import SubReact from "../pages/react"
import SubVue from "../pages/vue"
import Home from "../pages/home"

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        // path: "home",
        index: true,
        element: <Home />
      },
      {
        path: "react",
        element: <SubReact />
      },
      {
        path: "vue",
        element: <SubVue />
      }
    ]
  }
]

export default routes

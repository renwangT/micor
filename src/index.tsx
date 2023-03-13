import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import WujieReact from "wujie-react"
// import { bus, setupApp, preloadApp, startApp, destroyApp } from "wujie";
const { setupApp, preloadApp, bus } = WujieReact
const map = {
  "//localhost:7100/": "//wujie-micro.github.io/demo-react17/",
  "//localhost:7200/": "//wujie-micro.github.io/demo-vue2/",
  "//localhost:7300/": "//wujie-micro.github.io/demo-vue3/",
  "//localhost:7400/": "//wujie-micro.github.io/demo-angular12/",
  "//localhost:7500/": "//wujie-micro.github.io/demo-vite/",
  "//localhost:7600/": "//wujie-micro.github.io/demo-react16/",
  "//localhost:7700/": "//wujie-micro.github.io/demo-main-react/",
  "//localhost:8000/": "//wujie-micro.github.io/demo-main-vue/"
}

function hostMap(host: keyof typeof map) {
  if (process.env.NODE_ENV === "production") return map[host]
  return host
}
function credentialsFetch(url: RequestInfo, options?: RequestInit) {
  return window.fetch(url, { ...options, credentials: "omit" })
}
const degrade =
  window.localStorage.getItem("degrade") === "true" ||
  !window.Proxy ||
  !window.CustomElementRegistry

const lifecycles = {
  beforeLoad: (appWindow: Window) =>
    console.log(`${appWindow.__WUJIE.id} beforeLoad 生命周期`),
  beforeMount: (appWindow: Window) =>
    console.log(`${appWindow.__WUJIE.id} beforeMount 生命周期`),
  afterMount: (appWindow: Window) =>
    console.log(`${appWindow.__WUJIE.id} afterMount 生命周期`),
  beforeUnmount: (appWindow: Window) =>
    console.log(`${appWindow.__WUJIE.id} beforeUnmount 生命周期`),
  afterUnmount: (appWindow: Window) =>
    console.log(`${appWindow.__WUJIE.id} afterUnmount 生命周期`),
  activated: (appWindow: Window) =>
    console.log(`${appWindow.__WUJIE.id} activated 生命周期`),
  deactivated: (appWindow: Window) =>
    console.log(`${appWindow.__WUJIE.id} deactivated 生命周期`),
  loadError: (url: string, e: Error) => console.log(`${url} 加载失败`, e)
}

setupApp({
  name: "react17",
  url: hostMap("//localhost:7100/"),
  // attrs,
  exec: true,
  alive: true,
  fetch: credentialsFetch,
  degrade,
  ...lifecycles
})

setupApp({
  name: "vue2",
  url: hostMap("//localhost:7200/"),
  // attrs,
  exec: true,
  fetch: credentialsFetch,
  degrade,
  ...lifecycles
})

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

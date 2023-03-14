import { cacheOptions } from "wujie"

const map = {
  "//localhost:3001/": "",
  "//localhost:5173/": "",
  "//localhost:7100/": "//wujie-micro.github.io/demo-react17/",
  "//localhost:7200/": "//wujie-micro.github.io/demo-vue2/",
  "//localhost:7300/": "//wujie-micro.github.io/demo-vue3/",
  "//localhost:7400/": "//wujie-micro.github.io/demo-angular12/",
  "//localhost:7500/": "//wujie-micro.github.io/demo-vite/",
  "//localhost:7600/": "//wujie-micro.github.io/demo-react16/",
  "//localhost:7700/": "//wujie-micro.github.io/demo-main-react/",
  "//localhost:8000/": "//wujie-micro.github.io/demo-main-vue/"
}

export function hostMap(host: keyof typeof map) {
  if (process.env.NODE_ENV === "production") return map[host]
  return host
}

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

function credentialsFetch(url: RequestInfo, options?: RequestInit) {
  return window.fetch(url, { ...options, credentials: "omit" })
}
const degrade =
  window.localStorage.getItem("degrade") === "true" ||
  !window.Proxy ||
  !window.CustomElementRegistry

export type TSonIds = "react" | "vue"
type TSonApp = Record<TSonIds, cacheOptions>

const sonAppConfig: TSonApp = {
  react: {
    name: "react",
    url: hostMap("//localhost:3001/"),
    exec: true,
    sync: true,
    alive: true,
    fetch: credentialsFetch,
    ...lifecycles
  },
  vue: {
    name: "vue",
    url: hostMap("//localhost:5173/"),
    exec: true,
    sync: true,
    alive: true,
    fetch: credentialsFetch,
    degrade,
    ...lifecycles
  }
}

export default sonAppConfig

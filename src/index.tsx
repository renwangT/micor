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
import sonAppConfig, { TSonIds } from "./sonApplicationConfig"
import { preOptions } from "wujie"
const { setupApp, preloadApp } = WujieReact

const preloadApps: Array<preOptions> = []

for (let k in sonAppConfig) {
  const config = sonAppConfig[k as TSonIds]
  setupApp(config)
  if (config.exec && config.url) {
    const { name, url } = config
    preloadApps.push({ name, url })
  }
}

preloadApps.forEach(config => preloadApp(config))

// startApp({ name: "react" })

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

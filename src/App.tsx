// import React from "react";
import { useRoutes } from "react-router-dom"
// import logo from "./logo.svg";
import "./App.css"
import routes from "./router"

function App() {
  return useRoutes(routes)
}

export default App

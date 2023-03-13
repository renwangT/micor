import { Wujie } from "wujie-react"

declare global {
  interface Window {
    __WUJIE: Wujie
  }
}

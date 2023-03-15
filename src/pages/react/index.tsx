import { useLocation } from "react-router-dom"
import WujieReact from "wujie-react"
import sonAppConfig from "../../sonApplicationConfig"

const { url, name } = sonAppConfig["react"]
const SubReact = () => {
  const location = useLocation()
  const path = location.pathname
    .replace("/react17-sub", "")
    .replace("/react17", "") ////

  return (
    // 单例模式，name相同则复用一个无界实例，改变url则子应用重新渲染实例到对应路由
    <WujieReact width="100%" height="100%" url={url} name={name} sync={!path} />
  )
}

export default SubReact

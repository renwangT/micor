import { useNavigate } from "react-router-dom"
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles"

import MuiDrawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"

import { HomeIcon, VueIcon, ReactIcon } from "../components/icons"

const openedMixin = (theme: Theme & { drawerwidth: number }): CSSObject => ({
  width: theme.drawerwidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
})

const closedMixin = (theme: Theme & { drawerwidth: number }): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
})

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== "open"
})<{ drawerwidth: number }>(({ theme, open, drawerwidth }) => ({
  width: drawerwidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin({ ...theme, drawerwidth }),
    "& .MuiDrawer-paper": openedMixin({ ...theme, drawerwidth })
  }),
  ...(!open && {
    ...closedMixin({ ...theme, drawerwidth }),
    "& .MuiDrawer-paper": closedMixin({ ...theme, drawerwidth })
  })
}))

interface SideBarProps {
  open: boolean
  drawerwidth: number
  onDrawerClose: () => void
  drawerHeader: React.JSXElementConstructor<{
    children: React.ReactNode | null | undefined
  }>
}

const menuConfig = [
  {
    label: "Home",
    path: "/",
    key: "home",
    icon: <HomeIcon />
  },
  {
    label: "React Son",
    key: "react",
    path: "react",
    icon: <ReactIcon />
  },
  {
    label: "Vue Son",
    key: "vue",
    path: "vue",
    icon: <VueIcon />
  }
]

const SideBar: React.FC<SideBarProps> = ({
  open,
  onDrawerClose,
  drawerwidth,
  drawerHeader: DrawerHeader
}) => {
  const theme = useTheme()
  const navigate = useNavigate()

  const handleClickMenu = (path: string) => {
    navigate(path)
  }

  return (
    <Drawer variant="permanent" open={open} drawerwidth={drawerwidth}>
      <DrawerHeader>
        <IconButton onClick={onDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {menuConfig.map((item, index) => (
          <ListItem key={item.key} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => handleClickMenu(item.path)}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center"
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center"
                }}
              >
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Drawer>
  )
}

export default SideBar

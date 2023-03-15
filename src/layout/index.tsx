import React from "react"
import { Outlet } from "react-router-dom"
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"

import Header from "./Header"
import SideBar from "./SideBar"

const drawerWidth = 240

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}))

export default function Layout() {
  const [open, setOpen] = React.useState(false)

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header
        drawerwidth={drawerWidth}
        open={open}
        onDrawerOpen={handleDrawerOpen}
      />
      <SideBar
        drawerwidth={drawerWidth}
        onDrawerClose={handleDrawerClose}
        open={open}
        drawerHeader={({ children }) => <DrawerHeader>{children}</DrawerHeader>}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  )
}

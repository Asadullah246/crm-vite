import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import logo from "../assets/lifeLogo.svg"

const drawerWidth = 240;

function Dashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [tab, setTab] = React.useState("Dashboard");

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div style={{ backgroundColor: "#F4F7FB" }} className="mainMenu">
      {/* <Toolbar style={{ backgroundColor: "#F4F7FB" }} /> */}
      {/* <Divider style={{  backgroundColor:"#F4F7FB"}} /> */}
     <div style={{paddingLeft:"32px", paddingTop:"20px", display:"flex", alignItems:"center", gap:"10px", marginBottom:"20px"}}>
      <img src={logo} alt="Logo" style={{height:40, width: "auto"}} />
     <Typography variant="h6" component="h6" style={{fontWeight:600}} >
        Heating4Life
      </Typography>
     </div>
      <List>
        {["Dashboard", "Customer", "Invoice","welcome-template", "Payments"].map((text, index) => (
          <Link to={text == "Dashboard" ? "/" : text} key={text} style={{padding:0}}>
            <ListItem  style={{paddingTop:5, paddingBottom:5}}>
              <ListItemButton  style={{paddingTop:0, paddingBottom:0, gap:0}}>
                <ListItemIcon style={{fontSize:"0.7em !important"}}>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text}  style={{fontSize:"0.7em !important"}}/>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      {/* <Divider /> */}
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", backgroundColor: "#F4F7FB" }}>


      <CssBaseline style={{ backgroundColor: "#F4F7FB" }} />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: { xs: "block", sm: "none" },
          backgroundColor: "#F4F7FB",
        }}
      >
        <Toolbar style={{ backgroundColor: "#F4F7FB" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Heating4Life
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            backgroundColor: "#F4F7FB",
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            backgroundColor: "#F4F7FB",
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "#F4F7FB",
        }}
      >
        <Toolbar />

        <Outlet />
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default Dashboard;

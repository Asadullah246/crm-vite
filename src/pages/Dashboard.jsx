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
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import logo from "../assets/amsi-logo.png";
import Badge from "@mui/joy/Badge";
import { Button } from "@mui/joy";
import { getData } from "../others/api";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";


import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PaymentIcon from '@mui/icons-material/Payment';
import Person2Icon from '@mui/icons-material/Person2';
import ReceiptIcon from '@mui/icons-material/Receipt';

const drawerWidth = 240;

function Dashboard(props) {
  const { window } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [tab, setTab] = React.useState("Dashboard");

  const [customers, setCustomers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [old, setOld] = React.useState([]);

  // Fetch data on component mount
  React.useEffect(() => {
    setLoading(true);
    getData("/customer")
      .then((response) => {
        setCustomers(response?.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [refresh]);

  React.useEffect(() => {
    const currentDate = new Date();

    // Function to filter and sort customers
    const filterAndSortCustomers = (data) => {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(currentDate.getMonth() - 3);

      // Filter customers with startingDate 3 months or more before the current date
      const filteredCustomers = data?.filter((customer) => {
        const startingDate = new Date(customer.startingDate);
        return startingDate <= threeMonthsAgo;
      });

      // Sort customers by the distance of startingDate from the current date
      filteredCustomers?.sort((a, b) => {
        return new Date(a.startingDate) - new Date(b?.startingDate);
      });

      return filteredCustomers;
    };

    // Get the filtered and sorted customer data
    if(customers?.length>0){
      const sortedCustomers = filterAndSortCustomers(customers);
      setOld(sortedCustomers);
    }

  }, [customers]);

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
  const handleLogout = () => {
   localStorage.removeItem("jwtToken");
   localStorage.removeItem("userRole");
   navigate("/signup"); 
  };

  const drawer = (
    <div style={{ backgroundColor: "#F4F7FB" }} className="mainMenu">
      {/* <Toolbar style={{ backgroundColor: "#F4F7FB" }} /> */}


      <div
        style={{
          paddingLeft: "32px",
          paddingTop: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <img src={logo} alt="Logo" style={{ height: 40, width: "auto" }} />
        <Typography variant="h6" component="h6" style={{ fontWeight: 600 }}>
          AMSI
        </Typography>
      </div>
      <Divider style={{  backgroundColor:"#F4F7FB", marginBottom:"20px"}} />
      <List>
        {["Dashboard", "Customer","product", "Invoice", "Template","payments","Signature","Profile"].map(
          (text, index) => {
            const route = text === "Dashboard" ? "/" : `/${text}`;
            const isActive = location.pathname === route;

            return    (
              <Link
                to={text == "Dashboard" ? "/" : text}
                key={text}
                style={{ padding: 0 }}
              >
                <ListItem  style={{ paddingTop: 5, paddingBottom: 5,    }}>
                  <ListItemButton
                    sx={{ paddingTop: "1px", paddingBottom: "1px", gap: 1, backgroundColor: isActive ? "#0B6BCB" : "", color: isActive ? "white" : "black",  "&:hover": {
                      backgroundColor: isActive ? "#0B6BCB" : "#0B6BCB", color:"white"
                    },
                    "&:hover .MuiListItemIcon-root": {
                      color: "white",
                    },
                     borderRadius:"7px" }}
                     className="menuItem"
                  >
                    <ListItemIcon sx={{ color: isActive ? "white" : "black", }}>
                      {index === 0 && <DashboardIcon /> }
                      {index === 1 && <PeopleAltIcon /> }
                      {index === 2 && <ProductionQuantityLimitsIcon /> }
                      {index === 3 && <PaymentIcon /> }
                      {index === 4 && <Person2Icon /> }
                      {index === 5 && <ReceiptIcon /> }
                      {index === 6 && <ReceiptIcon /> }
                      {index === 7 && <ReceiptIcon /> }
                    </ListItemIcon>
                    <ListItemText
                      primary={text}
                      style={{ fontSize: "0.7em !important" }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            )
          }

        )}
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
          display: {
            xs: "block",
            // sm: "none"
          },
          backgroundColor: "#F4F7FB",
        }}
      >
        <Toolbar style={{ backgroundColor: "#F4F7FB", boxShadow: "none" }}>
          <div style={{ width: "100%" }} className="normalFlexWithSpaceBetween">
            <div>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: {sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>

              <Typography
                variant="h4"
                noWrap
                style={{ color: "#FE6F28" }}
                component="div"
              >
                Hi, Asadullah
              </Typography>
            </div>
            <div
              className="normalFlex gap-15"
              style={{ color: "black", gap: "10px" }}
            >
              <Dropdown>
                <MenuButton
                slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
                sx={{border:"none" }}
                >
                <Badge badgeContent={old?.length} variant="soft">
                <Typography sx={{ fontSize: "xl" }}>💌</Typography>
              </Badge>
                </MenuButton>
                <Menu style={{maxHeight:"70vh", overflow:"auto",  borderRadius:"10px", padding:"20px"}}>
                  {
                    old?.map((c,index)=>{
                      return (
                        <MenuItem key={index} sx={{borderBottom:"1px solid #D6D9DC", fontWeight:c?.freeSR?"400":"700"}}>{c?.name}, {c?.startingDate}</MenuItem>
                      )
                    })
                  }

                </Menu>
              </Dropdown>


              <Button onClick={handleLogout} variant="soft">Log out</Button>
            </div>
          </div>
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
          paddingTop: "50px",
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

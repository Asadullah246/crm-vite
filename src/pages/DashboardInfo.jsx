import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Typography } from "@mui/material";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import { useNavigate } from "react-router-dom";
import { Box, Grid } from "@mui/joy";
import ChartsOverviewDemo from "../component/Datachart";
import BasicPie from "../component/DataPieChart";

const DashboardInfo = () => {
    const navigate=useNavigate();
  return (
    <div>
      <div className="content-topbar">
        <div className="content-title">
          <ArrowBackIcon />
          <Typography
            variant="h6"
            component="h6"
            style={{ fontWeight: "bold" }}
          >
            Good Morning, Admin
          </Typography>
        </div>
        <div className="content-title">
          <Input size="md" placeholder="Search" />;
          <Button
            size="md"
            variant={"solid"}
            color="primary"
            onClick={()=>navigate("/customer")}
          >
            Customers
          </Button>
          {/* <Button size="md" variant={"solid"} color="primary"  onClick={()=>toggleDrawer("right", true)}>
            {"right"}
          </Button> */}
        </div>
      </div>


        {/* <Typography variant="h6">Section 1</Typography> */}
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3} >
            <div style={{backgroundColor:"#7A40F2",padding:"30px 25px", borderRadius:"12px"}}>
            <p style={{margin:"0", padding:"0", color:"white"}}>Customers</p>
           <h2 style={{margin:"0", padding:"0", color:"white", fontSize:"2.5em"}}>20</h2>
            </div>
          </Grid>
          {/* <Grid item xs={12} sm={3} >
            <div style={{backgroundColor:"#FF9060",padding:"30px 25px", borderRadius:"12px"}}>
            <p style={{margin:"0", padding:"0", color:"white"}}>Active customers</p>
           <h2 style={{margin:"0", padding:"0", color:"white", fontSize:"2.5em"}}>$1000</h2>
            </div>
          </Grid> */}
          {/* <Grid item xs={12} sm={3} >
            <div style={{backgroundColor:"#3ACBE9",padding:"30px 25px", borderRadius:"12px"}}>
            <p style={{margin:"0", padding:"0", color:"white"}}>Last Year</p>
           <h2 style={{margin:"0", padding:"0", color:"white", fontSize:"2.5em"}}>$30000</h2>
            </div>
          </Grid> */}
          <Grid item xs={12} sm={3} >
            <div style={{backgroundColor:"#48C99D",padding:"30px 25px", borderRadius:"12px"}}>
            <p style={{margin:"0", padding:"0", color:"white"}}>Packages</p>
           <h2 style={{margin:"0", padding:"0", color:"white", fontSize:"2.5em"}}>2</h2>
            </div>
          </Grid>


        </Grid>
        <div style={{marginTop:"60px"}}></div>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} >
            <ChartsOverviewDemo/>
          </Grid>
          <Grid item xs={12} sm={6} >
            <BasicPie/>
          </Grid>


        </Grid>



    </div>
  );
};

export default DashboardInfo;

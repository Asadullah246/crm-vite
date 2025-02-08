import * as React from "react";
import { Grid } from "@mui/joy";
import ChartsOverviewDemo from "../component/Datachart";
import BasicPie from "../component/DataPieChart";
import { getData } from "../others/api";
import CustomerOrders from "../component/CustomerOrders";

function CustomerDashboard() {
  const [orders, setOrders] = React.useState();
  const [user, setUser] = React.useState();
  const [paymentInfo, setPaymentInfo] = React.useState();
  const [total, setTotal]=React.useState(0);
  const [loading, setLoading]=React.useState(false);
  const [person, setPerson]=React.useState();

  React.useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem("user"));
    setUser(getUser);
  }, []);

  React.useEffect(() => {
    //   setLoading(true);
    getData(`transaction/${user?._id}`)
      .then((response) => {
        setOrders(response?.data);
        //   setLoading(false);
      })
      .catch((error) => {
        // setLoading(false)
        console.log("err", error);
      });
  }, [user]);



    React.useEffect(() => {
      const controller = new AbortController();
      setLoading(true);

      const handleForm = async () => {
        try {
          const result = await getData(`/customer/paymentInfo/${user?._id}`, {
            signal: controller.signal,
          });
          console.log("Customer info", result?.data);

          if (result.status == "success") {
            setPerson(result?.data?.user);
            const totalAmount = result?.data?.dues?.reduce((accumulator, currentItem) => {
              return accumulator + currentItem.totalAmountDue;
            }, 0);
            setTotal(totalAmount);
            setPaymentInfo(result?.data?.dues);
          }
          setLoading(false);
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error("Error fetching data:", error);
            setLoading(false);
          }
        }
      };

      handleForm();

      return () => controller.abort(); // Cleanup: cancels the request when unmounted
    }, [user]);


  return (
    <div>

      {/* <Typography variant="h6">Section 1</Typography> */}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={3}>
          <div
            style={{
              backgroundColor: "#7A40F2",
              padding: "30px 25px",
              borderRadius: "12px",
            }}
          >
            <p style={{ margin: "0", padding: "0", color: "white" }}>Orders</p>
            <h2
              style={{
                margin: "0",
                padding: "0",
                color: "white",
                fontSize: "2.5em",
              }}
            >
              {orders?.length || 0}
            </h2>
          </div>
        </Grid>
        <Grid item xs={12} sm={3} >
            <div style={{backgroundColor:"#FF9060",padding:"30px 25px", borderRadius:"12px"}}>
            <p style={{margin:"0", padding:"0", color:"white"}}>Total Duo</p>
           <h2 style={{margin:"0", padding:"0", color:"white", fontSize:"2.5em"}}>${total}</h2>
            </div>
          </Grid>
        {/* <Grid item xs={12} sm={3} >
            <div style={{backgroundColor:"#3ACBE9",padding:"30px 25px", borderRadius:"12px"}}>
            <p style={{margin:"0", padding:"0", color:"white"}}>Last Year</p>
           <h2 style={{margin:"0", padding:"0", color:"white", fontSize:"2.5em"}}>$30000</h2>
            </div>
          </Grid>
        <Grid item xs={12} sm={3}>
          <div
            style={{
              backgroundColor: "#48C99D",
              padding: "30px 25px",
              borderRadius: "12px",
            }}
          >
            <p style={{ margin: "0", padding: "0", color: "white" }}>
              Packages
            </p>
            <h2
              style={{
                margin: "0",
                padding: "0",
                color: "white",
                fontSize: "2.5em",
              }}
            >
              2
            </h2>
          </div>
        </Grid> */}
      </Grid>
      <div style={{ marginTop: "60px" }}>
        <h3>Recent Transactions</h3>
         <CustomerOrders header={false} />

      </div>
      {/* <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <ChartsOverviewDemo />
        </Grid>
        <Grid item xs={12} sm={6}>
          <BasicPie />
        </Grid>
      </Grid> */}
    </div>
  );
}

export default CustomerDashboard;

import * as React from "react";
import { Grid } from "@mui/joy";
import ChartsOverviewDemo from "../component/Datachart";
import BasicPie from "../component/DataPieChart";
import { getData } from "../others/api";
import AllOrders from "../component/AllOrders";

function AdminDashboard() {
  const [data, setData] = React.useState([]);
  const [transaction, setTransaction] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [dues, setDues] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true; // To track if the component is still mounted
    setLoading(true);

    const handleForm = async () => {
      try {
        const result = await getData("customer");
        setData(result?.data);
        if (isMounted) setLoading(false);
      } catch (error) {
        console.error("Error creating data:", error);
        if (isMounted) setLoading(false);
      }
    };
    const handleForm2 = async () => {
      try {
        const result = await getData("transaction");
        setTransaction(result?.data);
        if (isMounted) setLoading(false);
      } catch (error) {
        console.error("Error creating data:", error);
        if (isMounted) setLoading(false);
      }
    };
    const handleForm3 = async () => {
      try {
        const result = await getData("product");
        setProducts(result?.data);
        if (isMounted) setLoading(false);
      } catch (error) {
        console.error("Error creating data:", error);
        if (isMounted) setLoading(false);
      }
    };

    handleForm();
    handleForm2();
    handleForm3();


    return () => {
      isMounted = false; // Cleanup flag when component unmounts
    };
  }, [refresh]);

  React.useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    const handleForm = async () => {
      try {
        const result = await getData(`/customer/grandTotal/amount`, {
          signal: controller.signal,
        });
        console.log("Customer info", result);
        if (result.status == "success") {
          setDues(result?.totalDueAmount);
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
  }, []);

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
            <p style={{ margin: "0", padding: "0", color: "white" }}>
              Customers
            </p>
            <h2
              style={{
                margin: "0",
                padding: "0",
                color: "white",
                fontSize: "2.5em",
              }}
            >
              {data?.length || 0}
            </h2>
          </div>
        </Grid>
        <Grid item xs={12} sm={3}>
          <div
            style={{
              backgroundColor: "#FF9060",
              padding: "30px 25px",
              borderRadius: "12px",
            }}
          >
            <p style={{ margin: "0", padding: "0", color: "white" }}>
              Total Transactions
            </p>
            <h2
              style={{
                margin: "0",
                padding: "0",
                color: "white",
                fontSize: "2.5em",
              }}
            >
              {transaction?.length || 0}
            </h2>
          </div>
        </Grid>
        <Grid item xs={12} sm={3}>
          <div
            style={{
              backgroundColor: "#3ACBE9",
              padding: "30px 25px",
              borderRadius: "12px",
            }}
          >
            <p style={{ margin: "0", padding: "0", color: "white" }}>
              Total Products
            </p>
            <h2
              style={{
                margin: "0",
                padding: "0",
                color: "white",
                fontSize: "2.5em",
              }}
            >
              {" "}
              {products?.length || 0}
            </h2>
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
              Total Due
            </p>
            <h2
              style={{
                margin: "0",
                padding: "0",
                color: "white",
                fontSize: "2.5em",
              }}
            >
              ${dues}
            </h2>
          </div>
        </Grid>
      </Grid>
        <div style={{ marginTop: "60px" }}>
              <h3>Recent Transactions</h3>
               <AllOrders header={false} />

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

export default AdminDashboard;

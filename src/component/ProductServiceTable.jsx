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
import { deleteData, getData } from "../others/api";
import DropdownForCustomer from "./DropdownForCustomer";
import { useNavigate } from "react-router-dom";
import AddNewProduct from "./AddNewProduct";
import EditProduct from "./EditProduct";
import toastSuccess from "./Alert";

export default function ProductServiceTable() {
  const navigate = useNavigate();
  const [state, setState] = React.useState(false);
  const [editState, setEditState] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [product, setProduct] = React.useState({});

  // Fetch data on component mount
  React.useEffect(() => {
    let isMounted = true; // To track if the component is still mounted
    setLoading(true);

    const handleForm = async () => {
      try {
        const result = await getData("product");
        console.log("products are", result?.data);
        setData(result?.data);
        if (isMounted) setLoading(false);
      } catch (error) {
        console.error("Error creating data:", error);
        if (isMounted) setLoading(false);
      }
    };

    handleForm();

    return () => {
      isMounted = false; // Cleanup flag when component unmounts
    };
  }, [refresh]);





  const toggleDrawer = (inOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(inOpen);
  };
  const toggleDrawerEdit = (inOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setEditState(inOpen);
  };

  const deleteItem = (id) => {
    deleteData(`/product/${id}`)
      .then(() => {
        setRefresh(!refresh)
        toastSuccess("Successfully deleted")

      });
  };

  return (
    <div>
      <AddNewProduct
        state={state}
        setState={setState}
        toggleDrawer={toggleDrawer}
        refresh={refresh}
        setRefresh={setRefresh}
      ></AddNewProduct>


      <EditProduct
        editState={editState}
        setEditState={setEditState}
        toggleDrawerEdit={toggleDrawerEdit}
        product={product}
        refresh={refresh}
        setRefresh={setRefresh}
      ></EditProduct>




      <div className="content-topbar">
        <div className="content-title">
          <ArrowBackIcon style={{cursor:"pointer" }}  onClick={() => navigate(-1)} />
          <Typography
            variant="h6"
            component="h6"
            style={{ fontWeight: "bold" }}
          >
            Product/Services
          </Typography>
        </div>
        <div className="content-title">
          {/* <Input size="md" placeholder="Search" /> */}
          <Button
            size="md"
            variant={"solid"}
            color="primary"
            onClick={toggleDrawer(true)}
          >
            Add New
          </Button>
          {/* <Button
            size="md"
            variant={"outlined"}
            color="primary"
            onClick={() => navigate("/upload-customer")}
          >
            Upload
          </Button> */}
          {/* <Button size="md" variant={"solid"} color="primary"  onClick={()=>toggleDrawer("right", true)}>
            {"right"}
          </Button> */}
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: "100%", width: "100%" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              {/* <TableCell>ID</TableCell> */}
              <TableCell>Name</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">One Time Payment.</TableCell>
              <TableCell align="right">Subscription Fee</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Manage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <TableRow
                key={row?._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.name}
                </TableCell>
                {/* <TableCell align="right">{row?.name}</TableCell> */}
                <TableCell align="right">{row?.type}</TableCell>
                <TableCell align="right">{row?.oneTimePaymentAmount}</TableCell>
                <TableCell align="right">{row?.subscriptionDetails?.monthlyFee}</TableCell>
                <TableCell align="right">{row?.description}</TableCell>
                <TableCell align="right">
                  <DropdownForCustomer
                    id={row?._id}
                    setRefresh={setRefresh}
                    refresh={refresh}
                    api={"product"}
                    handleEdit={()=>{
                      console.log("calling");
                      setProduct(row);
                      setEditState(true);
                      // toggleDrawerEdit(true) ;
                    }}
                    handleDelete={()=>deleteItem(row?._id)}
                    buttonList={["Edit", "Delete"]}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

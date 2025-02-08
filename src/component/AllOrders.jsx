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
import AddNewCustomer from "./AddNewCustomer";
import { deleteData, getData } from "../others/api";
import DropdownForCustomer, {
  DropdownForCustomerSpecial,
} from "./DropdownForCustomer";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../others/common";
import AddingProductService from "./AddingProductService";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import OrderQuery from "./OrderQuery";
import toastSuccess from "./Alert";

export default function AllOrders({header=true}) {
  const [state, setState] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [currentCustomer, setCurrentCustomer] = React.useState();

  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState(""); // "active" or "pending"
  const [user, setUser] = React.useState();


  React.useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem("user"));
    setUser(getUser);
  }, []);
  React.useEffect(() => {
    let isMounted = true; // Track if component is still mounted
    setLoading(true);

    const fetchProducts = async () => {
      setData([]);
      if (!user?._id) {
        return; // Early return if user._id is not found
      }
      try {
        // Construct query parameters dynamically
        const queryParams = new URLSearchParams();
        if (status) queryParams.append("status", status);
        if (search) queryParams.append("search", search);
        // if (user?._id) queryParams.append("customerId", user?._id);

        const result = await getData(`transaction?${queryParams.toString()}`); // Fetch with filters
        if (isMounted) {
          setData(result?.data || []);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false; // Cleanup when component unmounts
    };
  }, [status, search, user, refresh]); // Re-fetch when status or search changes


  const deleteItem = (id) => {
    deleteData(`/transaction/${id}`).then(() => {
      setRefresh(!refresh);
      toastSuccess("Successfully deleted");
    });
  };

  return (
    <>

     { header &&
     <>
      <div className="content-topbar">
        <div className="content-title">
          <ArrowBackIcon />
          <Typography
            variant="h6"
            component="h6"
            style={{ fontWeight: "bold" }}
          >
            My Orders
          </Typography>
        </div>
        <div className="content-title">
          <Input
            size="md"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            size="md"
            variant={"solid"}
            color="primary"
            onClick={()=>navigate("/product")}
          >
            Purchase new product/service
          </Button>


        </div>
      </div>
      <div style={{ marginBottom: "16px", width: "fit-content" }}>
        <OrderQuery setStatus={setStatus} />
      </div>
      </>}
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: "100%", width: "100%" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              {/* <TableCell>ID</TableCell> */}
              <TableCell>Product Name</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Start Time</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Amount</TableCell>
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
                  {row?.productName}
                </TableCell>
                {/* <TableCell align="right">{row?.name}</TableCell> */}
                <TableCell align="right">{row?.type}</TableCell>
                <TableCell align="right">
                  {row?.startDate?.slice(0, 10)}
                </TableCell>
                <TableCell align="right">
                  {row?.status == "pending" && (
                    <span
                      style={{
                        backgroundColor: "yellow",
                        padding: "3px 7px",
                        borderRadius: "5px",
                      }}
                    >
                      {row?.status}{" "}
                    </span>
                  )}
                  {row?.status == "active" && (
                    <span
                      style={{
                        backgroundColor: "green",
                        color: "white",
                        padding: "3px 7px",
                        borderRadius: "5px",
                      }}
                    >
                      {row?.status}{" "}
                    </span>
                  )}
                </TableCell>
                <TableCell align="right">
                  {row?.type == "subscription" ? (
                    <>
                      {" "}
                      {row?.subscriptionDetails?.pricePerMonth}$/month ({" "}
                      {row?.subscriptionDetails?.duration} month )
                    </>
                  ) : row.type == "oneTimePayment" ? (
                    row?.oneTimePaymentAmount
                  ) : row.type == "emi" ? (
                    <>
                      {" "}
                      {row?.emiDetails?.pricePerMonth}$/month ({" "}
                      {row?.emiDetails?.duration} month )
                    </>
                  ) : (
                    ""
                  )}
                </TableCell>
                <TableCell align="right">
                  <DropdownForCustomer
                    id={row?._id}
                    setRefresh={setRefresh}
                    refresh={refresh}
                    api={"transaction"}
                    handleEdit={() => {
                      console.log("calling");
                    }}
                    handleDelete={() => deleteItem(row?._id)}
                    buttonList={["Delete"]}
                  />
                </TableCell>
              </TableRow>
            ))}
            {(data?.length<1 && !loading) && <h4 style={{paddingLeft:"20px"}}>No data exist</h4>}
          </TableBody>
        </Table>
      </TableContainer>

      {loading && (
        <Button loading={true} variant="plain" style={{ marginTop: "20px" , display:"block" , margin:"auto"}}>

        </Button>
      )}
    </>
  );
}

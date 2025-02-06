import * as React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Typography } from "@mui/material";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { Grid } from "@mui/joy";
import { getData, postData } from "../others/api";
import toastSuccess, { toastError } from "./Alert";
import { useParams } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { createData } from "../others/common";
// import toastSuccess from "./Alert";
// import { getData, postData } from "../others/api";

const CreatePayment = () => {
  const { id } = useParams();

  const [values, setValues] = React.useState({});
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [person, setPerson] = React.useState();
  const [personData, setPersonData] = React.useState();
  const [paymentInfo, setPaymentInfo] = React.useState();
  const [total, setTotal]=React.useState(0);

  React.useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    const handleForm = async () => {
      try {
        const result = await getData(`/customer/paymentInfo/${id}`, {
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
  }, [id]);

  const handleInvoiceCreate = async(e) => {
    e?.prevent?.default();
    // const invoiceData = { ...values, clientId: personData?._id };
    const invoiceData = {
      customerId: id,
      paymentsData: paymentInfo,
      paymentMethod:"Stipe"
     };

console.log("invoice data", invoiceData);

     try {
      const result = await createData(invoiceData, "payment"); // Wait for the promise to resolve
      console.log("payment successfully", result);
      if (result?.status == "success") {
        toastSuccess("Successfully payment created");

      }
    } catch (error) {
      console.error("Error creating data:", error);
      toastError("something went wrong");
    }
  };

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
            Update payment
          </Typography>
        </div>
        <div className="content-title">
          {/* <Input size="md" placeholder="Search" />; */}
          <Button
            size="md"
            variant={"solid"}
            color="primary"
            onClick={handleInvoiceCreate}
          >
            Update
          </Button>
          {/* <Button size="md" variant={"solid"} color="primary"  onClick={()=>toggleDrawer("right", true)}>
            {"right"}
          </Button> */}
        </div>
      </div>
      <div>
        <div className="createInvoiceFields">
          <Grid container spacing={2}>
            {/* Grid Item that spans 2 columns */}
            <Grid item xs={12} sm={5}>
              <FormControl fullWidth>
                <FormLabel>Name</FormLabel>
                <FormLabel sx={{ fontWeight: "600" }}>{person?.name}</FormLabel>

                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>

            {/* Another Grid Item that spans 2 columns */}
            {/* <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormLabel>Number</FormLabel>
                <Input
                  type="number"
                  value={values.number}
                  onChange={(event) =>
                    setValues({ ...values, number: event.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormLabel>Year</FormLabel>
                <Input
                  type="number"
                  value={values.year}
                  onChange={(event) =>
                    setValues({ ...values, year: event.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormLabel>Status</FormLabel>
                <Select
                  onChange={(event, newValue) => {
                    setValues({ ...values, status: newValue });
                  }}
                  placeholder="Select status"
                  indicator={<KeyboardArrowDown />}
                  sx={{
                    width: "100%",
                    [`& .${selectClasses.indicator}`]: {
                      transition: "0.2s",
                      [`&.${selectClasses.expanded}`]: {
                        transform: "rotate(-180deg)",
                      },
                    },
                  }}
                >
                  <Option value="sent">sent</Option>
                  <Option value="draft">draft</Option>
                </Select>
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormLabel>Date</FormLabel>
                <Input
                  type="date"
                  value={values.date}
                  onChange={(event) =>
                    setValues({ ...values, date: event.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormLabel>Expire Date</FormLabel>
                <Input
                  type="date"
                  value={values.expireDate}
                  onChange={(event) =>
                    setValues({ ...values, expireDate: event.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormLabel>Note</FormLabel>
                <Input
                  type="text"
                  value={values.note}
                  onChange={(event) =>
                    setValues({ ...values, note: event.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid> */}
          </Grid>


          <FormLabel sx={{ fontWeight: "600", marginTop:"30px", marginBottom:"20px", fontSize:"1.1em" }}>Due Payments</FormLabel>
          <TableContainer component={Paper} >
            <Table
              sx={{ minWidth: "100%", width: "100%" }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  {/* <TableCell>ID</TableCell> */}
                  <TableCell> Product/Service Name</TableCell>
                  <TableCell align="center">Id</TableCell>

                  <TableCell align="center">Month - Amount</TableCell>
                  <TableCell align="right">Total Amount</TableCell>
                  {/* <TableCell align="right">Postal Code</TableCell>
                  <TableCell align="right">Manage</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {paymentInfo?.map((row) => (
                  <TableRow
                    key={row?._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row?.transaction?.productName}
                    </TableCell>
                    {/* <TableCell align="right">{row?.name}</TableCell> */}
                    <TableCell align="center">{row?.transaction?._id.slice(-6)}</TableCell>
                    <TableCell align="center">
                      <div >
                        {row?.dueDetails?.map((due, index)=>{
                          return (
                            <div key={index} style={{display:"flex", justifyContent:"space-evenly", alignItems:"center", marginBottom:"10px"}} >
                              <span>{due?.month}</span>
                              <span>$ {due?.dueAmount}</span>
                            </div>
                          )
                        })}
                      </div>
                    </TableCell>
                    <TableCell align="right">$ {row?.totalAmountDue}</TableCell>
                    {/* <TableCell align="right">{row?.city}</TableCell> */}

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <Grid container spacing={2} style={{ marginTop: "40px" }}>

            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormLabel>Service</FormLabel>
                <Input
                  type="text"
                  value={values.service}
                  onChange={(event) =>
                    setValues({ ...values, service: event.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  value={values.description}
                  onChange={(event) =>
                    setValues({ ...values, description: event.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormLabel>package Type</FormLabel>
                <Select
                  onChange={(event, newValue) => {
                    setValues({ ...values, serviceType: newValue });
                  }}
                  placeholder="Select package"
                  indicator={<KeyboardArrowDown />}
                  sx={{
                    width: "100%",
                    [`& .${selectClasses.indicator}`]: {
                      transition: "0.2s",
                      [`&.${selectClasses.expanded}`]: {
                        transform: "rotate(-180deg)",
                      },
                    },
                  }}
                >
                  <Option
                    value="monthly"
                    selected={personData?.serviceType == "monthly"}
                  >
                    Monthly
                  </Option>
                  <Option
                    value="yearly"
                    selected={personData?.serviceType == "yearly"}
                  >
                    Yearly
                  </Option>
                </Select>
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  defaultValue={personData?.price}
                  onChange={(event) =>
                    setValues({ ...values, price: event.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
          </Grid> */}

          {/* <Divider style={{ margin: "40px 0" }} /> */}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems:"center" }}>
            <div>
              <Button
                size="md"
                variant={"solid"}
                color="primary"
                onClick={handleInvoiceCreate}
              >
                Update
              </Button>
            </div>
            <div style={{ textAlign: "end" }}>
              <div className="endFlex">
              <FormLabel sx={{ fontWeight: "600", marginTop:"30px", marginBottom:"20px", fontSize:"1em" }}>Total : $ {total}</FormLabel>
                {/* <label htmlFor="">Sub Total : </label>
                <Input
                  type="number"
                  value={values.subTotal}
                  onChange={(event) =>
                    setValues({ ...values, subTotal: event.target.value })
                  }
                /> */}
              </div>
              {/* <div className="endFlex">
                <FormLabel>Vat %</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    value={values.vat}
                    onChange={(event) =>
                      setValues({ ...values, vat: event.target.value })
                    }
                  />
                  <FormHelperText></FormHelperText>
                </FormControl>
                <FormControl>
                  <Input
                    type="text"
                    value={values.vatPrice}
                    onChange={(event) =>
                      setValues({ ...values, vatPrice: event.target.value })
                    }
                  />
                  <FormHelperText></FormHelperText>
                </FormControl>
              </div>
              <div className="endFlex">
                <label htmlFor="">Total : </label>
                <Input
                  type="number"
                  value={values.total}
                  onChange={(event) =>
                    setValues({ ...values, total: event.target.value })
                  }
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePayment;

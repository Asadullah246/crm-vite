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
import { Grid, Textarea } from "@mui/joy";
import toastSuccess, { toastError } from "../component/Alert";
import { getData, postData } from "../others/api";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import { Radio, RadioGroup } from "@mui/joy";
import { createData } from "../others/common";

const AddingProductService = ({ customer }) => {
  // console.log("cust", customer);
  const [values, setValues] = React.useState({});
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [person, setPerson] = React.useState();
  const [personData, setPersonData] = React.useState();
  const [value, setValue] = React.useState(null);
  const [tab, setTab] = React.useState(0);
  const [transactionId, setTransactionId]=React.useState(null);
  const [productId, setProductId]=React.useState(null);
  const [customerId, setCustomerId]=React.useState(null);
  const[payment , setPayment]=React.useState({});
  const [paymentMonth, setPaymentMonth] = React.useState();

  const defaultProps = {
    options: data,
    getOptionLabel: (option) => option?.name,
  };

  // Fetch data on component mount
  React.useEffect(() => {
    let isMounted = true; // To track if the component is still mounted
    setLoading(true);

    const handleForm = async () => {
      try {
        const result = await getData("product");
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


const getMonth =(data)=>{
  const date = new Date(data);
const monthName = date.toLocaleString("en-GB", { month: "long" });

return monthName;

}



  const handleInvoiceCreate = async(e) => {
    e?.prevent?.default();

// setTab(1);

    const invoiceData = {
      ...values,
      customerId: customer?._id,
      productId: value?._id,
      productName: value?.name,
      subscriptionDetails: {...values.subscriptionDetails, pricePerMonth: value?.subscriptionDetails?.monthlyFee}
    };



      try {
          const result = await createData(invoiceData, "transaction"); // Wait for the promise to resolve
          console.log("Transaction successfully", result);
          if (result.status == "success") {
            toastSuccess("Successfully Transaction created");
            setTransactionId(result?.data?._id);
            setProductId(result?.data?.productId);
            setCustomerId(result?.data?.customerId);
            const month = getMonth(result?.data?.paymentStartDate || "2025-01-23T00:00:00.000+00:00");
            console.log("month", month);
            setPaymentMonth(month);

          }
        } catch (error) {
          console.error("Error creating data:", error);
          toastError("something went wrong");
        }

  };





  return (
    <div className="pageLayout">
    {tab==0 ?
    <div>
        <div className="content-topbar">
        <div className="content-title">
          {/* <ArrowBackIcon /> */}
          <Typography
            variant="h6"
            component="h6"
            style={{ fontWeight: "bold" }}
          >
            {customer?.name}
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
            Save
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
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel>Client</FormLabel>

                <FormHelperText>{customer?.name}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
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
                  <Option value="active">active</Option>
                  <Option value="draft">draft</Option>
                  <Option value="pending">pending</Option>
                  <Option value="cancelled">cancelled</Option>
                  <Option value="completed">completed</Option>
                </Select>
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginTop: "40px" }}>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <FormLabel>Product/service</FormLabel>

                <Autocomplete
                  {...defaultProps}
                  id="controlled-demo"
                  value={value}
                  onChange={(event, newValue) => {
                    console.log("value", newValue);
                    setValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Product" variant="standard" />
                  )}
                />
                {/* <Select
                  onChange={(event, newValue) => {
                    setValues({ ...values, status: newValue });
                  }}
                  placeholder="Select product/service"
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
                  <Option value="active">active</Option>
                  <Option value="draft">draft</Option>
                  <Option value="pending">pending</Option>
                  <Option value="cancelled">cancelled</Option>
                  <Option value="completed">completed</Option>
                </Select> */}
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel>Note</FormLabel>
                <Textarea
                  minRows={2}
                  type="text"
                  value={values.note}
                  onChange={(event) =>
                    setValues({ ...values, note: event.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel>Description</FormLabel>
                <Textarea
                  minRows={2}
                  type="text"
                  value={values.description}
                  onChange={(event) =>
                    setValues({ ...values, description: event.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel>package Type</FormLabel>
                <Select
                  onChange={(event, newValue) => {
                    setValues({ ...values, tempType: newValue });
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
                  {value?.type?.map((t, index) => {
                    return (
                      <Option key={index} value={t}>
                        {t}
                      </Option>
                    );
                  })}
                </Select>
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}></Grid>

            {(values.tempType == "product" || values.tempType == "service") && (
              <>
                <Grid item xs={12} sm={6}>
                  <FormControl>
                    <FormLabel>Payment options</FormLabel>
                    <RadioGroup
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                      onChange={(event) =>
                        setValues({ ...values, type: event.target.value })
                      }
                    >
                      <Radio value="oneTimePayment" label="One Time Payment" />
                      <Radio value="emi" label="EMI" sx={{ marginTop: "0" }} />
                    </RadioGroup>{" "}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}></Grid>
                {values.type == "oneTimePayment" && (
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <FormLabel>Price</FormLabel>
                      <Input
                        type="number"
                        onChange={(event) =>
                          setValues({
                            ...values,
                            oneTimePaymentAmount: event.target.value,
                          })
                        }
                      />
                      <FormHelperText></FormHelperText>
                    </FormControl>
                  </Grid>
                )}

                {values.type == "emi" && (
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <FormLabel>EMI Options</FormLabel>
                      <Select
                        onChange={(event, newValue) => {
                          console.log("emi new vlaue", newValue);
                          setValues({ ...values, emiDetails: newValue });
                        }}
                        placeholder="Select EMI options"
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
                        {value?.emiOptions?.map((t, index) => {
                          return (
                            <Option key={index} value={t}>
                              Duration: {t?.duration}, Price monthly:{" "}
                              {t?.pricePerMonth}
                            </Option>
                          );
                        })}
                      </Select>
                      <FormHelperText></FormHelperText>
                    </FormControl>
                  </Grid>
                )}
              </>
            )}

            {values.tempType == "subscription" && (
              <>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <FormLabel>
                      Select duration month (min:{" "}
                      {value?.subscriptionDetails?.minDuration}, max:{" "}
                      {value?.subscriptionDetails?.maxDuration}
                    </FormLabel>
                    <Input
                      type="number"
                      onChange={(event) =>
                        setValues({
                          ...values,
                          subscriptionDetails: {
                            ...values.subscriptionDetails,
                            duration: event.target.value,
                          },
                        })
                      }
                    />
                    <FormHelperText></FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <FormLabel>
                      Monthly Fee
                    </FormLabel>
                    <Input
                      type="number"
                      value={value?.subscriptionDetails?.monthlyFee}
                      readOnly

                    />
                    <FormHelperText></FormHelperText>
                  </FormControl>
                </Grid>
              </>
            )}

<Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <FormLabel>
                      Start Date
                    </FormLabel>
                    <Input
                      type="date"
                      onChange={(event) =>
                        setValues({
                          ...values,
                          startDate: event.target.value,
                        })
                      }


                    />
                    <FormHelperText></FormHelperText>
                  </FormControl>
                </Grid>

          </Grid>

          <Divider style={{ margin: "40px 0" }} />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <Button
                size="md"
                variant={"solid"}
                color="primary"
                onClick={handleInvoiceCreate}
              >
                Save
              </Button>
            </div>

          </div>
        </div>
      </div>

    </div>
    :
    <div>
       <div className="content-topbar">
        <div className="content-title">
          {/* <ArrowBackIcon /> */}
          <Typography
            variant="h6"
            component="h6"
            style={{ fontWeight: "bold" }}
          >
            Add Payment Info
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
            Save
          </Button>




        </div>
      </div>

      <div>
      <Grid container spacing={2}>
            {/* Grid Item that spans 2 columns */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel>Client</FormLabel>

                <FormHelperText>{customer?.name}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel>Payment Status</FormLabel>
                <Select
                  onChange={(event, newValue) => {
                    setPayment({ ...payment, status: newValue })
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
                  <Option value="pending">pending</Option>
                  <Option value="completed">completed</Option>
                  <Option value="failed">failed</Option>
                  <Option value="partial ">partial </Option>
                </Select>
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>



            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel>Payment Method</FormLabel>
                <Input
                  type="text"
                  value={payment.paymentMethod}
                  onChange={(event) =>
                    setPayment({ ...payment, paymentMethod: event.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>




            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel>Note</FormLabel>
                <Textarea
                  minRows={2}
                  type="text"
                  value={payment.note}
                  onChange={(event) =>
                    setPayment({ ...payment, note: event.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
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
            </Grid>
          </Grid>
      </div>
    </div>
    }
    </div>
  );
};

export default AddingProductService;

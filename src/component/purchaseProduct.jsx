import * as React from "react";
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
import toastSuccess, { toastError } from "./Alert";
import { getData, postData } from "../others/api";
import { Radio, RadioGroup } from "@mui/joy";
import { createData } from "../others/common";
import { Typography } from "@mui/material";

const PurchaseProduct = ({ value }) => {
  // console.log("cust", customer);
  const [values, setValues] = React.useState({});
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [tab, setTab] = React.useState(0);
  // const [transactionId, setTransactionId] = React.useState(null);
  // const [productId, setProductId] = React.useState(null);
  // const [customerId, setCustomerId] = React.useState(null);
  // const [paymentMonth, setPaymentMonth] = React.useState();
  const [customer, setCustomer]=React.useState();
  const [alert, setAlert]=React.useState("")

  React.useEffect(()=>{
    const userData=JSON.parse(localStorage.getItem("user"));
    setCustomer(userData)
  },[])
console.log("cutomer", customer);
  const defaultProps = {
    options: data,
    getOptionLabel: (option) => option?.name,
  };



  const getMonth = (data) => {
    const date = new Date(data);
    const monthName = date.toLocaleString("en-GB", { month: "long" });

    return monthName;
  };

  const handleInvoiceCreate = async (e) => {
    e?.prevent?.default();
    setLoading(true)

    // setTab(1);

    const { paymentType, ...restValues } = values;

    const invoiceData = {
      ...restValues,
      customerId: customer?._id,
      productId: value?._id,
      productName: value?.name,
      status:"pending",
      type:values?.type=="subscription" ? "subscription" : values?.paymentType,
      oneTimePaymentAmount: value?.oneTimePaymentAmount,
      subscriptionDetails: {
        ...values.subscriptionDetails,
        pricePerMonth: value?.subscriptionDetails?.monthlyFee,
      },
    };

    try {
      const result = await createData(invoiceData, "transaction");
      console.log("Transaction successfully", result);
      if (result.status == "success") {
        setAlert("Successfully transacted. We will contact you soon. Thanks")
        // toastSuccess("Successfully Transaction created");
        // setTransactionId(result?.data?._id);
        // setProductId(result?.data?.productId);
        // setCustomerId(result?.data?.customerId);
        // const month = getMonth(
        //   result?.data?.paymentStartDate || "2025-01-23T00:00:00.000+00:00"
        // );
        // console.log("month", month);
        // setPaymentMonth(month);
      }
      setLoading(false)
    } catch (error) {
      console.error("Error creating data:", error);
      toastError("something went wrong");
      setLoading(false)
    }
  };

  return (
    <div className="pageLayout">
      <h2 style={{textAlign:"center", marginBottom:"30px"}}>Get this product/service</h2>
      {tab == 0 ? (
        <div>
          {/* <div className="content-topbar">
            <div className="content-title">

              <Typography
                variant="h6"
                component="h6"
                style={{ fontWeight: "bold" }}
              >
                {customer?.name}
              </Typography>
            </div>
            <div className="content-title">
              <Button
                size="md"
                variant={"solid"}
                color="primary"
                onClick={handleInvoiceCreate}
              >
                Save
              </Button>

            </div>
          </div> */}
          <div>
            <div className="createInvoiceFields">
              <Grid container spacing={2}>
                {/* Grid Item that spans 2 columns */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <FormLabel>Name </FormLabel>

                    <FormHelperText>{customer?.name}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <FormLabel>Product/service</FormLabel>



                    <FormHelperText>{value?.name}</FormHelperText>
                  </FormControl>
                </Grid>



              </Grid>
              <Grid container spacing={2} style={{ marginTop: "40px" }}>


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
                    <FormLabel>package Type</FormLabel>
                    <Select
                      onChange={(event, newValue) => {
                        setValues({ ...values, type: newValue });
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


                {(values.type == "product" ||
                  values.type == "service") && (
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
                            setValues({ ...values, paymentType: event.target.value })
                          }
                        >
                          <Radio
                            value="oneTimePayment"
                            label="One Time Payment"
                          />
                          <Radio
                            value="emi"
                            label="EMI"
                            sx={{ marginTop: "0" }}
                          />
                        </RadioGroup>{" "}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}></Grid>
                    {values.paymentType == "oneTimePayment" && (
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <FormLabel>Price</FormLabel>
                          <Input
                            type="number"
                            readOnly
                            value={value?.oneTimePaymentAmount}

                          />
                          <FormHelperText></FormHelperText>
                        </FormControl>
                      </Grid>
                    )}

                    {values.paymentType == "emi" && (
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

                {values.type == "subscription" && (
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
                        <FormLabel>Monthly Fee</FormLabel>
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
                    <FormLabel>Start Date</FormLabel>
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

                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <FormLabel>Address</FormLabel>

                    <FormHelperText>{customer?.streetAddress}, {customer?.city}, {customer?.postalCode}</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>

              <Divider style={{ margin: "40px 0" }} />

              <Typography
                  color="success"
                  fontSize="sm"
                  sx={{ color: "#0B6BCB", textAlign: "center" }}
                >
                  {alert}
                </Typography>



              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  {/* <Button
                    size="md"
                    variant={"solid"}
                    color="primary"
                    onClick={handleInvoiceCreate}
                  >
                    Save
                  </Button> */}

                  <Button
                  loading={loading}
                    size="md"
                  type="submit"
                  variant={"solid"}
                  style={{ marginTop: "20px" }}
                  onClick={handleInvoiceCreate}
                >
                  Save
                </Button>

                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // <div>
        //    <div className="content-topbar">
        //     <div className="content-title">
        //       {/* <ArrowBackIcon style={{cursor:"pointer" }}  /> */}
        //       <Typography
        //         variant="h6"
        //         component="h6"
        //         style={{ fontWeight: "bold" }}
        //       >
        //         Add Payment Info
        //       </Typography>
        //     </div>
        //     <div className="content-title">
        //       {/* <Input size="md" placeholder="Search" />; */}
        //       <Button
        //         size="md"
        //         variant={"solid"}
        //         color="primary"
        //         onClick={handleInvoiceCreate}
        //       >
        //         Save
        //       </Button>

        //     </div>
        //   </div>

        //   <div>
        //   <Grid container spacing={2}>

        //         <Grid item xs={12} sm={6}>
        //           <FormControl fullWidth>
        //             <FormLabel>Client</FormLabel>

        //             <FormHelperText>{customer?.name}</FormHelperText>
        //           </FormControl>
        //         </Grid>

        //         <Grid item xs={12} sm={6}>
        //           <FormControl fullWidth>
        //             <FormLabel>Payment Status</FormLabel>
        //             <Select
        //               onChange={(event, newValue) => {
        //                 setPayment({ ...payment, status: newValue })
        //               }}
        //               placeholder="Select status"
        //               indicator={<KeyboardArrowDown />}
        //               sx={{
        //                 width: "100%",
        //                 [`& .${selectClasses.indicator}`]: {
        //                   transition: "0.2s",
        //                   [`&.${selectClasses.expanded}`]: {
        //                     transform: "rotate(-180deg)",
        //                   },
        //                 },
        //               }}
        //             >
        //               <Option value="pending">pending</Option>
        //               <Option value="completed">completed</Option>
        //               <Option value="failed">failed</Option>
        //               <Option value="partial ">partial </Option>
        //             </Select>
        //             <FormHelperText></FormHelperText>
        //           </FormControl>
        //         </Grid>

        //         <Grid item xs={12} sm={6}>
        //           <FormControl fullWidth>
        //             <FormLabel>Payment Method</FormLabel>
        //             <Input
        //               type="text"
        //               value={payment.paymentMethod}
        //               onChange={(event) =>
        //                 setPayment({ ...payment, paymentMethod: event.target.value })
        //               }
        //             />
        //             <FormHelperText></FormHelperText>
        //           </FormControl>
        //         </Grid>

        //         <Grid item xs={12} sm={6}>
        //           <FormControl fullWidth>
        //             <FormLabel>Note</FormLabel>
        //             <Textarea
        //               minRows={2}
        //               type="text"
        //               value={payment.note}
        //               onChange={(event) =>
        //                 setPayment({ ...payment, note: event.target.value })
        //               }
        //             />
        //             <FormHelperText></FormHelperText>
        //           </FormControl>
        //         </Grid>
        //         <Grid item xs={12} sm={6}>
        //           <FormControl fullWidth>
        //             <FormLabel>Note</FormLabel>
        //             <Input
        //               type="text"
        //               value={values.note}
        //               onChange={(event) =>
        //                 setValues({ ...values, note: event.target.value })
        //               }
        //             />
        //             <FormHelperText></FormHelperText>
        //           </FormControl>
        //         </Grid>
        //       </Grid>
        //   </div>
        // </div>
        ""
      )}
    </div>
  );
};

export default PurchaseProduct;

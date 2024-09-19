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
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import ButtonGroup from "@mui/joy/ButtonGroup";
import List from "@mui/joy/List";
import Divider from "@mui/joy/Divider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Stack from "@mui/joy/Stack";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

import { Grid } from "@mui/joy";
import toastSuccess from "../component/Alert";
// import AddNewCustomer from './AddNewCustomer';

const CreateInvoice = () => {
  const [values, setValues] = React.useState({});
  const handleInvoiceCreate = (e) => { 
    e?.prevent?.default();
    console.log("click");
    toastSuccess("Successfully done");
  };

  return (
    <div className="pageLayout">
      <div className="content-topbar">
        <div className="content-title">
          <ArrowBackIcon />
          <Typography
            variant="h6"
            component="h6"
            style={{ fontWeight: "bold" }}
          >
            New
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
            <Grid item xs={12} sm={5}>
              <FormControl fullWidth>
                <FormLabel>Client</FormLabel>
                <Select
                  fullWidth
                  placeholder="Select a pet…"
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
                  <Option value="dog">client 1</Option>
                  <Option value="cat">client 2</Option>
                  <Option value="fish">client 3</Option>
                  <Option value="bird">client 4</Option>
                </Select>
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>

            {/* Another Grid Item that spans 2 columns */}
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormLabel>Number</FormLabel>
                <Input
                  type="number"
                  value={values.phone}
                  onChange={(event) =>
                    setValues({ ...values, phone: event.target.value })
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
                  value={values.phone}
                  onChange={(event) =>
                    setValues({ ...values, phone: event.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormLabel>Status</FormLabel>
                <Select
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
                  <Option value="dog">draft</Option>
                  <Option value="cat">sent</Option>
                </Select>
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormLabel>Date</FormLabel>
                <Input
                  type="date"
                  value={values.phone}
                  onChange={(event) =>
                    setValues({ ...values, phone: event.target.value })
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
                  value={values.phone}
                  onChange={(event) =>
                    setValues({ ...values, phone: event.target.value })
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
                  value={values.phone}
                  onChange={(event) =>
                    setValues({ ...values, phone: event.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginTop: "40px" }}>
            {/* Grid Item that spans 2 columns */}

            {/* Another Grid Item that spans 2 columns */}
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormLabel>Package</FormLabel>
                <Input
                  type="text"
                  value={values.phone}
                  onChange={(event) =>
                    setValues({ ...values, phone: event.target.value })
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
                  value={values.phone}
                  onChange={(event) =>
                    setValues({ ...values, phone: event.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormLabel>package Type</FormLabel>
                <Select
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
                  <Option value="dog">Monthly</Option>
                  <Option value="cat">Yearly</Option>
                </Select>
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  value={values.phone}
                  onChange={(event) =>
                    setValues({ ...values, phone: event.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

          <Divider style={{margin:"40px 0"}} />

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
            <div style={{textAlign:"end"}}>
              <div className="endFlex">
                <label htmlFor="">Sub Total : </label>
                <Input
                  type="number"
                  value={values.phone}
                  onChange={(event) =>
                    setValues({ ...values, phone: event.target.value })
                  }
                />
              </div>
              <div className="endFlex">
              <FormLabel>Vat %</FormLabel>
              <FormControl >

                <Input
                  type="text"
                  value={values.phone}
                  onChange={(event) =>
                    setValues({ ...values, phone: event.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
              <FormControl >
                {/* <FormLabel>Package</FormLabel> */}
                <Input
                  type="text"
                  value={values.phone}
                  onChange={(event) =>
                    setValues({ ...values, phone: event.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
              </div>
              <div className="endFlex">
                <label htmlFor="">Total : </label>
                <Input
                  type="number"
                  value={values.phone}
                  onChange={(event) =>
                    setValues({ ...values, phone: event.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;

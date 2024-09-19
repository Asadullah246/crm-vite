import * as React from "react";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Button from "@mui/joy/Button";
import List from "@mui/joy/List";
import Divider from "@mui/joy/Divider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Input from "@mui/joy/Input";
import { Typography } from "@mui/material";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Stack from "@mui/joy/Stack";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import AlertMessage from "./Alert";
import toastSuccess from "./Alert";
import { postData } from "../others/api";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

export default function AddNewCustomer({ state, toggleDrawer }) {
  const [values, setValues] = React.useState({});

  function generateHeatingId() {
    const randomNumber = Math.floor(Math.random() * 10000); // Generate a random number
    const heatingId = `Heating${randomNumber}`; // Concatenate "Heating" with the random number
    return heatingId;
  }

  const handleForm = (e) => {
    e?.prevent?.default();
    const data={...values, randomId:generateHeatingId()} 
    postData('/customer', data) // Replace '/items' with your API endpoint
      .then((response) => {
        // setData((prev) => [...prev, response]);
        toastSuccess("Successfully customer created")
        console.log("post res", response);
      });
  };

  const list = () => (
    <Box
      role="presentation"
      // onClick={toggleDrawer(false)}
      // onKeyDown={toggleDrawer(false)}
      sx={{ padding: "30px", paddingBottom: "50px" }}
    >
      <Typography
        variant="h5"
        component="h5"
        sx={{ fontWeight: 600, marginBottom: "30px" }}
      >
        Add New Person
      </Typography>
      <Stack spacing={2}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            onChange={(event) =>
              setValues({ ...values, name: event.target.value })
            }
          />
          <FormHelperText>{/* <InfoOutlined /> */}</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Phone</FormLabel>
          <Input
            type="phone"
            onChange={(event) =>
              setValues({ ...values, phone: event.target.value })
            }
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            onChange={(event) =>
              setValues({ ...values, email: event.target.value })
            }
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Address</FormLabel>
          <Input
            type="text"
            onChange={(event) =>
              setValues({ ...values, address: event.target.value })
            }
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Country</FormLabel>
          <Input
            type="text"
            onChange={(event) =>
              setValues({ ...values, country: event.target.value })
            }
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Postal Code</FormLabel>
          <Input
            type="number"
            onChange={(event) =>
              setValues({ ...values, postalCode: event.target.value })
            }
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Service Type</FormLabel>
          {/* <Input
            type="text"
            onChange={(event) =>
              setValues({ ...values, serviceType: event.target.value })
            }
          /> */}
          <Select
           onChange={(event, newValue) =>
            setValues({ ...values, serviceType: newValue })
          }

                  placeholder="Select service"
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
                  <Option value="monthly">Monthly</Option>
                  <Option value="yearly">Yearly</Option>
                </Select>

          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Service Price</FormLabel>
          <Input
            type="number"
            onChange={(event) =>
              setValues({ ...values, price: event.target.value })
            }
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Service Start</FormLabel>
          <Input
            type="date"
            onChange={(event) =>
              setValues({ ...values, startingDate: event.target.value })
            }
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Boiler Make</FormLabel>
          <Input
            type="text"
            onChange={(event) =>
              setValues({ ...values, boilerMake: event.target.value })
            }
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Assigned Engineer</FormLabel>
          <Input
            type="text"
            onChange={(event) =>
              setValues({ ...values, assignedEng: event.target.value })
            }
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Company Name</FormLabel>
          <Input
            type="text"
            onChange={(event) =>
              setValues({ ...values, AECompanyName: event.target.value })
            }
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Cover Engineer</FormLabel>
          <Input
            type="text"
            onChange={(event) =>
              setValues({ ...values, coverEng: event.target.value })
            }
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Company Name</FormLabel>
          <Input
            type="text"
            onChange={(event) =>
              setValues({ ...values, CECompanyName: event.target.value })
            }
          />
          <FormHelperText></FormHelperText>
        </FormControl>

        <Button
          size="md"
          variant={"solid"}
          color="primary"
          style={{ marginBottom: "50px" }}
          onClick={handleForm}
        >
          Submit
        </Button>
      </Stack>
    </Box>
  );

  return (
    <div>
      {/* <Button  onClick={toggleDrawer("right", true)}>
            {"right"}
          </Button> */}
      {/* {['top', 'right', 'bottom', 'left'].map((anchor) => ( */}
      <Drawer open={state} onClose={toggleDrawer(false)} anchor={"right"}>
        {list()}
      </Drawer>
      {/*    ))} */}
    </div>
  );
}

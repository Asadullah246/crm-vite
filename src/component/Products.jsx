import * as React from "react";
import { deleteData, getData } from "../others/api";
import ProductCard from "./ProductCard";

import { styled } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Grid from "@mui/joy/Grid";

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography["body-sm"],
  padding: theme.spacing(1),
  textAlign: "center",
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: theme.palette.background.level1,
  }),
}));

function Products() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);

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



  return (
    <div>
      <h2 style={{marginTop:"60px"}}>Latest Products</h2>
      <div className="productGrid">
      {data?.map((p) => {
        return <ProductCard key={p?._id} p={p} />;
      })}
      </div>




    </div>
  );
}

export default Products;

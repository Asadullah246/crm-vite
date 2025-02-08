import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../others/api";
import "../styles/product.css";
import PurchaseProduct from "../component/purchaseProduct";

function SingleProduct() {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = useState();


  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(
    "https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286"
  );

  const product = {
    name: "Product Name",
    category: "Electronics",
    price: "$199.99",
    description: "This is a detailed description of the product.",
    imageUrl:
      "https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286",
    thumbnails: [
      "https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286",
      "https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286",
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fletsenhance.io%2F&psig=AOvVaw1c3ya1Daj6wHFN1PIvaLmb&ust=1739078650112000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJix5P-qs4sDFQAAAAAdAAAAABAE",
    ],
  };


  React.useEffect(() => {
    let isMounted = true; // To track if the component is still mounted
    setLoading(true);

    const handleForm = async () => {
      try {
        const result = await getData(`product/${id}`);
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
  }, [id]);

  console.log("data", data);



  const handleAddToCart = () => {
    console.log("Added to cart:", { product, quantity });
  };

  return (
    <div>
      <div className="product-page">
        {/* Product Image Section */}
        <div className="product-images">
          <div className="main-image">
            <img src={data?.imageUrl || mainImage} alt="Main Product" />
          </div>

          {/* Thumbnail Images */}
          {/* <div className="thumbnail-images">
          {product.thumbnails.map((thumbnail, index) => (
            <img
              key={index}
              src={thumbnail}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setMainImage(thumbnail)}
            />
          ))}
        </div> */}
        </div>

        {/* Product Details Section */}
        <div className="product-details">
          <h1>{data?.name}</h1>
          <p className="product-category">
            Category:{" "}
            {data?.type?.map((t, index) => {
              return <> {t}, </>;
            })}
          </p>

          {data?.type.includes("product") && (
            <>
              <p className="product-price">One Time Payment: {data?.oneTimePaymentAmount}$</p>

              <h4 style={{ margin: "0", padding: "0" }}>EMI Options</h4>
              {data?.emiOptions?.map((e) => {
                return (
                  <p style={{ margin: "5px 0", padding: "0" }} key={e?._id}>
                    Duration : {e?.duration} months ( {e?.pricePerMonth}$/month
                    )
                  </p>
                );
              })}
            </>
          )}

          <div>
            {data?.type.includes("subscription") && (
              <>
                <h4 style={{ margin: "0", marginTop: "20px", padding: "0" }}>
                  Subscription Available
                </h4>
                <p style={{ margin: "5px 0", padding: "0" }}>
                  <span style={{ fontWeight: "500" }}>Subscription Fee:</span>{" "}
                  {data?.subscriptionDetails?.monthlyFee}$/Month (min:{" "}
                  {data?.subscriptionDetails?.minDuration} months - max{" "}
                  {data?.subscriptionDetails?.maxDuration} months)
                </p>
              </>
            )}
          </div>
          {/* <div className="product-rating">
          <span>⭐⭐⭐⭐⭐</span>
          <span>(50 reviews)</span>
        </div> */}

          {/* Add to Cart Section */}
          {/* <div className="add-to-cart">
          <label htmlFor="quantity">Quantity: </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button onClick={handleAddToCart} className="add-button">
            Add to Cart
          </button>
        </div> */}
        </div>
      </div>

      <div className="product-description">
        <h2>Product Description</h2>
        <p>{data?.description}</p>
        <div>
            <h4  style={{margin:"0", padding:"0", marginBottom:"8px"}}>Contact Us: </h4>
            <p style={{margin:"0", padding:"0", marginTop:"4px"}}>Phone : +123 456 789</p>
            <p style={{margin:"0", padding:"0", marginTop:"4px"}}>email : example@gmail.com</p>
            <p style={{margin:"0", padding:"0", marginTop:"4px"}}>Address : Dhaka, Bangladesh</p>

        </div>
      </div>
<div style={{width:"80%", marginTop:"50px"}}>

<PurchaseProduct value={data} />
</div>
    </div>
  );
}

export default SingleProduct;

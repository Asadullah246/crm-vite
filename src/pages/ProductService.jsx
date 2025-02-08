import React from 'react';
import ProductServiceTable from '../component/ProductServiceTable';
import Products from '../component/Products';

const ProductService = () => {
    const [userRole, setUserRole]=React.useState();
    React.useEffect(() => {
        const userData=localStorage.getItem("userRole");
        console.log("user", userData);
        setUserRole(userData);
       }, []);
    return (
       <>
       {userRole==="admin" ?  <div className='pageLayout' >
           <ProductServiceTable/>
        </div> :
         <Products/>}


        </>
    );
};

export default ProductService;

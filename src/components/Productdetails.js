import React from "react";
import Iteminfo from "./Iteminfo";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";

const Productdetails = () => {
    // Extract product data from URL parameters
    const { product } = useParams();
    
    // Decode and parse the product data from the URL
    const productData = JSON.parse(decodeURIComponent(product));

    return (
        <div>
            {/* Render the Navbar */}
            <Navbar />
            
            {/* Pass the parsed product data to the Iteminfo component */}
            <Iteminfo product={productData} />
        </div>
    );
};

export default Productdetails;

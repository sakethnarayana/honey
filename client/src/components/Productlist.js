import Navbar from "./Navbar";
import Showitems from "./Showitems";
import React, { useEffect, useState } from 'react';

const Productlist = () => {
    // Updated state variable and setter name
    const [items, setItems] = useState([]);

    // Updated the useEffect hook
    useEffect(() => {
        // Fetching the products data from 'flowers.json'
        fetch('/flowers.json')
            .then(res => res.json())
            .then(fetchedData => {
                // Set the items with fetched data
                setItems(fetchedData);
            })
            .catch(err => {
                console.error('Failed to load the JSON file:', err);
            });
    }, []);

    // Renamed helper function to 'handlePriceFilter'
    const handlePriceFilter = (maxPrice) => {
        fetch('/flowers.json')
            .then(res => res.json())
            .then(filteredData => {
                // Filtering data based on maxPrice
                const filteredItems = filteredData.filter(item => {
                    return maxPrice === "" || Number(item.price) <= Number(maxPrice);
                });

                // Set the filtered items
                setItems(filteredItems);
            })
            .catch(err => {
                console.error('Error filtering the products:', err);
            });
    };

    return (
        <div>
            <Navbar />
            {/* Passing filtered items and handlePriceFilter to Showitems */}
            <Showitems products={items} handlePriceFilter={handlePriceFilter} />
        </div>
    );
}

export default Productlist;

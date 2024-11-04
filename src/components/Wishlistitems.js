import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import './Wishlistitems.css'; // Import your custom CSS file
import axios from 'axios';



const Wishlistitems = () => {
    const [wishlist, setWishlist] = useState([]);
    const userId = localStorage.getItem('userId'); // Get userId from localStorage

    useEffect(() => {
        const fetchWishlist = async () => {
            const userId = localStorage.getItem('userId');
            try {
                const response = await axios.get(`http://localhost:3001/wishlist/${userId}`);
                setWishlist(response.data.wishlist); // Ensure response.data.wishlist is defined
            } catch (error) {
                console.error("Error fetching wishlist:", error);
            }
        };
    
        fetchWishlist();
    }, []);

    const transferToCart = (product) => {
        const updatedWishlist = wishlist.filter(item => item.id !== product.id);
        
        localStorage.setItem('storedWishList', JSON.stringify(updatedWishlist));
        setWishlist(updatedWishlist);

        const cartItems = JSON.parse(localStorage.getItem('storedCart')) || [];
        const itemExistsInCart = cartItems.some(item => item.id === product.id);

        if (!itemExistsInCart) {
            const updatedCart = [...cartItems, { ...product, quantity: 1 }];
            localStorage.setItem('storedCart', JSON.stringify(updatedCart));
        }
    };

    const removeFromWishlist = async (itemId) => {
        try {
            // Make an API call to remove the item from the wishlist in the database
            await axios.delete(`http://localhost:3001/wishlist/${userId}/${itemId}`);
            console.log('Rrmeoved reached');
            
            // Remove the item locally after a successful delete
            const updatedWishlist = wishlist.filter(item => item.id !== itemId);
            setWishlist(updatedWishlist);
        } catch (error) {
            console.error("Error removing item from wishlist:", error);
        }
    };

    return (
        <div className="container">
            <h2 className="text-center mt-4">Wish List Items</h2>

            <div className="row justify-content-center">
                {wishlist.length > 0 ? (
                    wishlist.map(item => (
                        <div className="col-md-7 col-lg-6 mt-4 p-4 shadow bg-light" key={item.id}>
                            <div className="row">
                                <div className="col-4">
                                    <img src={`/images/${item.image}`} alt={item.name} className="img-fluid rounded" style={{ height: "180px" }} />
                                </div>

                                <div className="col-8">
                                    <h5 className="mt-4 text-primary">{item.name}</h5>
                                    <p className="text-success">Price: ${item.price}</p>

                                    <div className="d-flex justify-content-between mt-4">
                                        <button 
                                            className="btn btn-danger" style={{marginLeft:"10px"}}
                                            onClick={() => transferToCart(item)}
                                        >
                                            Move to Cart
                                        </button>
                                        <button 
                                            className="btn btn-danger" style={{marginRight:"180px"}}
                                            onClick={() => removeFromWishlist(item.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h5 className="text-center">Your wish list is empty!</h5>
                )}
            </div>
        </div>
    );
};

export default Wishlistitems;

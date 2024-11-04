import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Iteminfo.css'; // Import your CSS file
import './Cartitems.css'; // Import the new CSS file
import axios from 'axios';


const generateUserId = () => {
    return `user_${Math.random().toString(36).substr(2, 9)}`;
};
const Cartitems = () => {
    const navigate = useNavigate();
    const [itemsInCart, setItemsInCart] = useState(JSON.parse(localStorage.getItem('storedCart')) || []);
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        calculateTotalCost(itemsInCart);
    }, [itemsInCart]);

    const handleIncreaseQty = (itemId) => {
        const updatedItems = itemsInCart.map(item => {
            if (item.id === itemId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });

        localStorage.setItem('storedCart', JSON.stringify(updatedItems));
        setItemsInCart(updatedItems);
        calculateTotalCost(updatedItems);
    };

    const handleDecreaseQty = (itemId, qty) => {
        let updatedItems;

        if (qty === 1) {
            updatedItems = itemsInCart.filter(item => item.id !== itemId);
        } else {
            updatedItems = itemsInCart.map(item => {
                if (item.id === itemId) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });
        }

        localStorage.setItem('storedCart', JSON.stringify(updatedItems));
        setItemsInCart(updatedItems);
        calculateTotalCost(updatedItems);
    };
    const [wishlistData, setWishlistData] = useState([]);
    const handleTransferToWishlist =async (product) => {
        console.log("wish in cart");
        let userId = localStorage.getItem('userId') || generateUserId();
        
        
        const item = {
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: 1
        };
    
        try {
            await  axios.post('http://localhost:3001/wishlist/add', {
                userId,
                item
            }, {
                headers: {
                    'Content-Type': 'application/json' // Ensure the request is sent as JSON
                }
            });
             // Step 2: Fetch the updated wishlist
        const response = await axios.get(`http://localhost:3001/wishlist/${userId}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Update wishlistData state with the retrieved wishlist items
        setWishlistData(response.data.wishlist);
        navigate('/wishlistitems'); 
        } catch (error) {
            console.error("Error adding item to wishlist:", error);
        }
    };

    const handleRemoveItem = async (itemId) => {
        const updatedItems = itemsInCart.filter(item => item.id !== itemId);
        localStorage.setItem('storedCart', JSON.stringify(updatedItems));
        setItemsInCart(updatedItems);
        console.log("Remove button reached");
        console.log(updatedItems);
        calculateTotalCost(updatedItems);
    
        // Assuming you have a userId stored in localStorage
        const userId = localStorage.getItem('userId');
        
        try {
            await axios.delete('http://localhost:3001/cart/remove', {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    userId,
                    itemId // Pass the itemId to remove
                }
            });
            console.log("Item removed from database successfully");
        } catch (error) {
            console.error("Error removing item from database:", error);
        }
    };
    const calculateTotalCost = (items) => {
        const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setTotalCost(total);
    };

    return (
        <div className='container mt-5'>
            <h2 className="text-center mb-4">Shopping Cart</h2>
            <h4 className="text-center mb-4">Total: ${totalCost}</h4>

            <div className='row justify-content-center'>
                {itemsInCart.length > 0 ? (
                    itemsInCart.map(item => (
                        <div className='col-4 mb-4 cart-item shadow-sm p-3' key={item.id}>
                            <div className='row'>
                                <div className='col-4 text-center'>
                                    <img src={`/images/${item.image}`} alt={item.name} className="img-fluid" />
                                </div>

                                <div className='col-8'>
                                    <h5 className='cart-item-name'>{item.name}</h5>
                                    <p className='cart-item-price'>Price: ${item.price}</p>

                                    <div className='d-flex align-items-center'>
                                        <span className='quantity-label me-3'>Qty: {item.quantity}</span>
                                        <button className='btn plus' onClick={() => handleIncreaseQty(item.id)}>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                        <button className='btn minus' onClick={() => handleDecreaseQty(item.id, item.quantity)}>
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>
                                    </div>

                                    <div className='mt-3'>
                                        <button className='btn btn-danger'  onClick={() => handleTransferToWishlist(item)}>Move to Wishlist</button>
                                        <button className='btn btn-danger' style={{marginLeft:"18px"}}  onClick={() => handleRemoveItem(item.id)}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h5 className='text-center'>Your cart is empty!</h5>
                )}
            </div>
        </div>
    );
};

export default Cartitems;

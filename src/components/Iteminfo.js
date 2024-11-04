import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Iteminfo.css'; // Import your CSS file
import axios from 'axios';

const generateUserId = () => {
    return `user_${Math.random().toString(36).substr(2, 9)}`;
};
const Iteminfo = ({ product }) => {
    const navigate = useNavigate();

    const handleAddToCart = async (selectedItem) => {
        let storedCart = JSON.parse(localStorage.getItem('storedCart')) || [];
        const itemExists = storedCart.find(item => item.id === selectedItem.id);

        if (itemExists) {
            itemExists.quantity += 1;
        } else {
            storedCart.push({
                id: selectedItem.id,
                name: selectedItem.name,
                image: selectedItem.image,
                price: selectedItem.price,
                quantity: 1,
            });
        }

        localStorage.setItem('storedCart', JSON.stringify(storedCart));

        // Save the cart to the database
        const userId = localStorage.getItem('userId') || `user_${Math.random().toString(36).substr(2, 9)}`; // Generate user ID if not found

        try {
            await axios.post('http://localhost:3001/cart/add', {
                userId,
                items: storedCart,
            });
            console.log("Cart saved successfully");
        } catch (error) {
            console.error('Error saving cart to database:', error);
        }

        navigate('/cartitems');
    };




    const handleAddToWishlist = async (product) => {
        let userId = localStorage.getItem('userId') || generateUserId();
        
        
        const item = {
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: 1
        };
    
        try {
            const response = await axios.post('http://localhost:3001/wishlist/add', {
                userId,
                item
            }, {
                headers: {
                    'Content-Type': 'application/json' // Ensure the request is sent as JSON
                }
            });
    
            console.log(response.data.message);
            navigate('/wishlistitems'); // Navigate after adding to wishlist
        } catch (error) {
            console.error("Error adding item to wishlist:", error);
        }
    };

    return (
        <div className="container item-container mt-5 p-4 ">
            <div className="row">
                <div className="col-md-5 col-lg-4 image-box p-3">
                    <img src={`/images/${product.image}`} alt={product.name} className="item-image" />
                </div>

                <div className="col-md-6  mt-4 col-lg-6 item-details">
                    <h2 className="item-name border-bottom pb-2">{product.name}</h2>
                    
                    <p className="item-description my-3">{product.description}</p>
                    
                    <h4 className="item-price text-danger">Price: ${product.price}</h4>
                    
                    <div className="d-flex justify-content-start mt-4">
                        <button 
                            className="btn btn-primary me-3 px-4"
                            onClick={() => handleAddToCart(product)}>
                            Add to Cart
                        </button>
                        
                        <button 
                            className="btn btn-primary px-4"
                            onClick={() => handleAddToWishlist(product)}>
                            Wish List
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Iteminfo;

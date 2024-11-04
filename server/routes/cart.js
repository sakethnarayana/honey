const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart'); // Make sure this path is correct

// POST route to add items to the cart
router.post('/add', async (req, res) => {
    console.log("reached router cart.js");
    const { userId, items } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // If no cart exists for the user, create a new one
            cart = new Cart({ userId, items });
        } else {
            // If a cart exists, update the items
            cart.items = items; // This could also involve merging items based on your logic
        }

        await cart.save();
        res.status(200).json({ message: 'Cart saved successfully.', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error saving cart', error });
    }
});

// Assuming you already have required dependencies and Cart model
router.delete('/remove', async (req, res) => {
    console.log("Remove reached in cart.js routes");
    const { userId, itemId } = req.body;
    console.log(userId);

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Filter out the item from the cart
        cart.items = cart.items.filter(item => item.id !== itemId);
        
        await cart.save();
        res.status(200).json({ message: 'Item removed from cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error removing item from cart', error });
    }
});


module.exports = router;

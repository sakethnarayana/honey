const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');

// POST route to add items to the wishlist
router.post('/add', async (req, res) => {
    console.log("reached router whislist.js");
    const { userId, item } = req.body;

    try {
        let wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
            // If no wishlist exists for the user, create a new one
            wishlist = new Wishlist({ userId, items: [item] });
        } else {
            // Check if the item already exists in the wishlist
            const existingItem = wishlist.items.find(i => i.id === item.id);
            if (!existingItem) {
                wishlist.items.push(item); // Add new item
            }
        }

        await wishlist.save();
        res.status(200).json({ message: 'Item added to wishlist successfully.', wishlist });
    } catch (error) {
        res.status(500).json({ message: 'Error adding item to wishlist', error });
    }
});

module.exports = router;

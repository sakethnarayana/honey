const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // Store user ID
    items: [
        {
            id: { type: String, required: true },
            name: { type: String, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, default: 1 }, // Default quantity is 1
        },
    ],
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;

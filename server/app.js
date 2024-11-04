const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors'); // Import cors
const Wishlist = require('./models/Wishlist');
const app = express();
const http = require('http').Server(app);
const mongoose = require("mongoose");

// MongoDB connection
mongoose.connect("mongodb+srv://tapasyareddy2505:iGWWfMTHxrIXqOdi@cluster0.engfg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully."))
  .catch(err => console.error("MongoDB connection error:", err));

  const buildPath = path.join(__dirname, '.', 'public', 'build');
  app.use(express.static(path.join(buildPath)));

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3002', // Allow requests from this origin
    methods: ['GET', 'POST','DELETE'], // Specify allowed methods
    credentials: true // Allow credentials if needed
}));

http.listen(3001, function() {
    console.log('Server is running on port 3001');
});
app.use(express.json());
const wishlistRouter = require('./routes/wishlist'); 
app.use('/wishlist', wishlistRouter); // Add this line for wishlist routes

// Define getWishlistByUserId function
const getWishlistByUserId = async (userId) => {
  const wishlist = await Wishlist.findOne({ userId });
  return wishlist ? wishlist.items : [];
};

// Define the route using getWishlistByUserId
app.get('/wishlist/:userId', (req, res) => {
  const { userId } = req.params;

  getWishlistByUserId(userId).then(wishlist => {
      res.json({ wishlist });
  }).catch(error => {
      console.error("Error retrieving wishlist:", error);
      res.status(500).json({ error: "Failed to retrieve wishlist" });
  });
});
app.delete('/wishlist/:userId/:itemId', async (req, res) => {
  const { userId, itemId } = req.params;

  try {
      // Use $pull to remove the item with the specified itemId from the items array
      const result = await Wishlist.updateOne(
          { userId: userId },
          { $pull: { items: { id: itemId } } }
      );

      if (result.nModified === 0) {
          return res.status(404).json({ message: "Item not found in wishlist" });
      }

      res.status(200).json({ message: "Item removed from wishlist" });
  } catch (error) {
      console.error("Error removing item from wishlist:", error);
      res.status(500).json({ error: "Failed to remove item from wishlist" });
  }
});
// Rest of your middleware and routes setup
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const cartRouter = require('./routes/cart'); 

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cart', cartRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({
      message: err.message,
      error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;

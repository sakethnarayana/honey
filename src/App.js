import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Productlist from './components/Productlist';
import Productdetails from './components/Productdetails';
import Wishlist from './components/Wishlist';
import Cart from './components/Cart';




const App=()=>
  {
    return (
      <Routes>
        <Route path="/"  element={<Productlist/>} />
        <Route path="/wishlistitems"  element={<Wishlist/>} />
        <Route path="/cartitems"  element={<Cart/>} />
        <Route path="/productdescription/:product"  element={<Productdetails/>} />
       
  
      </Routes>
  
    );
    
    
  }
  
  export default App;
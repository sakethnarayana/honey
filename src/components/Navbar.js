import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="container-fluid p-3 navbar-bg">
            <div className="row align-items-center">

                {/* Left Side - Logo or Brand Name */}
                <div className="col-4">
                    <Link to="/" className="navbar-brand fs-3 text-white" style={{fontStyle:"italic"}}>PEARLS AND PETALS</Link>
                </div>

                {/* Right Side - Links */}
                <div className="col-8">
                    <div className="row justify-content-end">
                        <div className="col-3 text-center">
                            <Link to="/" className="btn btn-outline-light w-100">Product List</Link>
                        </div>
                        <div className="col-3 text-center">
                            <Link to="/wishlistitems" className="btn btn-outline-light w-100">Wish List</Link>
                        </div>
                        <div className="col-3 text-center">
                            <Link to="/cartitems" className="btn btn-outline-light w-100">Cart</Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Navbar;

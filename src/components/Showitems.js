import React from 'react';
import { Link } from 'react-router-dom';
import './Showitems.css';  // Assuming you moved styles to an external CSS file

const Showitems = ({ products,  handlePriceFilter }) => {

    return (
        <div className="container mt-4 p-4 bg-light">
            {/* Search Section */}
            <div className="row mb-4">
                <div className="col-md-3" style={{marginLeft:"900px"}}>
                    <form>
                        <input 
                            type="text" 
                            name="input_price" 
                            placeholder="filter by price" 
                            className="form-control"
                            onChange={(event) =>  handlePriceFilter(event.target.value)}
                        />
                    </form>
                </div>
            </div>

            {/* Products Grid */}
            <div className="row">
                {products.map((product, index) => (
                    <div key={index} className="col-md-3 mb-4">
                        <Link 
                            to={`/productdescription/${encodeURIComponent(JSON.stringify(product))}`} 
                            className="product-link"
                        >
                            <div className="card h-100">
                                <img 
                                    src={`/images/${product.image}`} 
                                    className="card-img-top img-fluid" 
                                    alt={product.name} 
                                    style={{ height: '280px', objectFit: 'cover' }} 
                                />
                                <div className="card-body text-center">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">${product.price}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Showitems;

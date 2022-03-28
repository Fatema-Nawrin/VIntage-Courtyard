import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Card.css'

const Card = (props) => {
    const { addInCart, product } = props;
    const { name, price, img, id } = product;
    return (
        <div className='product'>
            <img src={img} alt="" />
            <div key={id} className="product-info">
                <h3>{name}</h3>
                <p>Price: ${price}</p>
                <button onClick={() => addInCart(product)} className='btn'>
                    <p>Add to cart</p>
                    <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
                </button>
            </div>
        </div>
    );
};

export default Card;
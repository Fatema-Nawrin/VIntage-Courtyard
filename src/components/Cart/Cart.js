import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Cart.css'

const Cart = (props) => {
    const { cart } = props;
    const { reset, chooseOne, item, deleteProduct } = props;
    // calculation 
    let totalPrice = 0;
    let quantity = 0;
    let shipping = 0;
    for (const product of cart) {
        quantity = quantity + product.quantity;
        shipping = shipping + product.shipping;
        totalPrice = totalPrice + product.price * product.quantity;
    }
    const grandTotal = totalPrice + shipping;

    return (
        <div className='cart'>
            <h2>Selected Products</h2>

            {
                cart.map(product => (
                    <div key={product.id} className='cart-list'>
                        <img src={product.img} alt="" />
                        <p>{product.name}</p>
                        <p key={product.id}>{product.quantity}</p>
                        <button onClick={() => deleteProduct(product)}>
                            <FontAwesomeIcon icon={faCircleMinus}></FontAwesomeIcon></button>
                    </div>))
            }

            {/* <button className='cart-btn' onClick={chooseOne}>Choose One For Me</button> */}
            <br />
            <button className='cart-btn' onClick={reset}>Reset</button>

            <div key={item.id} className={item.length === 0 ? 'hidden-item' : 'visible-item'}>
                <h3>Chosen One:</h3>
                <img src={item.img} alt="" />
                <h4>{item.name}</h4>
            </div>

            <div className='calculation'>
                <h2>Order Summary</h2>
                <p> <strong>Chosen Items : </strong>{quantity}</p>
                <p> <strong>Item Price : </strong>{totalPrice}</p>
                <p> <strong>Shipping : </strong>{shipping}</p>
                <p> <strong>Total Price : </strong>  {grandTotal}</p>
            </div>

        </div >
    );
};

export default Cart;
import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getStoredCart, removeFromDb } from '../../utilities/fakedb';
import Card from '../Card/Card';
import Cart from '../Cart/Cart';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch('data.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        if (products.length) {
            const storedCart = getStoredCart();
            const savedCart = [];
            for (const id in storedCart) {
                const addedProduct = products.find(product => product.id === id);
                if (addedProduct) {
                    const quantity = storedCart[id];
                    addedProduct.quantity = quantity;
                    savedCart.push(addedProduct)
                }
            }
            setCart(savedCart)
        }

    }, [products]);

    const [cart, setCart] = useState([]);
    const addInCart = (selectedProduct) => {
        if (selectedProduct.quantity > 3) {
            alert('Sorry, you can select four items of each product')
            return
        }
        else {
            let newCart = [];
            const exist = cart.find(product => product.id === selectedProduct.id)
            if (!exist) {
                selectedProduct.quantity = 1;
                newCart = [...cart, selectedProduct]
            }
            else {
                exist.quantity = exist.quantity + 1;
                const rest = cart.filter(product => product.id !== selectedProduct.id)
                newCart = [...rest, selectedProduct]
            }
            addToDb(selectedProduct.id)
            setCart(newCart);
        }
    }

    const deleteProduct = (selectedProduct) => {
        let newCart = [];
        const exist = cart.find(product => product.id === selectedProduct.id)
        if (exist.quantity === 1) {
            newCart = cart.filter(product => product.id !== selectedProduct.id);
        }
        else {
            exist.quantity = exist.quantity - 1;
            const rest = cart.filter(product => product.id !== selectedProduct.id)
            newCart = [...rest, exist]
        }
        removeFromDb(selectedProduct.id)
        setCart(newCart)
    }

    const [item, setItem] = useState([])
    const chooseOne = () => {
        if (cart.length > 0) {
            let choosenProduct = cart[Math.floor(Math.random() * cart.length)]
            setItem(choosenProduct);
        }
    };

    const reset = () => {
        setCart([]);
        setItem([]);
        deleteShoppingCart();
    }

    return (
        <div className='container'>
            <div className="products-container">
                {
                    products.map(product => <Card
                        product={product}
                        key={product.id}
                        addInCart={addInCart}></Card>)
                }
            </div>

            <div className='cart-container'>
                <Cart cart={cart}
                    reset={reset}
                    chooseOne={chooseOne}
                    item={item}
                    deleteProduct={deleteProduct}>
                </Cart>
            </div>

        </div>
    );
};

export default Shop;
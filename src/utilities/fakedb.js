// use local storage to manage cart data
const addToDb = id => {
    let shoppingCart = {};

    //get the shopping cart from local storage
    const storedCart = localStorage.getItem('shopping-cart');
    if (storedCart) {
        shoppingCart = JSON.parse(storedCart);
    }
    // add quantity
    const quantity = shoppingCart[id];
    if (quantity) {
        const newQuantity = quantity + 1;
        shoppingCart[id] = newQuantity;
    }
    else {
        shoppingCart[id] = 1;
    }
    localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
}
const getStoredCart = () => {
    //get the shopping cart from local storage
    const storedCart = localStorage.getItem('shopping-cart');
    return JSON.parse(storedCart);
}

const removeFromDb = id => {
    let shoppingCart = {};
    const storedCart = localStorage.getItem('shopping-cart');
    if (storedCart) {
        shoppingCart = JSON.parse(storedCart);
    }
    const quantity = shoppingCart[id];
    if (quantity > 1) {
        const newQuantity = quantity - 1;
        shoppingCart[id] = newQuantity;
    }
    else {
        delete shoppingCart[id];
    }
    localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));

}

const deleteShoppingCart = () => {
    localStorage.removeItem('shopping-cart');
}

export {
    addToDb,
    removeFromDb,
    getStoredCart,
    deleteShoppingCart
}
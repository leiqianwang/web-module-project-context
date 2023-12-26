import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

//contexts
import { ProductContext } from './contexts/ProductContext';
import { CartContext } from './contexts/CartContext';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState([]);

	const addItem = item => {
		// add the given item to the cart
		//Context API part is not yet implemented,check if the item already in the card
		const existingItem = cart.find(cartItem => cartItem.id === item.id);

		if(existingItem) {
			// If the item is already in the cart, update its quantity
			setCart(cart.map(cartItem =>  {
				if(cartItem.id === item.id) {
					return {...cartItem, quantity: cartItem.quantity + 1};
				}
				return cartItem;
			}));
		}else {      // If the item is not in the cart, add it with a quantity of 1
			setCart([...cart, {...item, quantity: 1}])
		}
	};

	return (
		<div className="App">

       <ProductContext.Provider value={{ products, addItem }}>
	      <CartContext.Provider value={{ cart, setCart }}>
			     <Navigation />

			{/* Routes */}
			<Route exact path="/">
                 <Products />
            </Route>

			<Route path="/cart">
				<ShoppingCart  />
			</Route>
			</CartContext.Provider>
			   </ProductContext.Provider>
		</div>
	);
}

export default App;

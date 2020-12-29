import React from "react";
import AppRouter from './components/router/AppRouter';
import CartContextProvider from "./context/cartContext";


const App = () => (

		<div>
			<CartContextProvider>
				<AppRouter/>
			</CartContextProvider>
		</div>

);

export default App;
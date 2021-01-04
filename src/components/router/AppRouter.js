import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Header from '../main/Header';
import Footer from '../main/Footer';
import PageNotFound from '../main/PageNotFound';
import Home from '../home/Home';
import CartPage from '../cart/CartPage';
import ProductPage from '../product/ProductPage';
import SearchPage from '../search/SearchPage';


const AppRouter = () => (
    <BrowserRouter>
            <Header/>

            <Switch>
                <Route path="/" exact>
                    <Redirect to="/home" />
                </Route>
                <Route path="/home" component={Home}/>
                <Route path="/cart" component={CartPage}/>
                <Route path="/product/:isbn" component={ProductPage}/>
                <Route path="/search/:value" component={SearchPage}/>
                <Route path="*" component={PageNotFound}/>
            </Switch>

            {/* <Footer/> */}

    </BrowserRouter>
);


export default AppRouter;
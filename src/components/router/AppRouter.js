import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Header from '../main/Header';
import Footer from '../main/Footer';
import PageNotFound from '../main/PageNotFound';
import Home from '../home/Home';
import CartPage from '../cart/CartPage';
import ProductPage from '../product/ProductPage';
import SearchPage from '../search/SearchPage';
import SignInPage from '../signin/SignInPage';
import UserContextProvider from '../../context/userContext';


const AppRouter = () => (
    <BrowserRouter>
        <UserContextProvider>
                <Header/>

                <Switch>
                    <Route path="/" exact>
                        <Redirect to="/home" />
                    </Route>
                    <Route path="/home" component={Home}/>
                    <Route path="/cart" component={CartPage}/>
                    <Route path="/product/:isbn" component={ProductPage}/>
                    <Route path="/search/:value" component={SearchPage}/>
                    <Route path="/signin" component={SignInPage}/>
                    <Route path="*" component={PageNotFound}/>
                </Switch>

                {/* <Footer/> */}
        </UserContextProvider>
    </BrowserRouter>
);


export default AppRouter;
import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Header from '../main/Header';
import Footer from '../main/Footer';


const AppRouter = () => (
    <BrowserRouter>
            <Header/>

            <Switch>
                
            </Switch>

            <Footer/>

    </BrowserRouter>
);


export default AppRouter;
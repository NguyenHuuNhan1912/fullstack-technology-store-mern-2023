import Header from 'component/header/Header';
import Footer from 'component/footer/Footer';

import { Outlet, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import cartApi from 'api/modules/cart.api';
const AppLayout = () => {
    const url = useParams();
    useEffect(() => {
        window.scrollTo(0,0);
    }, [url]);
    return (
        <div className="appLayout">
            <Header />
                <Outlet
                />
            <Footer />
        </div>
    )
}
export default AppLayout;
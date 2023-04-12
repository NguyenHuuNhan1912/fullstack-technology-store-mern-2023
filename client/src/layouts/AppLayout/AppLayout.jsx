import Header from 'component/header/Header';
import Footer from 'component/footer/Footer';

import { Outlet, useParams } from 'react-router-dom';
import { useEffect, useState, createContext } from 'react';
import cartApi from 'api/modules/cart.api';
export const QuantityCart = createContext();
const AppLayout = () => {
    const [call, setCall] = useState(true);
    const url = useParams();
    const callAppLayout =  () => {
        setCall(!call);
    }
    console.log(call);
    useEffect(() => {
        window.scrollTo(0,0);
    }, [url]);
    return (
        <QuantityCart.Provider value={callAppLayout}>
            <div className="appLayout">
                <Header
                    call={call}
                />
                <Outlet/>
                <Footer/>
            </div>
        </QuantityCart.Provider>
    )
}
export default AppLayout;
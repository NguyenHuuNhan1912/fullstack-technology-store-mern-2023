import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';


import Homepage from 'pages/homepage/Homepage'
import Introduce from 'pages/introduce/Introduce';
import Cart from 'pages/cart/Cart';
import Discount from 'pages/discount/Discount';
import Recruit from 'pages/recruit/Recruit';
import FormRecruit from 'pages/formRecruit/FormRecruit';

import Contact from 'pages/contact/Contact';
import Signin from 'pages/signin/Signin';
import Signup from 'pages/signup/Signup';
import NotFound from 'pages/notFound/NotFound';
import Overview from 'pages/dashboard/overview/Overview';
import Product from 'pages/dashboard/product/Product';
import Category from 'pages/dashboard/category/Category';
import Customers from 'pages/dashboard/customer/Customers';
import Orders from 'pages/dashboard/Orders';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import DashBoardLayout from './layouts/DashboardLayout/DashboardLayout';
import AppLayout from './layouts/AppLayout/AppLayout';
import ProductDetail from 'pages/dashboard/ProductDetail/ProductDetail';
import 'react-toastify/dist/ReactToastify.css';
import ProductApp from 'pages/productApp/ProductApp';
import Detail from 'pages/detail/Detail';
const App = () => {
  return (
    <Router>
      <div className="App">
        <ToastContainer 
        />
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Homepage />} />
            <Route path="introduce" element={<Introduce />} />
            <Route path="discount" element={<Discount />} />
            <Route path="recruit" element={<Recruit />} />
            <Route path="recruit/formrecruit/:position" element={<FormRecruit />} />
            <Route path="contact" element={<Contact />} />
            <Route path="signin" element={<Signin />} />
            <Route path="signup" element={<Signup />} />
            <Route path="product/detail/:id" element={<Detail/>}/>
            <Route path="product/:type/:brand" element={<ProductApp/>}/>
            <Route path="cart" element={<Cart />} />
          </Route>
          <Route element={<AuthLayout/>}>
              <Route path="signin" element={<Signin/>}/>
              <Route path="signup" element={<Signup/>}/>
          </Route>
          <Route path="dashboard" element={<DashBoardLayout />}>
              <Route index element={<Overview/>}/>
              <Route path="product" element={<Product/>}/>
              <Route path="product/:id" element={<ProductDetail/>}/>
              <Route path="category" element={<Category/>}/>
              <Route path="customers" element={<Customers/>}/>
              <Route path="orders" element={<Orders/>}/>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
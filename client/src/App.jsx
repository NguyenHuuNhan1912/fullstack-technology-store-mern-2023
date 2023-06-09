// Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Module
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Page
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
import Order from 'pages/dashboard/order/Order';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import DashBoardLayout from './layouts/DashboardLayout/DashboardLayout';
import AppLayout from './layouts/AppLayout/AppLayout';
import ProductDetail from 'pages/dashboard/ProductDetail/ProductDetail';
import ProductApp from 'pages/productApp/ProductApp';
import Detail from 'pages/detail/Detail';
import AccountLayout from 'layouts/AccountLayout/AccountLayout';
import OverviewAccount from 'pages/account/overviewAccount/OverviewAccount';
import OrderAccount from 'pages/account/orderAccount/OrderAccount';
import NotiAccount from 'pages/account/notiAccount/NotiAccount';
import NewsAccount from 'pages/account/newsAccount/NewsAccount';
import CustomersOrder from 'pages/dashboard/customerOrder/CustomerOrder';
import OrderDetail from 'pages/dashboard/orderDetail/OrderDetail';

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
              <Route path="orders" element={<Order/>}/>
              <Route path="orders/order-detail/:id" element={<OrderDetail/>}/>
              <Route path="customers/customer-order/:id" element={<CustomersOrder/>}/>
          </Route>
          <Route path="account" element={<AccountLayout />}>
            <Route index element={<OverviewAccount/>}/>
            <Route path="order" element={<OrderAccount/>}/>
            <Route path="noti" element={<NotiAccount/>}/>
            <Route path="news" element={<NewsAccount/>}/>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
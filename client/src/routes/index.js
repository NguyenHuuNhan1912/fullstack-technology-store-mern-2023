import Homepage from 'pages/Homepage';
import Introduce from 'pages/Introduce';
import Discount from 'pages/Discount';
import Recruit from 'pages/Recruit';
import Contact from 'pages/Contact';
import Cart from 'pages/Cart';
import Signin from 'pages/Signin';
import Signup from 'pages/Signup';

const routes = [
    {
        path: '/',
        component: Homepage,
    },
    {
        path: '/introduce',
        component: Introduce,
    },
    {
        path: '/Discount',
        component: Discount,
    },
    {
        path: '/recruit',
        component: Recruit,
    },
    {
        path: '/Contact',
        component: Contact,
    },
    {
        path: '/cart',
        component: Cart,
    },
    {
        path: '/signin',
        component: Signin,
    },
    {
        path: '/signup',
        component: Signup,
    },
]

export default routes;
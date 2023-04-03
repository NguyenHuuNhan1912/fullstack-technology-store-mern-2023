import { clsx } from 'clsx';
import style from './cart.module.scss';
import images from 'assets/images/index';
import { Row, Col } from 'antd';
import cartApi from 'api/modules/cart.api';
import { useState, useEffect, useContext } from 'react';
import { AiFillPlusCircle, AiFillMinusCircle, AiFillDelete } from 'react-icons/ai';
import { ImCart } from 'react-icons/im';
import productApi from 'api/modules/product.api';
import { useFormik } from "formik";
import * as Yup from 'yup';
import toastNotification from 'handler/toast.handler';
import orderApi from 'api/modules/order.api';
import { Link } from 'react-router-dom';
import { QuantityCart } from 'layouts/AppLayout/AppLayout';
import SelectSpeed from 'component/selectSpeed/SelectSpeed';
import provincesApi from 'api/modules/provinces.api';
const Cart = () => {
    const [cart, setCart] = useState({});
    const [productCart, setProductCart] = useState([]);
    const [apiProvinces, setApiProvinces] = useState([]);
    const [apiDistricts, setApiDistricts] = useState([]);
    const [apiHometowns, setApiHometowns] = useState([]);
    const [checkLogin, setCheckLogin] = useState(JSON.parse(localStorage.getItem("idUser")));
    const updateQuantityCart = useContext(QuantityCart);
    const [address, setAddress] = useState(
        {
            province: '',
            districts: '',
            hometown: ''
        }
    );
    const getCartApi = async () => {
        if (checkLogin !== null) {
            console.log("call thanh toan");
            try {
                const response = await cartApi.searchIdUser({
                    idUser: JSON.parse(localStorage.getItem("idUser")),
                })
                setCart(response.cart);
                setProductCart(response.cart.product);
                updateQuantityCart();
            }
            catch (err) {
                console.log(err);
            }
        }
    }
    const updateProduct = async (id, data) => {
        try {
            const response = await productApi.update(id, data);
            console.log(response);
        }
        catch (err) {
            console.log(err);
        }
    }
    const updateCart = async () => {
        try {
            const response = await cartApi.update(cart._id, cart);
            console.log(response);
            getCartApi();
            
        }
        catch (err) {
            console.log(err);
        }
    }
    const handlePercent = (price, discount) => {
        return price - (price * (discount / 100));
    }
    const totalCart = () => {
        let total = 0;
        cart.product.forEach((item, index) => {
            total += handlePercent(Number(item.idRef.price), Number(item.idRef.discount)) * Number(item.quantity);
        });

        return String(total);
    }
    const handleQuantity = (id, type) => {
        let indexProduct;
        let quantityCart;
        let quantityProduct;
        const product = cart.product.find((item, index) => {
            if (id === item.idRef._id) {
                indexProduct = index;
                return item;
            }
        });

        if (type === "minus") {
            if (product.quantity >= 2) {
                quantityCart = Number(product.quantity) - 1;
                quantityProduct = Number(product.idRef.quantity) + 1;
                cart.product[indexProduct].quantity = String(quantityCart);
                cart.total = totalCart();
                updateCart();
                updateProduct(product.idRef._id, { quantity: quantityProduct });
                getCartApi();
            }
            else {
                toastNotification('error', 'Số lượng sản phẩm của bạn đang là 1 không thể giảm được nữa !', 1000);
            }
        }
        else {
            console.log('type plus');
            if (product.idRef.quantity <= 0) {
                toastNotification('success', "Số lượng sản phẩm đã được bạn mua hết, cảm ơn bạn !", 1000);
            }
            else {
                quantityCart = Number(product.quantity) + 1;
                quantityProduct = Number(product.idRef.quantity) - 1;
                cart.product[indexProduct].quantity = String(quantityCart);
                cart.total = totalCart();
                updateCart();
                updateProduct(product.idRef._id, { quantity: quantityProduct });
                getCartApi();
            }
        }
    }
    const handleDelete = (id) => {
        
        console.log('delete');
        const product = cart.product.filter((item, index) => (id !== item.idRef._id));
        cart.product = product;
        cart.total = totalCart();
        updateCart();
        toastNotification("success", "Đã xóa sản phẩm ra khỏi giỏ hàng !", 1000);
    }
    const handleChangeProvince = (e) => {
        const name = e.target.value;
        const province = apiProvinces.filter((item, index) => name === item.name);
        const codeDistricts = province[0].code;
        console.log(codeDistricts);
        fetchDistricts(codeDistricts);
        setAddress({ ...address, province: name });
    }
    const handleChangeDistricts = (e) => {
        const name = e.target.value;
        const district = apiDistricts.filter((item, index) => name === item.name);

        const codeHometown = district[0].code;
        console.log(codeHometown);
        fetchHometown(codeHometown);
        setAddress({ ...address, districts: name });
    }
    const handleChangeHometown = (e) => {
        console.log(e.target.value);
        const name = e.target.value;
        setAddress({ ...address, hometown: name });
    }
    const fetchHometown = async (code) => {
        try {
            const response = await provincesApi.getAll('d', String(code), {
                depth: 2, 
            });
            setApiHometowns(response.data.wards);
        }
        catch(err ){
            console.log(err);
        }
    }
    const fetchDistricts = async (code) => {
        try {
            const response = await provincesApi.getAll('p', String(code), {
                depth: 2
            })
            setApiDistricts(response.data.districts);
        }
        catch(err) {
            console.log(err);
        }
    }
    const fectchProvince = async () => {
        try {
            const response = await provincesApi.getAll('p', '', {
                depth: 2
            })
            setApiProvinces(response.data);
        }
        catch(err) {
            console.log(err);
        }
    }
    const createOrder = async (data) => {
        try {
            const response = await orderApi.create(data);
            console.log(response.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleOrder = (data) => {
        createOrder(data);
        cart.product = [];
        cart.total = "0";
        updateCart();
        toastNotification("success", "Đơn hàng của bạn đã được thanh toán !", 1500);
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            numberPhone: '',
            address: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Tên người nhận không thể để trống"),
            numberPhone: Yup.string().required("Số điện thoại không được để trống").matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Số điện thoại không đúng định dạng"),
            address: Yup.string().required("Địa chỉ cụ thể không thể để trống"),
        }),
        onSubmit: async (values, { resetForm }) => {
            // console.log(values);
            const inforOrder = {
                ...values,
                ...address,
                total: cart.total,
                cart: cart,
                idUser: JSON.parse(localStorage.getItem("idUser")),
            }
            handleOrder(inforOrder);
        }
    });
    useEffect(() => {
        fectchProvince();
        getCartApi();
    }, []);
    console.log("CART");
    console.log(cart);
    console.log("CART");

    // console.log(productCart);
    // console.log(apiHometowns);
    return (
        <main className={clsx(style.main)}>
            <SelectSpeed />
            {
                (checkLogin === null)
                    ?
                    (
                        <section className={clsx(style.login)}>
                            <Row gutter={[{xl: 0}, {xl: 0}]} align="middle">
                                <Col xl={12}>
                                    <section className={clsx(style.login__body)}>
                                        <h1>Bạn cần đăng nhập để tiếp tục</h1>
                                        <Link to="/signin">
                                            <button>Đăng nhập</button>
                                        </Link>
                                    </section>
                                </Col>
                                <Col xl={12}>
                                    <section className={clsx(style.login__head)}>
                                        <img src={images.signin.login} alt="img" />
                                    </section>
                                </Col>
                            </Row>
                        </section>
                    )
                    :
                    (
                        <section className={clsx(style.cart)}>
                            <Row gutter={[{ xl: 30 }, { xl: 30 }]}>
                                <Col xl={24}>
                                    <section className={clsx(style.cart__title)}>
                                        <div>
                                            <ImCart className={clsx(style.icon)} />
                                            <h1>Giỏ hàng</h1>
                                        </div>
                                    </section>
                                </Col>
                                {
                                    (productCart.length === 0)
                                        ?
                                        <Col xl={24}>
                                            <section className={clsx(style.cart__cartEmpty)}>
                                                <div></div>
                                                {/* <svg enable-background="new 0 0 320.37 354.98" viewBox="0 0 320.37 354.98" xmlns="http://www.w3.org/2000/svg"><path d="m230.26 281.3h-140.14c-6.6 0-12-5.4-12-12l-17-107.63c0-6.6 5.4-12 12-12h174.14c6.6 0 12 5.4 12 12l-17 107.63c0 6.6-5.4 12-12 12z" fill="#75c8ac"/><circle cx="116.4" cy="210.7" fill="#1f352d" r="8.86"/><circle cx="203.84" cy="210.7" fill="#1f352d" r="8.86"/><path d="m142.56 252.32c-.39 0-.78-.11-1.12-.35-.91-.62-1.15-1.87-.53-2.78 3.05-4.49 10.66-7.38 19.37-7.38 8.15 0 15.55 2.63 18.87 6.7.7.86.57 2.12-.29 2.81-.86.7-2.12.57-2.81-.29-2.54-3.13-8.88-5.23-15.76-5.23-7.2 0-13.81 2.32-16.07 5.63-.39.59-1.02.89-1.66.89z" fill="#1f352d"/><path d="m271.37 163.63h-222.93c-6.6 0-12-5.4-12-12v-15.19c0-6.6 5.4-11 12-11h222.93c6.6 0 12 4.4 12 11v15.19c0 6.6-5.4 12-12 12z" fill="#75c8ac"/><path d="m97.12 269.3-13.52-85.58h172.17l3.17-20.09h-178.52-19l16.7 105.67c0 6.6 5.4 12 12 12h19c-6.6 0-12-5.4-12-12z" opacity=".1"/><path d="m283.2 232.23-1.51 1.51c-2.93 2.93-7.73 2.93-10.66 0l-83.55-83.55c-2.93-2.93-2.93-7.73 0-10.66l1.51-1.51c2.93-2.93 7.73-2.93 10.66 0l83.55 83.55c2.93 2.93 2.93 7.73 0 10.66z" fill="#1f352d"/><path d="m37.92 233.74-1.51-1.51c-2.93-2.93-2.93-7.73 0-10.66l83.55-83.55c2.93-2.93 7.73-2.93 10.66 0l1.51 1.51c2.93 2.93 2.93 7.73 0 10.66l-83.55 83.55c-2.94 2.93-7.73 2.93-10.66 0z" fill="#1f352d"/><ellipse cx="160.19" cy="339.02" fill="#ededed" rx="90.7" ry="11.3"/><path d="m261.58 77.39c.02 5.13-4.17 9.27-9.35 9.23-4.94-.04-8.97-4.09-9.03-9.06-.06-5.16 4.09-9.38 9.2-9.36 5.03.02 9.16 4.16 9.18 9.19zm-9.16 2.88c1.8-.15 2.82-1.21 2.81-2.87-.01-1.69-1.14-2.73-2.83-2.88-1.51-.13-3.04 1.5-2.9 3.03.17 1.73 1.22 2.62 2.92 2.72z" fill="#acf2e5"/><path d="m23.85 108.39c.02 4.16-3.39 7.53-7.59 7.49-4.01-.03-7.28-3.32-7.33-7.36-.05-4.19 3.32-7.62 7.47-7.6 4.08.03 7.44 3.39 7.45 7.47zm-7.44 2.34c1.46-.12 2.29-.98 2.28-2.33-.01-1.37-.93-2.22-2.3-2.34-1.23-.11-2.47 1.22-2.35 2.46.14 1.41.99 2.13 2.37 2.21z" fill="#acf2e5"/><path d="m123.67 36.65c-7.13 0-12.33-5.16-12.36-12.24-.03-7.06 5.27-12.63 12.09-12.71 6.93-.08 12.96 5.89 12.86 12.75-.11 6.89-5.58 12.2-12.59 12.2zm.25-8.53c2.13-.01 3.35-1.52 3.72-3.73.31-1.87-1.75-3.94-3.79-4.05-2-.11-3.92 1.71-4.01 3.8-.08 2.19 1.55 3.92 4.08 3.98z" fill="#fddeff"/><path d="m80.67 78.57c-1.83.06-3.46-1.45-3.56-3.29-.1-1.92 1.5-3.64 3.41-3.66 1.86-.02 3.38 1.49 3.42 3.4.05 1.87-1.44 3.49-3.27 3.55z" fill="#acf2e5"/><path d="m202.67 39.57c-1.83.06-3.46-1.45-3.56-3.29-.1-1.92 1.5-3.64 3.41-3.66 1.86-.02 3.38 1.49 3.42 3.4.05 1.87-1.44 3.49-3.27 3.55z" fill="#acf2e5"/><path d="m302.69 122.39c-.07 3.41-3.06 6.24-6.44 6.07-3.11-.16-5.86-3.15-5.82-6.35.04-3.15 2.94-6.03 6.09-6.03 3.37-.02 6.22 2.9 6.17 6.31z" fill="#fddeff"/><path d="m170.69 83.39c-.07 3.41-3.06 6.24-6.44 6.07-3.11-.16-5.86-3.15-5.82-6.35.04-3.15 2.94-6.03 6.09-6.03 3.37-.02 6.22 2.9 6.17 6.31z" fill="#fddeff"/><path d="m56.84 125.44h-8.4c-6.6 0-12 4.4-12 11v15.19c0 6.6 5.4 12 12 12h8.4c-10.42-19.09 0-38.19 0-38.19z" opacity=".1"/><g fill="#fff"><path d="m217.65 247.73c4.53 0 4.53-7.04 0-7.04-4.52.01-4.53 7.04 0 7.04z"/><path d="m228.34 255.31c4.53 0 4.53-7.04 0-7.04-4.52.01-4.53 7.04 0 7.04z"/><path d="m217.78 263.45c4.53 0 4.53-7.04 0-7.04-4.53.01-4.54 7.04 0 7.04z"/><path d="m206.96 255.31c4.53 0 4.53-7.04 0-7.04-4.52.01-4.53 7.04 0 7.04z"/><path d="m102.67 247.73c4.53 0 4.53-7.04 0-7.04-4.53.01-4.53 7.04 0 7.04z"/><path d="m113.36 255.31c4.53 0 4.53-7.04 0-7.04-4.53.01-4.53 7.04 0 7.04z"/><path d="m102.79 263.45c4.53 0 4.53-7.04 0-7.04-4.52.01-4.53 7.04 0 7.04z"/><path d="m91.98 255.31c4.53 0 4.53-7.04 0-7.04-4.53.01-4.53 7.04 0 7.04z"/></g></svg> */}
                                                <h1>Giỏ hàng chưa có sản phẩm</h1>
                                                <Link to="/">
                                                    <button>Mua sắm ngay</button>
                                                </Link>
                                            </section>
                                        </Col>
                                        :
                                        (
                                            <>
                                                <Col xl={16}>
                                                    <section className={clsx(style.cart__list)}>
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th>Hình ảnh</th>
                                                                    <th>Tên sản phẩm</th>
                                                                    <th>Giá</th>
                                                                    <th>Số lượng</th>
                                                                    <th>Xóa</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    productCart.length > 0 &&
                                                                    productCart.map((item, index) => {
                                                                        return (
                                                                            <tr key={index}>
                                                                                <td>
                                                                                    <img src={`data:image/png;base64,${item.idRef.img}`} alt="img" />
                                                                                </td>
                                                                                <td className={clsx(style.name)}>{item.idRef.name}</td>
                                                                                <td className={clsx(style.price)}>
                                                                                    {`${handlePercent(Number(item.idRef.price), Number(item.idRef.discount)).toLocaleString()} đ`}
                                                                                </td>
                                                                                <td>
                                                                                    <section className={clsx(style.quantity)}>
                                                                                        <AiFillMinusCircle
                                                                                            className={clsx(style.icon)}
                                                                                            onClick={() => handleQuantity(item.idRef._id, "minus")}
                                                                                        />
                                                                                        <span>{item.quantity}</span>
                                                                                        <AiFillPlusCircle
                                                                                            className={clsx(style.icon)}
                                                                                            onClick={() => handleQuantity(item.idRef._id, "plus")}
                                                                                        />
                                                                                    </section>
                                                                                </td>
                                                                                <td>
                                                                                    <section className={clsx(style.delete)}>
                                                                                        <AiFillDelete
                                                                                            className={clsx(style.icon)}
                                                                                            onClick={() => handleDelete(item.idRef._id)}
                                                                                        />
                                                                                    </section>
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    })
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </section>
                                                </Col>
                                                <Col xl={8}>
                                                    <section className={clsx(style.cart__order)}>
                                                        <form className={clsx(style.formOrder)} onSubmit={formik.handleSubmit}>
                                                            <h1>Thông tin đơn hàng</h1>
                                                            <section className={clsx(style.formGroup)}>
                                                                <label htmlFor="name">Tên người nhận</label>
                                                                <input
                                                                    type="text"
                                                                    name="name"
                                                                    placeholder='Nhập tên người nhận'
                                                                    value={formik.values.name}
                                                                    onChange={formik.handleChange}
                                                                />
                                                                {formik.errors.name && (<p className={clsx(style.errorMessage)}>{formik.errors.name}</p>)}
                                                            </section>
                                                            <section className={clsx(style.formGroup)}>
                                                                <label htmlFor="phone">Số điện thoại người nhận</label>
                                                                <input
                                                                    type="text"
                                                                    name="numberPhone"
                                                                    placeholder='Nhập số điện thoại người nhận'
                                                                    value={formik.values.numberPhone}
                                                                    onChange={formik.handleChange}
                                                                />
                                                                {formik.errors.numberPhone && (<p className={clsx(style.errorMessage)}>{formik.errors.numberPhone}</p>)}

                                                            </section>
                                                            <section className={clsx(style.formGroup)}>
                                                                <label htmlFor="province">Tỉnh</label>
                                                                <select
                                                                    name="province"
                                                                    onChange={handleChangeProvince}

                                                                >
                                                                    <option value="">Tỉnh</option>
                                                                    {
                                                                        (apiProvinces.length > 0) && apiProvinces.map((item, index) => {
                                                                            return (<option key={index} value={item.name}>{item.name}</option>)
                                                                        })
                                                                    }
                                                                </select>
                                                            </section>
                                                            <section className={clsx(style.formGroup)}>
                                                                <label htmlFor="districts">Huyện</label>
                                                                <select
                                                                    name="districts"
                                                                    onChange={handleChangeDistricts}
                                                                >
                                                                    <option value="">Huyện</option>
                                                                    {
                                                                        (apiDistricts.length > 0) && apiDistricts.map((item, index) => {
                                                                            return (<option key={index} value={item.name}>{item.name}</option>)
                                                                        })
                                                                    }
                                                                </select>
                                                            </section>
                                                            <section className={clsx(style.formGroup)}>
                                                                <label htmlFor="hometown">Xã</label>
                                                                <select
                                                                    name="hometown"
                                                                    onChange={handleChangeHometown}
                                                                >
                                                                    <option value="">Xã</option>
                                                                    {
                                                                        (apiHometowns.length > 0) && apiHometowns.map((item, index) => {
                                                                            return (<option key={index} value={item.name}>{item.name}</option>)
                                                                        })
                                                                    }
                                                                </select>
                                                            </section>
                                                            <section className={clsx(style.formGroup)}>
                                                                <label htmlFor="address">Địa chỉ cụ thể</label>
                                                                <input
                                                                    type="text"
                                                                    placeholder='Nhập địa chỉ cụ thể(Tên đường, sô nhà...)'
                                                                    name="address"
                                                                    value={formik.values.address}
                                                                    onChange={formik.handleChange}
                                                                />
                                                                {formik.errors.address && (<p className={clsx(style.errorMessage)}>{formik.errors.address}</p>)}
                                                            </section>
                                                            <section className={clsx(style.formGroup)}>
                                                                <label htmlFor="total">Số tiền cần thanh toán</label>
                                                                <input
                                                                    type="text"
                                                                    value={`${Number(cart?.total).toLocaleString()} đ` || ''}
                                                                    disabled
                                                                />
                                                            </section>
                                                            <section className={clsx(style.formGroup)}>
                                                                <input
                                                                    type="submit"
                                                                    name="inputSubmit"
                                                                    value="Thanh toán"
                                                                    className={clsx(style.submit)}
                                                                />
                                                            </section>
                                                        </form>
                                                    </section>
                                                </Col>
                                            </>
                                        )
                                }

                            </Row>
                        </section>
                    )
            }

        </main>
    )
}
export default Cart;

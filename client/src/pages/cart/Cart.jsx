// local
import images from 'assets/images/index';
import style from './cart.module.scss';
import { QuantityCart } from 'layouts/AppLayout/AppLayout';

// Library
import { clsx } from 'clsx';

// Antd
import { Row, Col } from 'antd';

// Api
import cartApi from 'api/modules/cart.api';
import productApi from 'api/modules/product.api';
import orderApi from 'api/modules/order.api';
import provincesApi from 'api/modules/provinces.api';

// React
import { useState, useEffect, useContext } from 'react';

// Icon
import { AiFillPlusCircle, AiFillMinusCircle, AiFillDelete } from 'react-icons/ai';
import { ImCart } from 'react-icons/im';

// Validate
import { useFormik } from "formik";
import * as Yup from 'yup';

// Module
import toastNotification from 'handler/toast.handler';
import { Link } from 'react-router-dom';

// Component
import SelectSpeed from 'component/selectSpeed/SelectSpeed';

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
        }
        catch (err) {
            console.log(err);
        }
    }
    const updateCart = async () => {
        try {
            const response = await cartApi.update(cart._id, cart);
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
        cart.product.forEach((item) => {
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
        const product = cart.product.filter((item) => (id !== item.idRef._id));
        cart.product = product;
        cart.total = totalCart();
        updateCart();
        toastNotification("success", "Đã xóa sản phẩm ra khỏi giỏ hàng !", 1000);
    }
    const handleChangeProvince = (e) => {
        const name = e.target.value;
        const province = apiProvinces.filter((item, index) => name === item.name);
        const codeDistricts = province[0].code;
        fetchDistricts(codeDistricts);
        setAddress({ ...address, province: name });
    }
    const handleChangeDistricts = (e) => {
        const name = e.target.value;
        const district = apiDistricts.filter((item, index) => name === item.name);
        const codeHometown = district[0].code;
        fetchHometown(codeHometown);
        setAddress({ ...address, districts: name });
    }
    const handleChangeHometown = (e) => {
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
        catch (err) {
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
        catch (err) {
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
        catch (err) {
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
    return (
        <main className={clsx(style.main)}>
            <SelectSpeed />
            {
                (checkLogin === null)
                    ?
                    (
                        <section className={clsx(style.login)}>
                            <Row gutter={[{ md: 0, sm: 30, xs: 15 }, { md: 0, sm: 30, xs: 15 }]} align="middle">
                                <Col md={12} xs={24}>
                                    <section className={clsx(style.login__body)}>
                                        <h1>Bạn cần đăng nhập để tiếp tục</h1>
                                        <Link to="/signin">
                                            <button>Đăng nhập</button>
                                        </Link>
                                    </section>
                                </Col>
                                <Col md={12} xs={24}>
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
                            <Row gutter={[{ md: 40, sm: 30, xs: 15 }, { md: 40, sm: 30, xs: 15 }]}>
                                <Col xs={24}>
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
                                        <Col xs={24}>
                                            <section className={clsx(style.cart__cartEmpty)}>
                                                <div></div>
                                                <h1>Giỏ hàng chưa có sản phẩm</h1>
                                                <Link to="/">
                                                    <button>Mua sắm ngay</button>
                                                </Link>
                                            </section>
                                        </Col>
                                        :
                                        (
                                            <>
                                                <Col xl={16} xs={24}>
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
                                                <Col xl={8} xs={24}>
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

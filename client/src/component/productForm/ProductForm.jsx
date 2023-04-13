// Library
import { clsx } from 'clsx';

// Local
import style from './productForm.module.scss';

// Icon
import { RiDeleteBack2Fill } from 'react-icons/ri';

// Antd
import { Row, Col } from 'antd';

// React
import { useState, memo, useEffect, useRef } from 'react';

// Api
import categoryApi from "api/modules/category.api";
import productApi from "api/modules/product.api";


import toastNotification from 'handler/toast.handler';
const ProductForm = ({ getApi, onClose, isEdit, setIsEdit, productEdit, setProductEdit, brandProductEdit, setBrandProductEdit, productField, setProductField, labelField, setLabelField }) => {
    const [category, setCategory] = useState([]);
    const [selectBrand, setSelectBrand] = useState('');
    const [selectType, setSelectType] = useState('');
    const [image, setImage] = useState('');
    let formData = useRef();
    const handleChange = (e) => {
        console.log(e.target.value)
        const result = category.find((item, index) => item.name === e.target.value);
        (result?.brand !== undefined && result?.brand !== null) ? setBrandProductEdit(result.brand) : setBrandProductEdit([]);
        (result?.field !== undefined && result?.field !== null) ? setLabelField(result.field) : setLabelField([]);
        setProductEdit({ ...productEdit, type: e.target.value });
        setSelectType(e.target.value);
    }
    const handleChangeBrand = (e) => {
        setProductEdit({ ...productEdit, brand: e.target.value });
        setSelectBrand(e.target.value);
    }
    const handleClickBack = () => {
        onClose();
        setIsEdit(false);
    }
    const convertBase64 = async (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    }
    const handleChangeFile = async (e) => {
        const file = e.target.files[0];
        if (file !== undefined) {
            const convertFile = await convertBase64(file);
            const imgBase64 = convertFile.slice(convertFile.indexOf(",") + 1);
            setImage(imgBase64);
        }
    }
    const submitForm = (type) => {
        const resultForm = new FormData(formData.current);
        let objField = {};
        let objNote = {};
        var index = 0;
        for (const [key, value] of resultForm) {
            if (index === 2) {
                objNote = { ...objNote, [key]: value }
            }
            if (index === 3) {
                objNote = { ...objNote, [key]: value }
            }
            if (index >= 8) {
                if (value === '') {
                    objField = { ...objField, [key]: productField[key] }
                }
                else {
                    objField = { ...objField, [key]: value }
                }
            }
            index += 1;
        }

        const values = {
            name: productEdit.name,
            price: productEdit.price,
            discount: productEdit.discount,
            quantity: productEdit.quantity,
            publish: productEdit.publish,
            brand: selectBrand || objNote.brand,
            type: selectType || objNote.type,
            information: objField,
        }
        if (image) {
            values.img = image;
        }
        if (type === "update") {
            handleEdit(productEdit._id, values);
        }
        else {
            handleCreate(values);
        }
    }
    const handleCreate = async (values) => {
        try {
            await productApi.create(values);
            getApi();
        }
        catch (err) {
            console.log(err);
        }
        setTimeout(() => {
            toastNotification('success', 'Thêm sản phẩm thành công !', 1000);
            onClose();
        }, 800);
    }
    const handleEdit = async (id, data) => {
        try {
            await productApi.update(id, data);
            getApi();
        }
        catch (err) {
            console.log(err);
        }
        setTimeout(() => {
            toastNotification('success', 'Chỉnh sửa sản phẩm thành công !', 1000);
            onClose();
        }, 800);
    }
    const getApiCategory = async () => {
        try {
            const response = await categoryApi.getAll();
            setCategory(response.category);
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getApiCategory();
    }, []);
    return (
        <div>
            <main className={clsx(style.productAdd)}>
                <section className={clsx(style.productAdd__head)}>
                    <div className={clsx(style.productAdd__head__name)}>
                        {
                            !isEdit ?
                                <>
                                    <h1>Thêm sản phẩm</h1>
                                    <p>Thêm sản phẩm tại đây</p>
                                </>
                                :
                                <>
                                    <h1>Chỉnh sửa sản phẩm</h1>
                                    <p>Chỉnh sửa sản phẩm tại đây</p>
                                </>
                        }
                    </div>
                    <div className={clsx(style.productAdd__head__exit)}>
                        <RiDeleteBack2Fill className={clsx(style.icon)} onClick={handleClickBack} />
                    </div>
                </section>
                <section className={clsx(style.productAdd__body)}>
                    <form className={clsx(style.form, style.formAdd)} ref={formData}>
                        <Row gutter={[20, 20]}>
                            <Col xl={24}>
                                <section className={clsx(style.formGroup)}>
                                    <label htmlFor="file">Chọn hình ảnh</label>
                                    <input
                                        type="file"
                                        name="file"
                                        onChange={handleChangeFile}
                                        autoComplete="off"
                                    />
                                    <div>
                                        {
                                            productEdit && productEdit.img &&
                                            <img src={`data:image/png;base64,${productEdit.img}`} alt="img" />
                                        }
                                    </div>
                                </section>
                            </Col>
                            <Col xl={24}>
                                <section className={clsx(style.formGroup)}>
                                    <label htmlFor="file">Tên sản phẩm</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={productEdit?.name || ''}
                                        onChange={e => setProductEdit(() => ({ ...productEdit, name: e.target.value }))}
                                        placeholder="Nhập tên sản phẩm"
                                        autoComplete="off"
                                    />
                                </section>
                            </Col>
                            <Col xl={12}>
                                <section className={clsx(style.formGroup)}>
                                    <label htmlFor="type">Loại sản phẩm</label>
                                    <select name="type" onChange={handleChange} value={productEdit?.type || ''}>
                                        <option value="">Loại sản phẩm</option>
                                        {
                                            (category.length > 0) && category.map((item, index) => {
                                                return (<option key={index} value={item.name}>{item.name}</option>)
                                            })
                                        }
                                    </select>
                                </section>
                            </Col>
                            <Col xl={12}>
                                <section className={clsx(style.formGroup)}>
                                    <label htmlFor="brand">Hãng sản phẩm</label>
                                    <select name="brand" onChange={handleChangeBrand} value={productEdit?.brand || ''}>
                                        <option value="" >Hãng sản phẩm</option>
                                        {
                                            (brandProductEdit?.length > 0) && brandProductEdit.map((item, index) => {
                                                return (<option key={index} value={item}>{item}</option>)

                                            })
                                        }
                                    </select>
                                </section>
                            </Col>
                            <Col xl={12}>
                                <section className={clsx(style.formGroup)}>
                                    <label htmlFor="price">Giá sản phẩm</label>
                                    <input
                                        type="text"
                                        name="price"
                                        value={productEdit?.price || ''}
                                        onChange={e => setProductEdit(() => ({ ...productEdit, price: e.target.value }))}
                                        placeholder="Nhập giá sản phẩm"
                                        autoComplete="off"
                                    />

                                </section>
                            </Col>
                            <Col xl={12}>
                                <section className={clsx(style.formGroup)}>
                                    <label htmlFor="quantity">Số lượng sản phẩm</label>
                                    <input
                                        type="text"
                                        name="quantity"
                                        value={productEdit?.quantity || ''}
                                        onChange={e => setProductEdit(() => ({ ...productEdit, quantity: e.target.value }))}
                                        placeholder="Số lượng sản phẩm"
                                        autoComplete="off"

                                    />
                                </section>
                            </Col>
                            <Col xl={12}>
                                <section className={clsx(style.formGroup)}>
                                    <label htmlFor="publish">Công khai</label>
                                    <input
                                        type="text"
                                        name="publish"
                                        value={productEdit?.publish || ''}
                                        onChange={e => setProductEdit(() => ({ ...productEdit, publish: e.target.value }))}
                                        placeholder="Công khai"
                                        autoComplete="off"

                                    />
                                </section>
                            </Col>
                            <Col xl={12}>
                                <section className={clsx(style.formGroup)}>
                                    <label htmlFor="discount">Phần trăm giảm giá</label>
                                    <input
                                        type="text"
                                        name="discount"
                                        value={productEdit?.discount || ''}
                                        onChange={e => setProductEdit(() => ({ ...productEdit, discount: e.target.value }))}
                                        placeholder="Số phần trăm giảm giá"
                                        autoComplete="off"

                                    />
                                </section>
                            </Col>

                            {

                                labelField.length > 0 &&
                                labelField.map((item, index) => {
                                    return (
                                        <Col xl={12} key={index}>
                                            <section className={clsx(style.formGroup)} >
                                                <label htmlFor="information">{item}</label>
                                                <input
                                                    type="text"
                                                    placeholder={productField[item] || item}
                                                    name={item}
                                                    autoComplete="off"
                                                />
                                            </section>
                                        </Col>
                                    )
                                })
                            }

                        </Row>
                    </form>
                </section>
                <section className={clsx(style.productAdd__foot)}>
                    <div className={clsx(style.productAdd__foot__cancel)}>
                        <button onClick={handleClickBack}>Trở lại</button>
                    </div>
                    <div className={clsx(style.productAdd__foot__add)}>
                        {
                            !isEdit ? <button type="button" onClick={() => submitForm("create")}>Thêm</button> :
                                <button type="button" onClick={() => submitForm("update")}>Cập nhật</button>
                        }

                    </div>
                </section>
            </main>
        </div>
    )
}

export default memo(ProductForm);
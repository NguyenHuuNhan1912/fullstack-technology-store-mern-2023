import clsx from 'clsx';
import style from './categoryForm.module.scss';
import { RiDeleteBack2Fill } from 'react-icons/ri';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Row, Col } from 'antd';
import { useContext, useRef, useState } from 'react';
import categoryApi from 'api/modules/category.api';
import { toast } from 'react-toastify';
import toastNotification from 'handler/toast.handler';
import { UpdateCategory } from 'pages/dashboard/category/Category';
const CategoryAdd = ({cateEdit, cateBrand, cateField, setCateBrand, setCateField, setCateEdit, isEdit, setIsEdit, onClose}) => {
    const updateCategory = useContext(UpdateCategory);
    const [brand, setBrand] = useState('');
    const [field, setField] = useState('');
    const [image, setImage] = useState('');
    const handleClickBack = () => {
        setIsEdit(false);
        onClose();
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
    const handleChange = async (e) => {
        const file = e.target.files[0];
        // console.log(file);
        if (file !== undefined) {
            const convertFile = await convertBase64(file);
            const imgBase64 = convertFile.slice(convertFile.indexOf(",") + 1);
            setImage(imgBase64);
        }
    }
    const handleEdit = async (id, values) => {
        try {
            await categoryApi.update(id, values);
            updateCategory();
        }
        catch (err) {
            console.log(err);
        }
        setTimeout(() => {
            toastNotification('success', 'Cập nhật danh mục thành công !', 1000);
            onClose();
        }, 800);
    }
    const handleCreate = async (values) => {
        try {
            await categoryApi.create(values);
            updateCategory();
        }
        catch (err) {
            console.log(err);
        }
        console.log('create');
        setTimeout(() => {
            toastNotification('success', 'Thêm danh mục thành công !', 1000);
            onClose();
        }, 800);
    }
    const submitForm = (type) => {
        const values = {
            name: cateEdit.name,
            brand: cateBrand,
            field: cateField,
        }
        if (image) {
            values.img = image;
        }
        // console.log(values);
        if (type === "edit") {
            handleEdit(cateEdit._id, values);
        }
        else {
            handleCreate(values);
        }
    }

    const deleteBrand = (value) => {
        // console.log(value);
        setCateBrand(cateBrand.filter((item, index) => index !== value));

    }
    const deleteField = (value) => {
        // console.log(e); 
        setCateField(cateField.filter((item, index) => index !== value));

    }

    // console.log(cateEdit);
    // console.log(cateEdit?.img);
    // console.log(cateBrand, cateField);
    return (
        <main className={clsx(style.categoryAdd)}>
            <section className={clsx(style.categoryAdd__head)}>
                <div className={clsx(style.categoryAdd__head__name)}>
                    {
                        isEdit ?
                            <>
                                <h1>Chỉnh sửa danh mục</h1>
                                <p>Chỉnh sửa danh mục tại đây</p>
                            </>
                            :
                            <>
                                <h1>Thêm danh mục</h1>
                                <p>Thêm danh mục tại đây</p>
                            </>
                    }
                    {/* <p>{des}</p> */}

                </div>
                <div className={clsx(style.categoryAdd__head__exit)}>
                    <RiDeleteBack2Fill className={clsx(style.icon)} onClick={handleClickBack} />
                </div>
            </section>
            <section className={clsx(style.categoryAdd__body)}>
                <form className={clsx(style.form, style.formAdd)}>
                    <Row gutter={[20, 20]}>
                        <Col xl={24}>
                            <section className={clsx(style.formGroup)}>
                                <label htmlFor="file">Chọn hình ảnh</label>
                                <input
                                    type="file"
                                    name="file"
                                    onChange={handleChange}
                                />
                                <div>
                                    {
                                        // null, 0, false, undefined 
                                        cateEdit && cateEdit.img &&
                                        <img src={`data:image/png;base64,${cateEdit.img}`} alt="img" />
                                    }
                                </div>
                            </section>
                        </Col>
                        <Col xl={24}>
                            <section className={clsx(style.formGroup)}>
                                <label htmlFor="file">Tên danh mục</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={cateEdit?.name || ''}
                                    onChange={(e) => setCateEdit(() => ({ ...cateEdit, name: e.target.value }))}
                                    placeholder={"Nhap ten danh muc"}
                                    autoComplete="off"

                                />
                            </section>
                        </Col>

                        <Col xl={12}>
                            <section className={clsx(style.formGroup)}>
                                <label htmlFor="brand">Hãng danh mục</label>
                                <input
                                    type="text"
                                    name="brand"
                                    placeholder="Nhập hãng danh mục"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    onKeyUp={(e) => e.keyCode === 13 && setCateBrand(() => [...cateBrand, e.target.value])}
                                />
                                <div className={clsx(style.child)} >

                                    {
                                        cateBrand.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    <p>{item}</p>
                                                    <p className={clsx(style.icon)} onClick={() => deleteBrand(index)}>x</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                            </section>
                        </Col>
                        <Col xl={12}>
                            <section className={clsx(style.formGroup)}>
                                <label htmlFor="field">Thông tin sản phẩm</label>
                                <input
                                    type="text"
                                    name="field"
                                    placeholder="Nhập thông tin danh mục"
                                    value={field}
                                    onChange={(e) => setField(e.target.value)}
                                    onKeyUp={(e) => e.keyCode === 13 && setCateField(() => [...cateField, e.target.value])}
                                />
                                <div className={clsx(style.child)}  >
                                    {
                                        cateField.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    <p>{item}</p>
                                                    <span className={clsx(style.icon)} onClick={() => deleteField(index)}>x</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </section>
                        </Col>
                    </Row>
                </form>
            </section>
            <section className={clsx(style.categoryAdd__foot)}>
                <div className={clsx(style.categoryAdd__foot__cancel)}>
                    <button onClick={handleClickBack}>Trở lại</button>
                </div>
                <div className={clsx(style.categoryAdd__foot__add)}>
                    {
                        isEdit ? <button type="button" onClick={() => submitForm("edit")}>Cập nhật</button> :
                            <button type="button" onClick={() => submitForm("create")}>Thêm</button>

                    }
                </div>
            </section>
        </main>
    )
}

export default CategoryAdd;
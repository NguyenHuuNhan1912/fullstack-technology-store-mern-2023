import { clsx } from 'clsx';
import style from './form.module.scss';
import {RiDeleteBack2Fill} from 'react-icons/ri';
import { memo } from 'react';
import ProductAdd from 'component/productForm/ProductForm';
import { useEffect, useRef } from 'react';
import productApi from "api/modules/product.api";


function Form({title, des, formNode, overlayNode})  {
    let dataApi = useRef();
    let refFormik = useRef();
    const handleClickBack = () => {
        formNode.current.style = 'transform: translateX(100%); opacity: 0;';
        overlayNode.current.classList.remove('product_show__1OE7m');
    }
    const submitForm = () => {
        refFormik.current.handleSubmit();  
    }
    // console.log(dataApi.current);
    console.log('render-form');
    return (
        <main className={clsx(style.form)} ref={formNode}>
            <section className={clsx(style.form__head)}>
                <div className={clsx(style.form__head__title)}>
                    <h1>{title}</h1>
                    <p>{des}</p>
                </div>
                <div className={clsx(style.form__head__back)}>
                    <RiDeleteBack2Fill className={clsx(style.icon)} onClick={handleClickBack}/>
                </div>
            </section>
            <ProductAdd 
                dataApi={dataApi}
                refFormik={refFormik}
            />
            <section className={clsx(style.form__foot)}>
                <div className={clsx(style.form__foot__cancel)}>
                    <button onClick={handleClickBack}>Trở lại</button>
                </div>
                <div className={clsx(style.form__foot__add)}>
                    <button type="button" onClick={submitForm}>{title}</button>
                </div>
            </section>
        </main>       
    )
}
export default memo(Form);
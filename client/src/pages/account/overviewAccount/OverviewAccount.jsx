import { clsx } from 'clsx';
import style from './overviewAccount.module.scss';
import { useState, useEffect, useRef, useContext } from 'react';
import userApi from 'api/modules/user.api';
import { Row, Col } from 'antd';
import { UpdateAccount } from 'layouts/AccountLayout/AccountLayout';
import toastNotification from 'handler/toast.handler';
const OverviewAccount = () => {
    const [user, setUser] = useState({});
    const updateAccountContext = useContext(UpdateAccount);
    const [check, setCheck] = useState(true);
    const updateUser = async (id, data) => {
        try {
            const response = await userApi.update(id, data);
            console.log(response); //update
            localStorage.setItem("updateAccount", JSON.stringify(check));
            updateAccountContext();
            toastNotification('success', "Tài khoản đã được cập nhật thành công !", 1000);
        }
        catch (err) {
            console.log(err);
        }
        
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setCheck(!check);
        updateUser(user._id, user);
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
        if (file !== undefined) {
            const convertFile = await convertBase64(file);
            const imgBase64 = convertFile.slice(convertFile.indexOf(",") + 1);
            setUser({ ...user, img: imgBase64 });
        }
    }
    const getApiUser = async (id) => {
        try {
            const response = await userApi.getOne(id);
            setUser(response);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getApiUser(JSON.parse(localStorage.getItem("idUser")));
    }, []);
    return (
        <main className={clsx(style.main)}>
            <section className={clsx(style.overviewAccount)}>
                <form className={clsx(style.formAccount)}>
                    <Row gutter={[{ sm: 20, xs: 15 }, { sm: 20, xs: 15 }]}>
                        <Col xs={24}>
                            <section className={clsx(style.title)}>
                                <h1>Thông tin tài khoản</h1>
                            </section>
                        </Col>
                        <Col xs={24}>
                            <section className={clsx(style.formGroup)}>
                                <label htmlFor="username">Ảnh đại diện</label>
                                <input
                                    type="file"
                                    onChange={handleChange}
                                />
                                {
                                    user?.img &&
                                    <img src={`data:image/png;base64,${user.img}`} alt="img" />
                                }
                            </section>
                        </Col>
                        <Col lg={12} xs={24}>
                            <section className={clsx(style.formGroup)}>
                                <label htmlFor="username">Họ tên</label>
                                <input
                                    type="text"
                                    value={user.username || ''}
                                    disabled={true}
                                />
                            </section>
                        </Col>
                        <Col lg={12} xs={24}>
                            <section className={clsx(style.formGroup)}>
                                <label htmlFor="numberPhone">Số điện thoại</label>
                                <input
                                    type="text"
                                    value={user.numberPhone || ''}
                                    disabled={true}
                                />
                            </section>
                        </Col>
                        <Col xs={24}>
                            <section className={clsx(style.formGroup)}>
                                <label htmlFor="username">Email</label>
                                <input
                                    type="email"
                                    value={user?.email || ''}
                                    placeholder="Nhập email cần thay đổi"
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                />
                            </section>
                        </Col>
                        <Col xs={12}>
                            <section className={clsx(style.formGroup)}>
                                <label htmlFor="username">Ngày sinh</label>
                                <input
                                    type="date"
                                    value={user?.birthDay || ''}
                                    onChange={(e) => setUser({ ...user, birthDay: e.target.value })}
                                />
                            </section>
                        </Col>
                        <Col xs={12}>
                            <section className={clsx(style.formGroup)}>
                                <label htmlFor="sex">Giới tính</label>
                                <select
                                    name="sex"
                                    value={user?.sex || ''}
                                    onChange={(e) => setUser({ ...user, sex: e.target.value })}
                                >
                                    <option value="">Giới tính</option>
                                    <option value="nam">Nam</option>
                                    <option value="nu">Nữ</option>
                                    <option value="khac">Khác</option>
                                </select>
                            </section>
                        </Col>
                        <Col xs={24}>
                            <section className={clsx(style.formGroup)}>
                                <input
                                    type="submit"
                                    value="Cập nhật"
                                    onClick={handleSubmit}
                                />
                            </section>
                        </Col>
                    </Row>
                </form>
            </section>
        </main>
    )
}

export default OverviewAccount;
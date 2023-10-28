import { Rate, Row, Col } from 'antd';
import clsx from 'clsx';
import style from './comment.module.scss';
import { AiFillHeart, AiOutlineSend } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import toastNotification from 'handler/toast.handler';
import commentApi from 'api/modules/comment.api';
import images from 'assets/images';
import userApi from 'api/modules/user.api';
import { useParams } from 'react-router-dom';
const Comment = () => {
    const [value, setValue] = useState(3);
    const [comment, setComment] = useState("");
    const [tym, setTym] = useState(false);
    const desc = ['Rerrible', 'Bad', 'Normal', 'Good', 'Wonderful'];
    const [idUser, setIdUser] = useState(JSON.parse(localStorage.getItem("idUser")));

    const [comments, setComments] = useState([]);
    const [user, setUser] = useState({});
    let { id } = useParams();
    const getUserApi = async () => {
        if (JSON.parse(localStorage.getItem("idUser")) !== null) {
            try {
                const response = await userApi.getOne(JSON.parse(localStorage.getItem("idUser")));
                setUser(response);
            }
            catch (err) {
                console.log(err);
            }
        }
    }
    const handleDeleteComment = async (id) => {
        try {
            const response = await commentApi.delete(id);
            setTimeout(() => {
                getAllApiComment();
            }, 1000);
            toastNotification("success", "Xóa bình luận thành công !", 1000);
        }   
        catch(err) {
            console.log(`Error: ${err}`);
        }
    }
    const convertComments = (comments) => {
        return comments.filter(comment => comment.idProduct === id);
    }

    const getAllApiComment = async () => {
        try {
            const repsonse = await commentApi.getAll();
            setComments(convertComments(repsonse.comment));
        }
        catch (err) {
            console.log(`Error: ${err}`);
        }
    }
    useEffect(() => {
        getUserApi();
        getAllApiComment();
    }, []);
    const createApiComment = async (payloadComment) => {
        try {
            const repsonse = await commentApi.create(payloadComment);
            toastNotification('success', "Phản hồi của bạn đã được ghi nhận !", 1000);
            getAllApiComment();
        }
        catch (err) {
            console.log(`Error": ${err}`);
        }
    }

    const handleSubmitComment = async () => {
        if (idUser) {
            if (comment === '') {
                toastNotification('error', 'Vui lòng nhập bình luận', 1000);
            }
            else {
                const commentTime = new Date().toLocaleString('en-GB', {
                    hour12: false,
                }).split(", ").join(" - ");
                const payloadComment = {
                    heart: tym,
                    rate: value,
                    comment: comment,
                    user: idUser,
                    commentTime: commentTime,
                    idProduct: id,
                };
                setComment('');
                setTym(false);
                setValue(3);
                createApiComment(payloadComment)
            }
        }
        else {
            toastNotification('error', 'Hãy đăng nhập để tiếp tục bình luận', 1000);
        }
    }
    return (
        <section className={clsx(style.comment)}>
            <section className={clsx(style.comment__show)}>
                {
                    comments.length === 0 ?
                        <h1 className={clsx(style.comment__show__no_comment)}>Chưa có bình luận về sản phẩm, hãy để lại bình luận của bạn nào !</h1>
                        :
                        <Row gutter={[{ sm: 30, xs: 15 }, { sm: 30, xs: 15 }]} className={clsx(style.row)}>
                            {
                                comments.map((comment, index) => {
                                    return (
                                        <Col
                                            lg={8}
                                            xs={24}
                                            key={index}
                                        >
                                            <div className={clsx(style.comment__show__item)}>
                                                {
                                                    comment.user.img ?
                                                        <img
                                                            className={clsx(style.img)}
                                                            src={`data:image/png;base64,${comment.user.img}`} alt="avatar-user"
                                                        />
                                                        :
                                                        <img src={images.header.user} alt="img" />
                                                }
                                                <section className={clsx(style.comment__show__item__head)}>
                                                    <h1>{comment.user.username} - {comment.commentTime}</h1>
                                                </section>
                                                <section className={clsx(style.comment__show__item__body)}>
                                                    <p>{comment.comment}</p>
                                                </section>
                                                <section className={clsx(style.comment__show__item__rate)}>
                                                    <Rate disabled={true} tooltips={desc} onChange={setValue} value={comment.rate} />
                                                    {comment.rate ? <span className="ant-rate-text">{desc[comment.rate - 1]}</span> : ''}
                                                </section>
                                                <AiFillHeart
                                                    className={clsx(style.icon)}
                                                    style={comment.heart ? { backgroundColor: '#ffe0e0', color: 'red', border: '1px solid red' } : {}}
                                                />
                                                <section className={clsx(style.comment__show__item__edit)}> 
                                                    {
                                                        idUser===comment.user._id ? 
                                                        <>
                                                            <button>Chỉnh sửa</button>
                                                            <button onClick={() => {handleDeleteComment(comment._id)}}>Xóa</button>
                                                        </> 
                                                        :
                                                        <></>
                                                    }
                                                    
                                                </section>
                                            </div>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                }
            </section>
            <section className={clsx(style.comment__user_cmt)}>
                <section>
                    <p>Bạn nghĩ gì ?</p>
                    <AiFillHeart
                        className={clsx(style.icon)}
                        style={tym ? { backgroundColor: '#ffe0e0', color: 'red', border: '1px solid red' } : {}}
                        onClick={() => { setTym(!tym) }}
                    />
                </section>
                <hr />
                <section>
                    {
                        user?.img ?
                            <img
                                className={clsx(style.img)}
                                src={`data:image/png;base64,${user.img}`}
                                alt="img"
                            />
                            :
                            <img
                                className={clsx(style.img)}
                                src={images.header.user} alt="img"
                            />
                    }
                    <div className={clsx(style.rate)}>
                        <div>
                            <Rate tooltips={desc} onChange={setValue} value={value} />
                            {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
                        </div>
                        <div className={clsx(style.wrap)}>
                            <input
                                type="text" placeholder="Thêm nhận xét..."
                                value={comment}
                                onChange={event => { setComment(event.target.value) }}
                            />
                            <AiOutlineSend
                                className={clsx(style.icon)}
                                onClick={handleSubmitComment}
                            />
                        </div>
                    </div>
                </section>
            </section>
        </section>
    )
}

export default Comment;
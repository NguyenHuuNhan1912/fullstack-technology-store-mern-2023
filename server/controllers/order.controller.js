import Order from "../models/order.model.js"
import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS_EMAIL_ENCODE,
    },
});

const convertMoney = (money) => {
    return `${Number(money).toLocaleString()} đồng`;
}
const contentEmailConfirm = (infomation) => {
    const contentEmail = `
    <div style="color: #049c62;">Chúng tôi đang xử lý đơn hàng của bạn, vui lòng kiểm tra lại thông tin đơn hàng</div>
    <br>
    <div>
        <span style="color: #049c62">Họ tên: </span>
        <span style="font-weight: bold;">${infomation.name}</span>
    </div>
    <br>
    <div>
        <span style="color: #049c62">Số điện thoại: </span>
        <span style="font-weight: bold;">${infomation.numberPhone}</span>
    </div>
    <br>
    <div>
        <span style="color: #049c62">Địa chỉ: </span>
        <span style="font-weight: bold;">${infomation.address}</span>
    </div>
    <br>
    <div>
        <span style="color: #049c62">Tổng số tiền cần thanh toán: </span>
        <span style="font-weight: bold;">${convertMoney(infomation.total)}</span>
    </div>
    <br>
    <div>
        <div style="color: #049c62">Nếu có sai sót gì vui lòng liên hệ với chúng tôi qua các thông tin sau đây</div>
        <br>
        <div>
            <span style="color: #049c62">Số điện thoại: </span>
            <span style="font-weight: bold;">0342040063</span>
        </div>
        <br>
        <a style="text-decoration: none; color: white; font-weight: bold; padding: 10px; background-color: #049c62; border-radius: 5px;"
            href="https://www.facebook.com/nguyenhuunhan.softwareengineer">Facebook</a>
        <a style="text-decoration: none; color: white; font-weight: bold; padding: 10px; background-color: #049c62; border-radius: 5px; margin-left: 10px;"
            href="https://www.facebook.com/nguyenhuunhan.softwareengineer">Website</a>
    </div>
    <br>
    <div>
        <span style="color: #049c62; font-weight: bold;">Chúng tôi xin chân thành cảm ơn bạn đã tin tưởng và ủng hộ cửa hàng chúc bạn một ngày thật hạnh phúc</span>
    </div>
    <br>
    <div>
        <span style="color: #049c62; font-weight: bold;">Technology Store Hữu Nhân kính chào !</span>
    </div>
    `;
    return contentEmail;
}
export const create = async (req, res) => {
    console.log(req.body);
    const  email  = req.body.cart.user.email;
    console.log(`Email: ${email}`);
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "[Technology Store] Thông tin đơn hàng",
        html: contentEmailConfirm(req.body),
    }
    try {
        const createOrder = await Order.create(req.body).then(order => {
            res.send(order);
        });
        const sendMail = await transporter.sendMail(mailOptions);
    }
    catch (err) {
        res.status(500).json({ msg: "Internal server error!!!" });
    }
}

export const getAll = async (req, res) => {
    console.log(req.body);
    try {
        await Order.find({}).then(order => {
            setTimeout(() => {
                res.send({ order });
            }, 300)
        });
    }
    catch (err) {
        res.status(500).json({ msg: "Internal server error!!!" });
    }
}
export const searchCart = async (req, res) => {
    const idUder = req.query.idUser;
    try {
        await Order.find({ idUser: idUder }, { cart: 1, status: 1 }).then(order => {
            res.send({ order });
        });
    }
    catch (err) {
        res.status(500).json({ msg: "Internal server error!!!" });
    }
}

export const filtersStatus = async (req, res) => {
    const status = req.query.status;
    console.log(status);
    try {
        await Order.find({ status: status }).then(order => {
            res.send({ order });
        });
    }
    catch (err) {
        res.status(500).json({ msg: "Internal server error!!!" });
    }
}

export const updateOne = async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.params.id, req.body).then(order => {
            res.send("updated");
        })

    } catch (err) {
        res.status(500).json({ msg: "Internal server error!!!" });
    }
};

export const deleteOne = async (req, res) => {
    try {
        Order.findByIdAndDelete(req.params.id).then(order => {
            res.send("deleted");
        })
    } catch (err) {
        res.status(500).json({ msg: "Internal server error!!!" });
    }
};
export const getOne = async (req, res) => {
    try {
        Order.findById(req.params.id).then(order => {
            res.send(order);
        })
    }
    catch (err) {
        console.log(err);
    }
};

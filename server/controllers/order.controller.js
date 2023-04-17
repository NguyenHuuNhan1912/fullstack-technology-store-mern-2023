import Order from "../models/order.model.js"

export const create = async (req, res) => {
    console.log(req.body);
    try {
        await Order.create(req.body).then(order => {
            res.send(order);
        });
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
        await Order.find({idUser: idUder}, {cart: 1, status: 1}).then(order => {
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
        await Order.find({status: status}).then(order => {
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

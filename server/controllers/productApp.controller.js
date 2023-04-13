import Product from "../models/product.model.js"

export const getAll = async (req, res) => {
    console.log(req.body);  
    const type = req.query.type;
    const brand = req.query.brand;
    try {
        await Product.find({ type: type, brand: brand }).then(product => {
            res.send({product});
        });
    }
    catch (err) {
        res.status(500).json({ msg: "Internal server error!!!" });
    }
}

export const getProducts = async (req, res) => {

    try {
        await Product.find({}).then(product => {
            res.send({product});
        });
    }
    catch (err) {
        res.status(500).json({ msg: "Internal server error!!!" });
    }
}


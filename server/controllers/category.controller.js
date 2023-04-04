import Category from "../models/category.model.js"

export const create = async (req, res) => {
  
    console.log(req.body);
    try {
        await Category.create(req.body).then(category => {
            res.send(category);
        });
    }
    catch (err) {
        res.status(500).json({ msg: "Internal server error!!!" });
    }
}

export const getAll = async (req, res) => {
  
    console.log(req.body);
    try {
        await Category.find({}).then(category => {
            setTimeout(() => {
                res.send({ category });
            }, 300)
        });
    }
    catch (err) {
        res.status(500).json({ msg: "Internal server error!!!" });
    }
}


export const updateOne = async (req, res) => {
    try {
        await Category.findByIdAndUpdate(req.params.id, req.body).then(product => {
            res.send("updated");
        })

    } catch (err) {
        res.status(500).json({ msg: "Internal server error!!!" });
    }
};

export const deleteOne = async (req, res) => {
    try {
        Category.findByIdAndDelete(req.params.id).then(product => {
            res.send("deleted");
        })
    } catch (err) {
        res.status(500).json({ msg: "Internal server error!!!" });
    }
};
import Cart from "../models/cart.model.js"

export const create = async (req, res) => {
  console.log(req.body);
  try {
    await Cart.create(req.body).then(cart => {
      res.send(cart);
    });
  }
  catch (err) {
    res.status(500).json({ msg: "Internal server error!!!" });
  }
}

export const getAll = async (req, res) => {
  console.log(req.body);
  try {
    await Cart.find({}).populate("product.idRef").populate("user").then(cart => {
      res.send({ cart });
    });
  }
  catch (err) {
    res.status(500).json({ msg: "Internal server error!!!" });
  }
}

export const updateOne = async (req, res) => {
  try {
    await Cart.findByIdAndUpdate(req.params.id, req.body).then(cart => {
      res.send("updated");
    })

  } catch (err) {
    res.status(500).json({ msg: "Internal server error!!!" });
  }
};

export const deleteOne = async (req, res) => {
  try {
    Cart.findByIdAndDelete(req.params.id).then(cart => {
      res.send("deleted");
    })
  } catch (err) {
    res.status(500).json({ msg: "Internal server error!!!" });
  }
};
export const getOne = async (req, res) => {
  try {
    Cart.findById(req.params.id).populate("product.idRef").then(cart => {
      setTimeout(() => {
        res.send(cart);
      }, 500);
    })
  }
  catch (err) {
    console.log(err);
  }

};

// Fill
export const searchIdUser = async (req, res) => {
  console.log(req.query.idUser);
  try {
    await Cart.findOne({user: req.query.idUser}).populate("product.idRef").populate("user").then(cart => {
      cart.user.password = "";
      res.send({ cart });
    });
  }
  catch (err) {
    res.status(500).json({ msg: "Internal server error!!!" });
  }
}
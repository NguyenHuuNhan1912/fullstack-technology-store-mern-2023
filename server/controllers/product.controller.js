import Product from "../models/product.model.js"

export const create = async (req, res) => {
  console.log(req.body);
  try {
    await Product.create(req.body).then(product => {
      res.send(product);
    });
  }
  catch (err) {
    res.status(500).json({ msg: "Internal server error!!!" });
  }
}
// 
export const fillTypeBrand = async (req, res) => {
  const type = req.params.type;
  const brand = req.params.brand;
  try {
    await Product.find({ type: type, brand: brand }).then(product => {
      res.send({
        product
      });
    });
  }
  catch (err) {
    res.status(500).json({ msg: "Internal server error!!!" });
  }
}

export const getAll = async (req, res) => {
  // console.log(req.body);
  const skip = req.query.skip;
  const limit = req.query.limit;
  const type = req.query.type;
  const page = (skip / limit) + 1
  const price = req.query.price;
  let checkSort;
  let product;
  let totalProduct;
  if (price !== '') {
    if (price === 'low') {
      checkSort = 1;
    }
    else {
      checkSort = -1;
    }
  }
  else {
    checkSort = null;
  }
  console.log(checkSort);
  try {
    if (type !== '') {
      console.log('case 1');
      totalProduct = await Product.find({ type: type });
      if(checkSort === null) {
        product =  await Product.find({type: type}).skip(skip).limit(limit);
      }
      else {
        product = await Product.find({type: type}).skip(skip).limit(limit).sort({price: Number(checkSort)});
      }
      setTimeout(() => {
        res.send({
          product: product,
          skip: Number(skip),
          limit: Number(limit),
          length: totalProduct.length,
          page: page,
          totalProduct: totalProduct.length,
          totalPages: Math.ceil(totalProduct.length / limit),
          type: type,
        });
      }, 300);
    }
    else {
      console.log('case 2');
      totalProduct = await Product.find({});
      if(checkSort === null) {
        product =  await Product.find({}).skip(skip).limit(limit);
      }
      else {
        product = await Product.find({}).skip(skip).limit(limit).sort({price: Number(checkSort)});
      }
      setTimeout(() => {
        res.send({
          product: product,
          skip: Number(skip),
          limit: Number(limit),
          length: totalProduct.length,
          page: page,
          totalProduct: totalProduct.length,
          totalPages: Math.ceil(totalProduct.length / limit),
          type: type,
        });
      }, 300);
    }
  }
  catch (err) {
    res.status(500).json({ msg: "Internal server error!!!" });
  }
}

export const updateOne = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body).then(product => {
      res.send("updated");
    })

  } catch (err) {
    res.status(500).json({ msg: "Internal server error!!!" });
  }
};

export const deleteOne = async (req, res) => {
  try {
    Product.findByIdAndDelete(req.params.id).then(product => {
      res.send("deleted");
    })
  } catch (err) {
    res.status(500).json({ msg: "Internal server error!!!" });
  }
};
export const getOne = async (req, res) => {
  try {
    Product.findById(req.params.id).then(product => {
      res.send(product);
      
    })
  }
  catch (err) {
    console.log(err);
  }

};

// Fill
export const fillDiscount = async (req, res) => {
  console.log(req.body);
  try {
    const percent = await Product.find({}, { discount: 1, _id: 0 });
    await Product.find({ discount: '5', publish: '1' }, { name: 1, img: 1, price: 1, discount: 1, quantity: 1, publish: 1 }).then(product => {
      setTimeout(() => {
        res.send({ product, percent: percent });
      }, 300)
    });
  }
  catch (err) {
    res.status(500).json({ msg: "Internal server error!!!" });
  }
}

export const filtersName = async (req, res) => {
  console.log(req.query.name);
  const skip = req.query.skip;
  const limit = req.query.limit;
  const name = req.query.name.toLowerCase();
  const page = (skip / limit) + 1;

  try {
    let product = await Product.find({});
    const productsName = product.map((item, index) => {
      const name = item.name.toLowerCase();
      return [name].join("");
    });
    const result = product.filter((item, index) => {
      return productsName[index].includes(name);
    })
    let totalProduct = result.length;
    await Product.find({ name: name }).skip(skip).limit(limit).then(product => {
      setTimeout(() => {
        res.send({
          product,
          skip: Number(skip),
          limit: Number(limit),
          length: totalProduct,
          page: page,
          totalProduct: totalProduct,
          totalPages: Math.ceil(totalProduct / limit),
          name: name,
          result: result,
        });
      }, 300);
    });
  }
  catch (err) {
    res.status(500).json({ msg: "Internal server error!!!" });
  }
}
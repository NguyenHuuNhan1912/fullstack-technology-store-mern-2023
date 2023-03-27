import Contact from "../models/contact.model.js"

export const create = async (req, res) => {
  console.log(req.body);
  try {
    await Contact.create(req.body).then(contact => {
      res.send(contact);
    });
  }
  catch (err) {
    res.status(500).json({ msg: "Internal server error!!!" });
  }
}

export const getAll = async (req, res) => {
  console.log(`Yêu cầu client: ${req.body}`);
  console.log(req.body);
  try {
    await Contact.find({}).then(contact => {
      setTimeout(() => {
        res.send({contact});
      }, 800)
    });
  }
  catch (err) {
    res.status(500).json({ msg: "Internal server error!!!" });
  }
}

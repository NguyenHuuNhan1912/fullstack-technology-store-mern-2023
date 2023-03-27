import Recruit from "../models/recruit.model.js"

export const create = async (req, res) => {
  console.log(req.body);
  try {
    await Recruit.create(req.body).then(recruit => {
      res.send(recruit);
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
    await Recruit.find({}).then(recruit => {
        res.send({recruit});
    });
  }
  catch (err) {
    res.status(500).json({ msg: "Internal server error!!!" });
  }
}

import Comment from "../models/comment.modal.js"

export const create = async (req, res) => {
  console.log(req.body);
  try {
    await Comment.create(req.body).then(comment => {
      res.send(comment);
    });
  }
  catch (err) {
    res.status(500).json({ msg: "Internal server error!!!" });
  }
}

export const getAll = async (req, res) => {
  console.log(req.body);
  try {
    await Comment.find({}).populate("user").then(comment => {
      console.log(comment);
      res.send({ comment });
    });
  }
  catch (err) {
    res.status(500).json({ msg: "Internal server error!!!" });
  }
}

export const deleteOne = async (req, res) => {
  try {
    Comment.findByIdAndDelete(req.params.id).then(comment => {
      res.send("deleted");
    })
  } catch (err) {
    res.status(500).json({ msg: "Internal server error!!!" });
  }
};

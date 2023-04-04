import User from "../models/user.model.js"
import bcrypt, { hash } from "bcrypt";
import { response } from "express";

export const create = async (req, res) => {
  console.log(req.body);
  const salt = await bcrypt.genSalt(10);
  const hashed = await hash(req.body.password, salt);
  try {
    await User.create({ ...req.body, password: hashed }).then(user => {
      res.send(user._id);
    });
  }
  catch (err) {
    res.status(500).json({ msg: "Internal server error!!!" });
  }
}
export const updateOne = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body).then(user => {
      res.send("updated");
    })

  } catch (err) {
    res.status(500).json({ msg: "Internal server error!!!" });
  }
};
export const getAll = async (req, res) => {
  console.log(`Yêu cầu client: ${req.body}`);
  console.log(req.body);
  try {
    await User.find({admin: 'false'}, {password: 0}).then(user => {
      setTimeout(() => {
        res.send({ user });
      }, 300);
    });
  }
  catch (err) {
    res.status(500).json({ msg: "Internal server error!!!" });
  }
}

export const getOne = async (req, res) => {
  try {
    User.findById(req.params.id, {password: 0}).then(user => {
      res.send(user);
    })
  }
  catch (err) {
    console.log(err);
  }
};

export const signUp = async (req, res) => {

  try {
    const user =  await User.findOne({ username: req.query.username });
    if(!user) {
      res.status(404).json(false);
    }
    else {
      res.send(user);
    }
  }
  catch (err) {
    console.log(err);
  }
};

export const signIn = async (req, res) => {

  try {
    const user = await User.findOne({ username: req.query.username, });
    const resultUser = await User.findOne({ username: req.query.username }, { password: 0 });
    if (!user) {
      res.status(404).json("notUsername");
    }
    else {
      const checkPassword = await bcrypt.compare(
        req.query.password,
        user.password
      );
      if (!checkPassword) {
        res.status(404).json("notPassword");
      }
      else {
        res.send(resultUser);
      }
    }

  }
  catch (err) {
    console.log(err);
  }
};

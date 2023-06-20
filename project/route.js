const express = require('express');
const router = express.Router();
const checkToken = require('./auth');
const {
    createUser,
    login,
  getUserById,
  getUsers,
  updateUser,
  deleteUser
} = require("./controllers/user");

router.post("/" ,createUser);
router.get("/", checkToken, getUsers);
router.post("/", checkToken, createUser);
router.get("/:id", checkToken, getUserById);
router.post("/login", login);
router.patch("/", checkToken, updateUser);
router.delete("/", checkToken, deleteUser);
module.exports= router;
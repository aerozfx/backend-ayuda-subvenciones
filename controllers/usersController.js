const users = require("../models/users.js");

const createUser = async (req, res) => {
    const dataUser = req.body;
    try {
        const response = await new users(dataUser);
        let answer = await response.save()
        res.status(201).json({
            message: "Este método funciona"
        });
    } catch (error) {
        res.status(400).json({
            message: error
        });
    };
};
const updateUser = (req, res) => {
    try {
        res.status(200).json({
            message: "Este método funciona"
        });
    } catch (error) {
        res.status(400).json({
            message: error
        });
    };
};
const deleteUser = (req, res) => {
    try {
        res.status(200).json({
            message: "Este método funciona"
        });
    } catch (error) {
        res.status(400).json({
            message: error
        });
    };
};

const loginUser = (req, res) => {
    try {
        res.status(200).json({
            message: "Este método funciona"
        });
    } catch (error) {
        res.status(200).json({
            message: error
        });
    };
};
module.exports = { createUser, updateUser, deleteUser, loginUser };
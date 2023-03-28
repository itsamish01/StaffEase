/**
 * @file controllers/user.js
 * @desc Controller for users.
 */
import UserModel from "../models/user.js";

const controller = {
    index(){
        return UserModel;
    }
};

export default controller;

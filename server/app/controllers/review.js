/**
 * @file controllers/review.js
 * @desc Controller for reviews.
 */
import ReviewModel from "../models/review.js";

const controller = {
    index(){
        return ReviewModel;
    }
};

export default controller;

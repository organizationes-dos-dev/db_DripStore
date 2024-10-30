import express from "express";
import * as paymentController from "../Controllers/paymentController.js";

const route = express.Router();
route.post("/", paymentController.paymentValid);

export default route;

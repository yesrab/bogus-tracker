import express from "express";

const router = express.Router();

import { addData, getData } from "../controllers/salaryData.js";

router.route("/addData").get(addData);
router.route("/getData").get(getData);
export default router;

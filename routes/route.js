import { saveTemplate,sendTemplate,saveNewTemplate } from "../controller/crud.js";
import express from "express";
const router =express.Router();
router.post("/save/:id",saveTemplate);
router.get("/getTemplate/:id",sendTemplate);
router.post("/addTemplate",saveNewTemplate);
export default router;
import experss from "express";
import { insertCompany } from "../../controller/user/company.controller.js";

const router = experss.Router();

router.post("/", insertCompany);

export default router;

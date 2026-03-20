import { Router } from "express";
import wasteReportController from "../controllers/wasteReportController.js";

const router = Router();

router.get("/product/:productId", wasteReportController.getByProduct);
router.get("/", wasteReportController.getAll);
router.get("/:id", wasteReportController.getById);
router.post("/", wasteReportController.create);
router.put("/:id", wasteReportController.update);
router.delete("/:id", wasteReportController.remove);

export default router;

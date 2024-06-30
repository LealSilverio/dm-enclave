import { Router } from "express";
import * as swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const router = Router();

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(require("../swagger.json")));

export default router;

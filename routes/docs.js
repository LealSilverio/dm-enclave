import { Router } from "express";
import * as swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const router = Router();

router.use("/", swaggerUi.serve);
//router.get("/", swaggerUi.setup(require("../swagger.json")));
router.get("/", swaggerUi.setup(require("../swagger-temp.yaml")));

export default router;

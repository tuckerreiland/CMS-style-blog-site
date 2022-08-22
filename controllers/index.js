const express = require('express');
const router = express.Router();
const apiRoutes = require("./api")
const frontendRoutes = require("./frontend")

router.use("/api",apiRoutes)
router.use(frontendRoutes)

module.exports = router;
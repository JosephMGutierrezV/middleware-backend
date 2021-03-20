const { Router } = require("express");
const { saveEcgDb } = require("../controllers/ecg.controller");
const router = Router();

router.post("/simulateEcg", saveEcgDb);

module.exports = router;

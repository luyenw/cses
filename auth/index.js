require("dotenv").config();
const express = require("express");
const app = express();
const connect = require("./config/db/index");
const bodyParser = require("body-parser");
const eurekaHelper = require("./config/eureka/index");
const oauth = require("./oauth/index");
connect();
const router = express.Router();
const rootController = require("./controllers/rootController");
router.post("/login", rootController.post_login);
router.post("/verify", rootController.verify_token);
router.get("/oauth", rootController.google_login);
router.get(process.env.REDIRECT_URI, rootController.oauth_callback)
//
app.use(bodyParser.json({ limit: "200mb" }));
app.use("/", router);

// eurekaHelper.registerWithEureka('AUTH-SERVICE', 3004)
app.listen(3004, () => {
  console.log("auth module running at 3004..");
});

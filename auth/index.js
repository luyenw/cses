require("dotenv").config();
const express = require("express");
const app = express();
const connect = require("./config/db/index");
const bodyParser = require("body-parser");
const eurekaHelper = require("./config/eureka/index");
const oauth = require("./oauth/index");
connect();
const cors = require("cors");
const allowedOrigins = [
  "localhost",
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  "http://localhost:8082/",
];
var corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // callback(new Error('Not allowed by CORS'))
      // console.log("------")
      // console.log("origin",origin)
      callback(null, true);
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
const router = express.Router();
const rootController = require("./controllers/rootController");
router.post("/login", rootController.post_login);
router.get("/login", rootController.get_login);
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

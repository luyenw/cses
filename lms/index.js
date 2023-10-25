const express = require('express')
const app = express()
const connect = require('./config/db/index')
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
connect()
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
app.use(cookieParser())
app.use(bodyParser.json())

const classRouter = require('./routers/ClassRouter')
app.use('/class', classRouter)
app.listen(3005, ()=>{
    console.log('lms is running on 3005..')
})
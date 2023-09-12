require("dotenv").config();
const express = require('express');
const session = require('express-session')
const app = express();
const connect = require('./config/db/index')
connect()
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
// middlewares
const cors = require('cors')
const corsOptions = {
  origin: '*',
  credentials: true
}
app.use(cors(corsOptions))
app.use(bodyParser.json({ limit: "200mb" }));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: 'very secret 12345',
  cookie:{ secure: false, sameSite: 'none'}}))
// app.use(cookieParser())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Accept, Content-Type")
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", true)
  res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS, PATCH")
  next();
})
// routers
const rootRouter = require('./routers/RootRouter')()
const taskRouter = require('./routers/TaskRouter')()
const submitRouter = require('./routers/SubmitRouter')()
const resultRouter = require('./routers/ResultRouter')()
const userRouter = require('./routers/UserRouter')
// 
app.use('/', rootRouter)
app.use('/task', taskRouter)
app.use('/submit', submitRouter)
app.use('/result', resultRouter)
app.use('/user', userRouter)
//
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});


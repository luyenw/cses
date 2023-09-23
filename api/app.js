require("dotenv").config();
const express = require("express");
const app = express();
const connect = require("./config/db/index");
connect();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { graphqlHTTP } = require("express-graphql");
const eurekaHelper = require('./config/eureka/index');
//
const RabbitMQ = require("./rabbitmq/index");
const mq = RabbitMQ.getInstance();
mq.createExchange("submissions", "fanout");
// middlewares
//https://stackoverflow.com/questions/51224668/axios-cross-domain-cookies
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
app.use(bodyParser.json({ limit: "200mb" }));
app.use(cookieParser());
// routers
const rootRouter = require("./routers/RootRouter")();
const taskRouter = require("./routers/TaskRouter")();
const submitRouter = require("./routers/SubmitRouter")()
const resultRouter = require("./routers/ResultRouter")
const userRouter = require("./routers/UserRouter");
const resolvers = require("./controllers/graphql");
const schema = require("./schemas/graphql");
//
app.use("/", rootRouter);
app.use("/task", taskRouter);
app.use("/submit", submitRouter);
app.use("/result", resultRouter);
app.use("/user", userRouter);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);
//
eurekaHelper.registerWithEureka('SUBMISSION-SERVICE', 3001)
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

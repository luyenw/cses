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
mq.createQueue("task_queue")
// middlewares
//https://stackoverflow.com/questions/51224668/axios-cross-domain-cookies
const cors = require("cors");
const apiUrl = process.env.API_URL
const allowedOrigins = [
  `${apiUrl}`,
  `${apiUrl}:8082/`,
];
var corsOptions = {
  origin: function (origin, callback) {
    if (true) {
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
const problemRouter = require("./routers/ProblemRouter")();
const submitRouter = require("./routers/SubmitRouter")()
const resultRouter = require("./routers/ResultRouter")
const userRouter = require("./routers/UserRouter");
const contestRouter = require("./routers/ContestRouter");
const resolvers = require("./controllers/graphql");
const schema = require("./schemas/graphql");
//
app.use("/", rootRouter);
app.use("/problems", problemRouter);
app.use("/submit", submitRouter);
app.use("/result", resultRouter);
app.use("/users", userRouter);
app.use("/contests", contestRouter);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);
//
// eurekaHelper.registerWithEureka('SUBMISSION-SERVICE', 3001)
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

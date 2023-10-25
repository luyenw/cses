const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const {buildSchema} = require('graphql')
const eurekaHelper = require('./config/eureka/index')
const app = express()
const connect = require('./config/db/index.js')
connect()
const cors = require('cors')
const allowedOrigins = ['localhost',"http://localhost:8080", "http://127.0.0.1:8080","http://localhost:8080/"];
var corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      // callback(new Error('Not allowed by CORS'))
      // console.log("------")
      // console.log("origin",origin)
      callback(null, true)
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))
const resolvers = require('./controllers/graphql.js')
const schema = require('./controllers/schema.js')
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers, 
    graphiql: true
}))
app.get('/', (req, res)=>{
    return res.json({'msg':'ok'})
})
//
// eurekaHelper.registerWithEureka('DISCUSSION-SERVICE', 3002)
app.listen(3002, ()=>{
    console.log('Server is running on port 3002')
})
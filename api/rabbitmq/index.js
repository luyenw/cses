const amqp = require("amqplib/callback_api");

class RabbitMQ {
  instance = null;
  constructor() {}
  static getInstance() {
    if (!this.instance) {
      this.instance = new RabbitMQ();
    }
    return this.instance;
  }
  createExchange(name, mode) {
    amqp.connect("amqp://localhost", (err0, connection) => {
      if (err0) console.log(err0);
      else
        connection.createChannel((err1, channel) => {
          if (err1) console.log(err1);
          else channel.assertExchange(name, mode);
        });
      setTimeout(() => {
        connection.close();
      }, 500);
    });
  }
  send(exchange, msg) {
    amqp.connect("amqp://localhost", (err0, connection) => {
      if (err0) console.log(err0);
      else
        connection.createChannel((err1, channel) => {
          if (err1) console.log(err1);
          else {
            channel.publish(exchange, "", Buffer.from(msg));
            console.log(" [x] send %s", msg);
          }
        });
      setTimeout(() => {
        connection.close();
      }, 500);
    });
  }
}
module.exports = RabbitMQ;

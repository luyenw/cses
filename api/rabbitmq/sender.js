const amqp = require('amqplib/callback_api')

const send=(msg)=>{
    amqp.connect('amqp://localhost', (err0, connection)=>{
        connection.createChannel((err1, channel)=>{
            const exchange = 'submissions'
            channel.assertExchange(exchange, 'fanout')
            channel.publish(exchange, '', Buffer.from(msg))
            console.log(' [x] send %s', msg)
        })
        setTimeout(()=>{connection.close()}, 500)
    })
}
module.exports = send
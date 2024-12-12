'use strict'

module.exports = async function (fastify, opts) {
  // route for incoming order messages
  fastify.post('/', async function (request, reply) {
    const msg = request.body; // get the order details from the request body

    console.log("Incoming message:", msg);

    try {
      // send the order message to the queue
      await fastify.sendMessage(msg);

      console.log("Message sent successfully via Fastify route!");

      // respond with a success status
      reply.code(201).send({ message: 'Order queued successfully', order: msg });
    } catch (error) {
      // Handle errors in sending the message
      console.error('Error sending message to queue:', error);
      reply.code(500).send({ status: 'error', message: 'Failed to queue order', error: error.message });
    }
  })

  fastify.get('/health', async function (request, reply) {
    const appVersion = process.env.APP_VERSION || '0.1.0'
    return { status: 'ok', version: appVersion }
  })

  fastify.get('/hugs', async function (request, reply) {
    return { hugs: fastify.someSupport() }
  })
}

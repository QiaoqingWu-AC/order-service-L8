const { ServiceBusClient } = require("@azure/service-bus");
require('dotenv').config();

// function to send message
async function sendMessage(order) {

  // replace with actual connection string and queue name
  const connectionString = process.env.AZURE_SERVICE_BUS_CONNECTION_STRING;
  const queueName = process.env.ORDER_QUEUE_NAME;

  console.log("Connection String in sendMessage:", process.env.AZURE_SERVICE_BUS_CONNECTION_STRING);
  console.log("Queue Name in sendMessage:", process.env.ORDER_QUEUE_NAME);

  if (!connectionString || !queueName) {
    throw new Error("Azure Service Bus connection string or queue name is missing.");
  }
  
  // Initialize the service bus client and sender
  const sbClient = new ServiceBusClient(connectionString);
  const sender = sbClient.createSender(queueName);

  try {
    const message = { body: order };
    console.log("Prepare to send message: ", JSON.stringify(message));

    await sender.sendMessages(message);
    console.log("Message sent successfully!");
  } catch (error) {
    console.error("Error sending message to Azure Service Bus: ", error);
  }
}

module.exports = {
  sendMessage
};

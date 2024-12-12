const { ServiceBusClient } = require("@azure/service-bus");

async function sendTestMessage() {
  const connectionString = "Endpoint=sb://algonquinpetstore.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=YHkBtai/rdn9RqiIQzcBooJe1KGvrcDnE+ASbPl+TlE=";
  const queueName = "order-queue";

  const sbClient = new ServiceBusClient(connectionString);
  const sender = sbClient.createSender(queueName);

  try {
    const message = { body: { orderId: "test123", items: ["testItem1", "testItem2"] } };
    console.log("Sending test message:", message);

    await sender.sendMessages(message);

    console.log("Test message sent successfully!");
  } catch (error) {
    console.error("Error sending test message:", error);
  } finally {
    await sender.close();
    await sbClient.close();
  }
}

sendTestMessage().catch(console.error);

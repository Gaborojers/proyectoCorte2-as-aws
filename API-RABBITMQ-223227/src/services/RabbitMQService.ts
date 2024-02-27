import amqp from 'amqplib';

export class RabbitMQService {
  async consumeMessage() {
    const connection = await amqp.connect('amqp://52.21.114.121');
    const channel = await connection.createChannel();
    const queueName = 'initial';
    await channel.assertQueue(queueName);

    channel.consume(queueName, (msg) => {
      if (msg !== null) {
        const messageContent = msg.content.toString();
        console.log('Message received:', messageContent);
        // Aquí procesas el mensaje según tus necesidades
        channel.ack(msg);
      }
    });
  }
}

/*import WebSocket from 'ws';
import amqp from 'amqplib';

const wss = new WebSocket.Server({ port: 8080 });

// Función para conectar y consumir mensajes de RabbitMQ
async function consumeMessagesFromRabbitMQ() {
  const connection = await amqp.connect('amqp://52.21.114.121');
  const channel = await connection.createChannel();
  const queueName = 'initial';
  await channel.assertQueue(queueName);

  channel.consume(queueName, (msg) => {
    if (msg !== null) {
      const messageContent = msg.content.toString(); 
      console.log('Message received from RabbitMQ:', messageContent);
      // Enviar el mensaje a todos los clientes WebSocket conectados
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(messageContent);
        }
      });
      channel.ack(msg);
    }
  });
}

// Manejar conexión de cliente WebSocket
wss.on('connection', (ws) => {
  console.log('Client connected');
  
  // Manejar mensajes entrantes de cliente WebSocket
  ws.on('message', (message) => {
    console.log(`Received message from client: ${message}`);
  });
  
  // Manejar cierre de conexión de cliente WebSocket
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Iniciar servidor WebSocket
console.log('WebSocket server running on port 8080');

// Conectar y consumir mensajes de RabbitMQ
consumeMessagesFromRabbitMQ().catch((error) => {
  console.error('Error connecting to RabbitMQ:', error);
});
*/

import WebSocket from 'ws';
import amqp from 'amqplib/callback_api'; // Instala 'amqplib' usando npm install amqplib

const wss = new WebSocket.Server({ port: 8080 });

// Conectar con RabbitMQ
amqp.connect('amqp://52.21.114.121', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  
  // Crear un canal
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    const queue = 'initial';

    // Escuchar los mensajes entrantes en RabbitMQ
    channel.assertQueue(queue, {
      durable: true
    });    

    console.log('Esperando mensajes en la cola %s', queue);
    channel.consume(queue, function(msg) {
      if (msg !== null) {
        console.log('Mensaje recibido de RabbitMQ: %s', msg.content.toString());
        
        // Enviar el mensaje a todos los clientes WebSocket conectados
        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(msg.content.toString());
          }
        });

        channel.ack(msg);
      }
    });
  });
});

wss.on('connection', (ws) => {
  console.log('Cliente conectado');
  
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Convertir el mensaje a cadena de texto si es un objeto
    const msgString = typeof message === 'object' ? JSON.stringify(message) : message;

    // Enviar el mensaje a todos los clientes WebSocket conectados
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msgString);
      }
    });
  });
  
  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});


console.log('Servidor WebSocket ejecutándose en el puerto 8080');

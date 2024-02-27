import express from 'express';
import { MessageController } from './controllers/MessageController';

const app = express();
const port = 3001;

app.use(express.json());

const messageController = new MessageController();

app.post('/consume-message', messageController.consumeMessage.bind(messageController));

app.listen(port, () => {
  console.log(`Second API listening at http://localhost:${port}`);
});

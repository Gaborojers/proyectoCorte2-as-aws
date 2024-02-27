import { Request, Response } from 'express';
import { RabbitMQService } from '../services/RabbitMQService';

export class MessageController {
  private rabbitMQService: RabbitMQService;

  constructor() {
    this.rabbitMQService = new RabbitMQService();
  }

  async consumeMessage(req: Request, res: Response) {
    try {
      await this.rabbitMQService.consumeMessage();
      res.status(200).json({ message: 'Message consumed successfully' });
    } catch (error) {
      console.error('Error consuming message:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

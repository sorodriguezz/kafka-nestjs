import { Controller, Get } from '@nestjs/common';
import { KafkaService } from './kafka.service';

@Controller('kafka')
export class KafkaController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Get('send-message')
  async sendMessage(): Promise<string> {
    await this.kafkaService.sendMessage('test-topic', 'hello kafka');
    return 'Message sent!';
  }

  @Get('consume-messages')
  async consumeMessages(): Promise<string> {
    await this.kafkaService.consumeMessages('test-topic');
    return 'Message consumed!';
  }
}

import { Controller, Get } from '@nestjs/common';
import { KafkaStreamService } from './kafka-stream.service';

@Controller('kafka-stream')
export class KafkaStreamController {
  constructor(private readonly kafkaStreamService: KafkaStreamService) {}

  @Get('send-message')
  async sendMessage(): Promise<string> {
    await this.kafkaStreamService.sendMessage('test-topic', 'Hello Kafka');
    return 'Message sent!';
  }

  // Si decidieras iniciar un consumidor bajo demanda (opcional)
  @Get('start-consumer')
  async startConsumer(): Promise<string> {
    // Asegúrate de que este método no inicie múltiples instancias del consumidor
    return 'Consumer started!';
  }
}

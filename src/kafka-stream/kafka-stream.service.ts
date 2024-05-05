import {
  Injectable,
  OnModuleInit,
  OnApplicationShutdown,
} from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';

@Injectable()
export class KafkaStreamService implements OnModuleInit, OnApplicationShutdown {
  private kafka: Kafka;
  private consumer: Consumer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['localhost:29092'],
    });
    this.consumer = this.kafka.consumer({ groupId: 'my-group' });
  }

  async onModuleInit(): Promise<void> {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'test-topic' });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(partition);
        console.log(
          `Message: ${message.value.toString()}, from topic: ${topic}`,
        );
      },
    });

    // Manejo de errores correctamente ajustado
    this.consumer.on('consumer.crash', (error) => {
      console.error('Consumer has crashed:', error);
    });
  }

  async sendMessage(topic: string, message: string): Promise<void> {
    const producer = this.kafka.producer();
    await producer.connect();
    await producer.send({
      topic,
      messages: [{ value: message }],
    });
    await producer.disconnect();
  }

  async onApplicationShutdown(signal: string): Promise<void> {
    console.log(`Shutting down Kafka consumer due to ${signal}`);
    await this.consumer.disconnect();
  }
}

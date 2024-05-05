import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaService {
  private kafka: Kafka;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['localhost:29092'],
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

  async consumeMessages(topic: string): Promise<void> {
    const consume = this.kafka.consumer({ groupId: 'my-group' });
    await consume.connect();
    await consume.subscribe({ topic });
    console.log('hollaaaaa ');
    await consume.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(topic);
        console.log(partition);
        console.log({
          value: message.value.toString(),
        });
      },
    });
  }
}

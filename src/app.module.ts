import { Module } from '@nestjs/common';
import { KafkaModule } from './kafka/kafka.module';
import { KafkaStreamModule } from './kafka-stream/kafka-stream.module';

@Module({
  imports: [KafkaModule, KafkaStreamModule],
})
export class AppModule {}

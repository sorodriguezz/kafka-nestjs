import { Module } from '@nestjs/common';
import { KafkaStreamController } from './kafka-stream.controller';
import { KafkaStreamService } from './kafka-stream.service';

@Module({
  controllers: [KafkaStreamController],
  providers: [KafkaStreamService],
})
export class KafkaStreamModule {}

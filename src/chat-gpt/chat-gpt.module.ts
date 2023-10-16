import { Module } from '@nestjs/common';
import { ChatGptController } from './chat-gpt.controller';

@Module({
  controllers: [ChatGptController],
})
export class ChatGptModule {}

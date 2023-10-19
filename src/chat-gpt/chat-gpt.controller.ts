import { ChatGptService } from './chat-gpt.service';
import { Body, Controller, Post } from '@nestjs/common';
import { chatGptReqDto } from './dto/req.dto';

@Controller('chat-gpt')
export class ChatGptController {
  constructor(private readonly chatGptService: ChatGptService) {}

  @Post()
  async chatGPT(@Body() { category, text }: chatGptReqDto) {
    switch (category) {
      case 'introduce':
        return await this.chatGptService.introduce(text);
      case 'education':
      case 'experience':
      case 'project':
      case 'ETC':

      default:
        throw new Error('해당하는 항목이 없습니다. 다시 보내주세요.');
    }
  }
}

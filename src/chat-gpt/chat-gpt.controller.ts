import { Body, Controller, Post } from '@nestjs/common';
import { chatGptReqDto } from './dto/req.dto';

@Controller('chat-gpt')
export class ChatGptController {
  @Post()
  chatGPT(@Body() { category, text }: chatGptReqDto) {
    switch (category) {
      case 'introduce':

      case 'education':

      case 'experience':

      case 'project':

      case 'stack':

      case 'contact':

      case 'ETC':

      default:
    }
  }
}

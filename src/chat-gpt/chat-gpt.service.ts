import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class ChatGptService {
  constructor(private readonly openai: OpenAI) {
    this.openai.apiKey = process.env.OPENAI;
  }

  async introduce(text: string) {
    const introduce = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      temperature: 0.5,
      messages: [
        {
          role: 'system',
          content:
            'assistant는 user의 content를 기반으로 개발자 포트폴리오를 만들어준다. assistant는 user의 content를 HTML Body 형태의 폼으로 이쁘게 변형해준다.',
        },
        {
          role: 'system',
          content: 'user의 content는 자기소개(introduce)이다.',
        },
        {
          role: 'user',
          content: text,
        },
      ],
    });
    return introduce.choices[0].message.content;
  }
}

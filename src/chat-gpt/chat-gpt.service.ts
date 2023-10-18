import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class ChatGptService {
  // OpenAI 사용
  private readonly openai: OpenAI;
  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });
  }

  async introduce(text: string) {
    const introduce = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      temperature: 0.9,
      messages: [
        {
          role: 'system',
          content: `assistant는 user의 content를 기반으로 개발자 포트폴리오를 만들어준다..`,
        },
        {
          role: 'system',
          content: 'user의 content는 자기소개(introduce)이다.',
        },
        {
          role: 'system',
          content:
            'user의 content에서 문법적 오류는 없는지 확인하고 수정해준다.',
        },
        {
          role: 'system',
          content:
            'assistent는 content의 내용을 조금 더 풍부하게 수정할 수 있다.',
        },
        {
          role: 'system',
          content: '수정이 완료되면 String 형태로 출력한다.',
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

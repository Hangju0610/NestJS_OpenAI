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
    console.log('introduce 입력 하나 받았다.');
    const introduce = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo-0613',
      temperature: 0.9,
      messages: [
        {
          role: 'system',
          content: `assistant는 user의 content를 기반으로 개발자 포트폴리오를 만들어준다.
          user의 content는 자기소개(introduce)이다.
          assistant는 content의 내용을 소제목(title)과 내용, 자신의 장점 형식으로 정리해준다.
          소제목은(title)은 문장형으로 끝나며, content 내용에서 가장 큰 장점으로 소제목을 짓는다.
          내용은 소제목을 뒷받침할 수 있는 근거의 내용으로 작성한다.
          자신의 장점은 여러개가 있을 수 있으며, 간단하게 작성되며 근거가 뒷받침되어야 한다.
          해당하는 내용이 다 작성된다면 Json으로 작성하여 보내준다.
          소제목, 내용, 자신의 장점은 문장형 단어로 끝나면 안된다. 모두 문장이어야 한다.
          마지막으로 사용한 Token의 수를 작성해서 보내줘
          Json의 형태는 title, content, column, Token 으로 보내준다.
          {
            "title" : "소제목",
            "content" : "내용",
            "column" : ["자신의 장점 1", "자신의 장점 2", "자신의 장점 3", ...]
            "Token" : "사용한 Token의 수"
          }
          form으로 작성한다.
          간단한 예시로
          {
            "title" : "변화와 도전을 두려워하지 않습니다."
            "content" : "대기업을 다니며 업무 자동화 관련 웹 페이지를 직접 만들고 싶어 개발 공부를 시작하게 되었습니다. 
            이를 위해 다양한 웹 사이트와 기술 스택을 학습하였으며, 웹 개발자에 도전하게 되었습니다."
            "column" : ["Nobase부터 시작하여 단 4개월만에 동시성 제어, 대용량 트래픽 관련 서비스를 구현한 경험이 있어 성장 속도가 
            빠르고, 새로운 기술 습득에 있어 두려움이 없습니다.". "최적화된 프로세스를 바탕으로 업무를 한 경험과, 불편한 점을 개선하려는 기구개발을 한 경험을 토대로 최적의
            설계와 코드 개발에 항상 노력합니다.", "팀원들과 자주 소통하면서 의견을 주고 받고, 능동적인 태도를 통해 팀의 성장에 기여합니다."]
            "Token" : "사용한 Token의 수"
          }
          `,
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

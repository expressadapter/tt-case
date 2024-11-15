'use server';
import { ChatOpenAI } from '@langchain/openai';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import ocrSystemPrompt from '@/prompts/ocr';

const llm = new ChatOpenAI({
  model: 'gpt-4o',
  temperature: 0,
});

const parser = new StringOutputParser();

export async function readMenuData(imageBase64: string) {
  const messages = [
    new SystemMessage(ocrSystemPrompt),
    new HumanMessage({
      content: [
        {
          type: 'image_url',
          image_url: {
            url: imageBase64,
          },
        },
      ],
    }),
  ];

  const llmOutput = await llm.invoke(messages);
  const parsedData = await parser.invoke(llmOutput);

  // TODO: JSON ouput parser implementation
  return JSON.parse(parsedData.slice(7, parsedData.length - 3));
}

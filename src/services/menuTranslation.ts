'use server';
import { ChatOpenAI } from '@langchain/openai';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

const llm = new ChatOpenAI({
  model: 'gpt-4o-mini',
  temperature: 0,
});

const parser = new StringOutputParser();

export async function translateMenu(menuData: JSON, userLanguage: string) {
  const messages = [
    new SystemMessage(
      `Translate values of given JSON object to ${userLanguage}. While you are translating if you come across with value 'NOT FOUND' 
      fill corresponding information according to your knowledge. Don't change 'image' key values. Return only new JSON`,
    ),
    new HumanMessage(`${JSON.stringify(menuData)}`),
  ];

  const llmOutput = await llm.invoke(messages);
  const parsedData = await parser.invoke(llmOutput);

  // TODO: JSON ouput parser implementation
  return JSON.parse(parsedData.slice(7, parsedData.length - 3));
}

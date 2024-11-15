'use server';
import { ChatOpenAI } from '@langchain/openai';
import { JsonOutputParser, StringOutputParser } from '@langchain/core/output_parsers';
import { HumanMessage, SystemMessage, ToolMessage } from '@langchain/core/messages';
import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { promises as fs } from 'fs';

const llm = new ChatOpenAI({
  model: 'gpt-4o-mini',
  temperature: 0,
});

const parser = new StringOutputParser();

export async function translateMenu(menuData: JSON, userLanguage: string) {
  let messages = [
    new SystemMessage(`Translate values of given JSON object to ${userLanguage}. While you are translating if you come across with value 'NOT FOUND' fill corresponding information according to your knowledge. Don't change 'image' key values. Return only new JSON`),
    new HumanMessage(`${JSON.stringify(menuData)}`),
  ];

  let llmOutput = await llm.invoke(messages);
  let parsedData = await parser.invoke(llmOutput);

  console.log(parsedData);
  return JSON.parse(parsedData.slice(7, parsedData.length - 3));
}

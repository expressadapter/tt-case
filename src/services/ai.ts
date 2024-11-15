'use server';
import { ChatOpenAI } from '@langchain/openai';
import { JsonOutputParser, StringOutputParser } from '@langchain/core/output_parsers';
import { HumanMessage, SystemMessage, ToolMessage } from '@langchain/core/messages';
import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { useAppContext } from '@/contexts/AppContext';
import { promises as fs } from 'fs';
import { ocrPrompt } from './prompts';

const llm = new ChatOpenAI({
  model: 'gpt-4o',
  temperature: 0,
});

const parser = new StringOutputParser();

const searchMenuItemInfoSchema = z.object({
  name: z.string().describe('The name of the menu item'),
});

const searchMenuItemInfoTool = tool(
  async ({ name }) => {
    try {
      const params = new URLSearchParams({ name });
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/menuItemInfo?${params.toString()}`,
      );
      const data = await result.json();

      return JSON.stringify(data);
    } catch (error) {
      console.error('Error fetching menu item info:', error);
      return JSON.stringify({ message: 'Not found' });
    }
  },
  {
    name: 'menuInfoApi',
    description: 'Get the data of menu item from api',
    schema: searchMenuItemInfoSchema,
  },
);

/* const llmWithTools = llm.bindTools([searchMenuItemInfoTool]);
 */
export async function readMenuData(imageBase64: string, userLanguage: string) {
  let systemPrompt = await fs.readFile('src/services/ocr_prompt.md', 'utf-8');
  let imageData = imageBase64;

  let messages = [
    new SystemMessage(systemPrompt),
    new HumanMessage({
      content: [
        {
          type: 'image_url',
          image_url: {
            url: imageData,
          },
        },
      ],
    }),
  ];

  /*     let llmOutput = await llmWithTools.invoke(messages);
    messages.push(llmOutput);

    //console.log(messages)

    let toolMapping = {
      menuInfoApi: searchMenuItemInfoTool,
    };

    for await (let toolCall of llmOutput.tool_calls) {
      let tool = toolMapping[toolCall['name']];
      let toolOutput = await tool.invoke(toolCall.args);
      let newToolMessage = new ToolMessage({
        tool_call_id: toolCall.id,
        content: toolOutput,
      });
      messages.push(newToolMessage);
    }
 */
  let llmOutput = await llm.invoke(messages);
  let parsedData = await parser.invoke(llmOutput);

  console.log(parsedData);
  return JSON.parse(parsedData.slice(7, parsedData.length - 3));
}

import { ChatOpenAI } from "@langchain/openai";
import {
    START,
    END,
    MessagesAnnotation,
    StateGraph,
    MemorySaver,
} from "@langchain/langgraph";

const llm = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 1,
});


// Define the function that calls the model
const callModel = async (state: typeof MessagesAnnotation.State) => {
    const response = await llm.invoke(state.messages);
    return { messages: response };
};

// Define a new graph
const workflow = new StateGraph(MessagesAnnotation)
    // Define the node and edge
    .addNode("model", callModel)
    .addEdge(START, "model")
    .addEdge("model", END);

// Add memory
const memory = new MemorySaver();
const app = workflow.compile({ checkpointer: memory });

export interface ChatMessage {
    role: "assistant" | "user";
    content: string;
}

export async function generateChatResponse(messages: ChatMessage[], userId: string) {
    try {
        let lastAIResponse = null;

        const config = { configurable: { thread_id: userId } };

        const formattedMessages = messages.map((message) => ({
            role: message.role,
            content: message.content,
        }));

        const response = await app.invoke({ messages: formattedMessages }, config);

        // Extract last AI message content
        if (response.messages) {
            const lastAIMessage = response.messages
                .reverse()
                .find((msg: any) => msg.constructor.name === "AIMessage");

            if (lastAIMessage) {
                lastAIResponse = lastAIMessage.content;
            }
        }

        return { message: lastAIResponse, error: null };
    } catch (error) {
        console.error("Error generating chat response:", error);
        return {
            message: null,
            error: "Failed to generate response. Please try again.",
        };
    }
}
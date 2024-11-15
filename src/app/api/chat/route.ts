import { NextResponse } from "next/server";
import { generateChatResponse } from "@/services/chatBot";


export async function POST(req: Request) {
  try {
    const { messages, userId } = await req.json();
    console.error("Chat error:", userId);
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }

    const { message, error } = await generateChatResponse(messages, userId);

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ message });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
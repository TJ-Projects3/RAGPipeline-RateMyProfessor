import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

const systemPrompt = `
You are an AI assistant specializing in helping students find professors based on their queries. Your knowledge base consists of professor reviews and ratings. For each user query, you will use a RAG (Retrieval-Augmented Generation) system to find and present the top 3 most relevant professors.

Your responsibilities include:

1. Interpreting the user's query to understand their preferences and requirements.
2. Using the RAG system to retrieve the most relevant professor information based on the query.
3. Presenting the top 3 professors that best match the query, including their names, subjects, star ratings, and a brief summary of their reviews.
4. Providing a concise explanation of why these professors were chosen.
5. Answering follow-up questions about the recommended professors or helping to refine the search if needed.

When responding:
- Always provide exactly 3 professor recommendations, unless there are fewer than 3 relevant matches.
- Format the information clearly, using bullet points or numbered lists for easy readability.
- Be objective and base your recommendations solely on the data provided by the RAG system.
- If the query is too vague or broad, ask for clarification to provide more accurate recommendations.
- If asked about specific details that are not in your knowledge base, inform the user that you don't have that information.

Remember, your goal is to help students make informed decisions about their professors based on the available review data. Maintain a helpful and informative tone throughout the interaction.
`

export async function POST(req) {
    const data = await req.json();
    const pc = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });
    const index = pc.index("rag").namespace("ns1");
    const openai = new OpenAI();

    const text = data[data.length - 1].content;
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
      encoding_format: "float",
    });

    const results = await index.query({
      topK: 5,
      includeMetadata: true,
      vector: embedding.data[0].embedding,
    });

    let resultString = "";
    results.matches.forEach((match) => {
      resultString += `
  Returned Results:
  Professor: ${match.id}
  Review: ${match.metadata.stars}
  Subject: ${match.metadata.subject}
  Stars: ${match.metadata.stars}
  \n\n`;
    });

    const lastMessage = data[data.length - 1];
    const lastMessageContent = lastMessage.content + resultString;
    const lastDataWithoutLastMessage = data.slice(0, data.length - 1);
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        ...lastDataWithoutLastMessage,
        { role: "user", content: lastMessageContent },
      ],
      model: "gpt-3.5-turbo",
      stream: true,
    });

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              const text = encoder.encode(content);
              controller.enqueue(text);
            }
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });
    return new NextResponse(stream);
}
export async function POST(req) {
  try {
    const body = await req.json();

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: body.messages,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    console.log("OpenAI response:", data); // 🔍 log the actual response

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });

  } catch (err) {
    console.error("Error in /api/generate:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
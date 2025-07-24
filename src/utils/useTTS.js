import { createAudioStreamPlayer } from "./audioPlayer";

export async function speech(question, onTextChunk, onAudioChunk, onDone) {
  const endpoint = process.env.REACT_APP_ENDPOINT;

  const response = await fetch(`${endpoint}/api/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: question }),
  });

  if (!response.body) {
    console.error("No response body from /api/ask");
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  const player = createAudioStreamPlayer();

  if (onDone) {
    player.onDone(() => {
      onDone(); // 🔔 Notify frontend: playback done
    });
  }

  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunkText = decoder.decode(value, { stream: true });
    buffer += chunkText;

    const parts = buffer.split("\n\n");
    buffer = parts.pop(); // Incomplete part

    for (const part of parts) {
      const line = part.trim();
      if (!line.startsWith("data:")) continue;

      try {
        const { text, audio } = JSON.parse(line.replace(/^data:\s*/, ""));

        if (text && onTextChunk) {
          onTextChunk(text); // Append to visible stream
        }

        if (audio) {
          if (onAudioChunk) {
            onAudioChunk(audio); // Store for replay
          }
          player.enqueue(audio); // 🔊 Stream it
        }
      } catch (err) {
        console.error("Parse error in stream chunk:", err);
      }
    }
  }
}

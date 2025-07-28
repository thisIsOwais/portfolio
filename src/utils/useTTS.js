import { createAudioStreamPlayer } from "./audioPlayer";
                    
export async function speech(
  question,
  onTextChunk,
  onAudioChunk,
  onDone,
  messageId // 🆕 add this
) {
  const endpoint = process.env.REACT_APP_ENDPOINT;
  const response = await fetch(`${endpoint}/api/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      query: question,
      ...JSON.parse(localStorage.getItem("ghost-user") || "{}")
    }),
  });

  if (!response.body) {
    console.error("No response body from /api/ask");
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  const audioPlayer = createAudioStreamPlayer();
  audioPlayer.reset();


  // 🔥 Now use the passed messageId
  audioPlayer.reset();

  //setting current messageId for audioPlayer
  audioPlayer.setMessageId(messageId);

  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) 
    {
      // tell audioPlayer that playback of this message is done
      if (onDone) {
        audioPlayer.onDone(() => {
          onDone();
        });
      }
       break;
    }

    const chunkText = decoder.decode(value, { stream: true });

    buffer += chunkText;

    const parts = buffer.split("\n\n");

    buffer = parts.pop();

    for (const part of parts) {
      const line = part.trim();
      if (!line.startsWith("data:")) continue;

      try {
        const { text, audio } = JSON.parse(line.replace(/^data:\s*/, ""));

        if (text && onTextChunk) onTextChunk(text);
        if (audio) {
          if (onAudioChunk) onAudioChunk(audio);
        }
      } catch (err) {
        console.error("Parse error in stream chunk:", err);
      }
    }
  }
}

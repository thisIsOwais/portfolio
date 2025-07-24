export function createAudioStreamPlayer() {
  const queue = [];
  let isPlaying = false;
  let isPaused = false;
  let currentAudio = null;
  let onPlaybackEnd = () => {};

  const playNext = async () => {
    if (isPlaying || isPaused || queue.length === 0) return;

    isPlaying = true;
    const chunk = queue.shift();

    const blob = new Blob(
      [Uint8Array.from(atob(chunk), (c) => c.charCodeAt(0))],
      { type: "audio/wav" }
    );
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    currentAudio = audio;

    audio.onended = () => {
      URL.revokeObjectURL(url);
      currentAudio = null;
      isPlaying = false;

      if (queue.length === 0 && !isPaused) {
        onPlaybackEnd(); // ✅ Playback finished
      }

      setTimeout(playNext, 0); // Move to next chunk
    };

    audio.onerror = (e) => {
      console.error("Audio playback error:", e);
      URL.revokeObjectURL(url);
      currentAudio = null;
      isPlaying = false;
      setTimeout(playNext, 0);
    };

    try {
      await audio.play();
    } catch (err) {
      console.error("Failed to play audio:", err);
      URL.revokeObjectURL(url);
      currentAudio = null;
      isPlaying = false;
      setTimeout(playNext, 0);
    }
  };

  return {
    enqueue: (base64Audio) => {
      queue.push(base64Audio);
      playNext();
    },

    pause: () => {
      if (currentAudio && !currentAudio.paused) {
        currentAudio.pause();
        isPaused = true;
        isPlaying = false;
      }
    },

    resume: () => {
      if (currentAudio && currentAudio.paused) {
        currentAudio.play();
        isPaused = false;
        isPlaying = true;
      } else if (!currentAudio && queue.length > 0) {
        isPaused = false;
        playNext();
      }
    },

    reset: () => {
      queue.length = 0;
      isPaused = false;
      isPlaying = false;
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.src = "";
        currentAudio = null;
      }
    },

    onDone: (callback) => {
      if (typeof callback === "function") {
        onPlaybackEnd = callback;
      }
    },
  };
}

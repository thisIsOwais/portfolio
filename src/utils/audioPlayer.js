let instance = null;

export function createAudioStreamPlayer() {
  if (instance) return instance;

  let queue = [];
  let isPlaying = false;
  let isPaused = false;
  let currentAudio = null;
  let onPlaybackEnd = () => {};
  let currentMessageId = null;

  let isProcessingQueue = false;

const playNext = async () => {
  if (isProcessingQueue || isPlaying || isPaused || queue.length === 0) return;

  isProcessingQueue = true;


  isPlaying = true;
  const { messageId, chunk } = queue.shift();


  // cleanup old audio
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.src = "";
    currentAudio.load();
    currentAudio = null;
  }

  const blob = new Blob([Uint8Array.from(atob(chunk), c => c.charCodeAt(0))], {
    type: "audio/wav",
  });

  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);
  currentAudio = audio;

  audio.onended = () => {
    URL.revokeObjectURL(url);
    currentAudio = null;
    isPlaying = false;
    isProcessingQueue = false;

    setTimeout(() => {
      if (queue.length === 0 && !isPaused) {
        onPlaybackEnd(currentMessageId);
      }
      playNext(); // go to next
    }, 0);
  };

  audio.onerror = (e) => {
    console.error("Audio playback error:", e);
    URL.revokeObjectURL(url);
    currentAudio = null;
    isPlaying = false;
    isProcessingQueue = false;
    setTimeout(playNext, 0);
  };

  try {
    await audio.play();
  } catch (err) {
    console.error("Failed to play audio:", err);
    URL.revokeObjectURL(url);
    currentAudio = null;
    isPlaying = false;
    isProcessingQueue = false;
    setTimeout(playNext, 0);
  }
};


  instance = {
    enqueue: (chunk) => {
      queue.push({ messageId: currentMessageId, chunk });
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
      queue = [];
      isPaused = false;
      isPlaying = false;
    
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.src = "";
        currentAudio.load(); // force browser to stop buffering
        currentAudio = null;
      }
    
      currentMessageId = null;
    },
    

    onDone: (callback) => {
      if (typeof callback === "function") {
        onPlaybackEnd = callback;
      }
    },

    setMessageId: (id) => {
      currentMessageId = id;
    },

    getMessageId: () => currentMessageId,

    getQueue: () => queue,

    stop: () => { // ✅ NEW: hard stop the current audio
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.src = "";
        currentAudio = null;
      }
      isPlaying = false;
      isPaused = false;
    },
  
    isPlayingAudio: () => { // ✅ NEW: expose playing status
      return !!currentAudio && !currentAudio.paused;
    },

    printState: () => { // ✅ NEW: print current state
      console.log("Current Message ID:", currentMessageId);
      console.log("Queue Length:", queue.length);
      console.log("Is Playing:", isPlaying);
      console.log("Is Paused:", isPaused);
      console.log("Current Audio:", currentAudio);
      console.log("Queue contents:----------------", queue.map(item => ({
        messageId: item.messageId,
        chunkLength: item.chunk.length
      })));
    },
  };

  return instance;
}

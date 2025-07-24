export const simulateTyping = (text, cb, delay = 50) => {
    const words = text.split(" ");
    let index = 0;
  
    const typeNext = () => {
      if (index < words.length) {
        cb(words[index] + " ");
        index++;
        setTimeout(typeNext, delay);
      }
    };
  
    typeNext();
  };
  
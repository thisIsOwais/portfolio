"use client";
import { useState, useRef, useEffect } from "react";
import {
  Mic,
  MicOff,
  Send,
  User,
  Bot,
  Volume2,
  Settings,
  Sun,
  Moon,
  VolumeX,
  Loader2, 
  PlayIcon,
  Pause
} from "lucide-react";
import { speech } from "../utils/useTTS"; // Updated speech() utility
import {simulateTyping} from "../utils/simulateTyping"
import "./ghostMe.scss";
import "./layout.scss"
import { createAudioStreamPlayer } from "../utils/audioPlayer";
import { triggerToast } from "../hooks/triggerToast";


export default function GhostMe() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content:
        "Hello! I'm your AI representative. I can answer questions about your background, experience, and qualifications. How can I help you today?",
      timestamp: new Date(),
      isPlaying:false,
      isPaused:false,
      isTyping:false,
      audioChunks: [],
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const audioPlayer = useRef(createAudioStreamPlayer()).current;
  const [showPopup, setShowPopup] = useState(false);

  //popup creation
  const showPopupHandler = () => setShowPopup(true);
  useEffect(() => {
     const timer = setTimeout(() => {
     setShowPopup(false);
   }, 3000);
  return () => clearTimeout(timer);
  }, [showPopup]);
  let popup = null;
  if(showPopup) {
    popup =( 
      <>
       <div className="card-popup">
        <p>Setting Feature coming soon..</p>
       </div>
      </>
    );
   }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "webkitSpeechRecognition" in window
    ) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-IN";

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);

    if (newTheme) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

      
    triggerToast({
      title: "Service Limit Reached",
      message: "Our AI service limit has been reached due to token usage.",
      linkText: "Watch Demo",
      linkUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7355520672787283968/",
      type: "info",
      autoClose: 5000,
      redirect: true
    });


      return;


    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputText,
      timestamp: new Date(),
    };

    const aiMessageId = Date.now() + 1;
    const aiMessage = {
      id: aiMessageId,
      type: "ai",
      content: "",
      timestamp: new Date(),
      audioChunks: [],
    };

    setMessages((prev) => [...prev, userMessage, aiMessage]);
    setInputText("");

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === aiMessageId ? { ...msg, isTyping: true } : msg
      )
    );
    


    setIsTyping(true);

    try{
     await speech(
      inputText,
      (partialText) => {
        simulateTyping(partialText, (word) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === aiMessage.id
                ? { ...msg, content: msg.content + word }
                : msg
            )
          );
        });
      },
      (audioChunk) => {
        audioPlayer.enqueue(audioChunk);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId
              ? {
                  ...msg,
                  audioChunks: [...msg.audioChunks, audioChunk],
                }
              : msg
          )
        );
      },
      () => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId
              ? {
                  ...msg,
                  isTyping: false,
                  isPlaying: false,
                  isPaused: false, // or true, depending on behavior
                }
              : msg
          )
        );
      },
      
      aiMessageId
    );

    
    setIsTyping(false);
  }
  catch(err) {
    alert("Error in handleSendMessage:", err);
    console.error("Error in handleSendMessage:", err);
    setIsTyping(false); 
  };
}


  const handleReplay = (messageId) => {
    setMessages((prevMessages) => {
      let selectedMsg = prevMessages.find((m) => m.id === messageId);
  
      // If message not found or has no audio
      if (!selectedMsg || !selectedMsg.audioChunks || selectedMsg.audioChunks.length === 0) {
        return prevMessages;
      }
      const currentMessageId = audioPlayer.getMessageId();
      
      const isCurrentMsg = currentMessageId === messageId;
      const isAnotherAudioPlaying = !isCurrentMsg;
  
      // Pause current audio if it's the same one playing
      if (selectedMsg.isPlaying && !selectedMsg.isPaused && !isAnotherAudioPlaying) {
        // audioPlayer.printState();
        audioPlayer.pause();
        return prevMessages.map((msg) =>
          msg.id === messageId ? { ...msg, isPlaying: false, isPaused: true } : msg
        );
      }
  
      // Resume audio if it was paused and still the same message
      if (selectedMsg.isPaused && !isAnotherAudioPlaying) {
        // audioPlayer.printState();
        audioPlayer.resume();
        return prevMessages.map((msg) =>
          msg.id === messageId ? { ...msg, isPlaying: true, isPaused: false } : msg
        );
      }

          // ⛔ Stop the previous playing message explicitly
    const updatedMessages = prevMessages.map((msg) => {
      if (msg.id === currentMessageId) {
        return { ...msg, isPlaying: false, isPaused: false };
      }
      else
      {
        return msg;
      }
    });

    audioPlayer.stop(); 
    audioPlayer.reset();

      // Reset audioPlayer for this message
      audioPlayer.setMessageId(messageId);
  
      // Enqueue safely after reset
      audioPlayer.printState();

    
      for (const chunk of selectedMsg.audioChunks) {
        audioPlayer.enqueue(chunk);
      }


  
      // Set callback once (only for this message)
      audioPlayer.onDone((doneId) => {
        if (doneId === messageId) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === messageId ? { ...m, isPlaying: false, isPaused: false } : m
            )
          );
        }
      });
  
   
      // ✅ Mark this message as playing
    return updatedMessages.map((msg) =>
      msg.id === messageId
        ? { ...msg, isPlaying: true, isPaused: false }
        : msg
    );
    });
  };

  

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTopicClick = (topic) => {
    setInputText(`Tell me about your ${topic.toLowerCase()}`);
  };

  return (
  
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <div className="header-logo">
              <Bot size={24} />
            </div>
            <div className="header-title">
              <h1>GhostMe AI Assistant</h1>
              <p>Your AI-powered professional representative</p>
            </div>
          </div>
          <div className="header-right">
            <span className="badge badge-success">Online</span>

            <div className="theme-toggle" title="change theme" onClick={toggleTheme}>
              <div className={`toggle-slider ${isDarkMode ? "active" : ""}`}>
                {isDarkMode ? (
                  <Moon className="toggle-icon" />
                ) : (
                  <Sun className="toggle-icon" />
                )}
              </div>
            </div>
            {popup}
            <button className="btn btn-ghost btn-sm"
              onClick={showPopupHandler}
              title="Feature Coming Soon"
            >
              <Settings size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="main-content">
        <div className="content-grid">
          {/* Sidebar */}
          <div className="profile-sidebar">
            <div className="profile-card">
              <div className="avatar avatar-lg profile-avatar">
                <div className="avatar-fallback gradient">GM</div>
                {/* <GhostAvatar isSpeaking={isSpeaking} /> */}
              </div>
              <h3 className="profile-name">AI Representative</h3>
              <p className="profile-role">Professional Assistant</p>
              <div className="profile-stats">
                <div className="stat-row">
                  <span className="stat-label">Response Time</span>
                  <span className="stat-value">Instant</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Availability</span>
                  <span className="stat-value">24/7</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Theme</span>
                  <span className="stat-value">
                    {isDarkMode ? "Dark" : "Light"}
                  </span>
                </div>
              </div>
            </div>

            <div className="topics-card">
              <h4 className="topics-title">Quick Topics</h4>
              <div className="topics-list">
                {["Experience", "Skills", "Projects", "Education", "Contact"].map(
                  (topic) => (
                    <button
                    key={topic}
                    onClick={() => handleTopicClick(topic)}
                    className="topic-button"
                    >
                      {topic}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Chat */}
          <div className="chat-interface">
            <div className="chat-header">
              <div className="chat-status">
                <div className="status-indicator"></div>
                <span className="status-text">Active Conversation</span>
              </div>
            </div>

             <div className="messages-container">
              {messages.map((message) => {
                const isAnyTyping = messages.some((m) => m.isTyping);
                const disableOthers = isAnyTyping && !message.isTyping;

                return (
                  <div key={message.id} className={`message message-${message.type}`}>
                    <div className="message-content">
                      <div className="avatar avatar-sm">
                        {message.type === "user" ? (
                          <div className="avatar-fallback secondary">
                            <User size={16} />
                          </div>
                        ) : (
                          <div className="avatar-fallback gradient">
                            <Bot size={16} />
                          </div>
                        )}
                      </div>

                      <div className="message-bubble">
                        <p className="message-text">{message.content}</p>
                        <p className="message-time">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>

                        {/* 🔊 Replay button */}
                        {message.type === "ai" && message.audioChunks?.length > 0 && (
                          message.isTyping ? (
                            <div className="replay-button">
                              <Loader2 className="animate-spin" size={16} />
                            </div>
                          ) : (
                            !disableOthers && 
                              (
                              <div className="control-buttons">
                              <button
                                onClick={() => handleReplay(message.id)}
                                className={`btn btn-sm ${disableOthers ? "btn-destructive disabled" : "btn-outline"}`}
                                title={message.isPaused ? "Play" : "Pause"}
                              >
                                {message.isPaused ? (
                                  <PlayIcon title="play" size={14} />
                                ) : message.isPlaying ? (
                                  <Pause title="pause" size={16} />
                                ) : (
                                  <Volume2 size={16} />
                                )}
                              </button>
                              </div>
                            )
                          )
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}



              {isTyping && (
                <div className="typing-indicator">
                  <div className="typing-content">
                    <div className="avatar avatar-sm">
                      <div className="avatar-fallback gradient">
                        <Bot size={16} />
                      </div>
                    </div>
                    <div className="typing-bubble">
                      <div className="typing-dots">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="input-area">
              <div className="input-controls">
                <div className="input-wrapper">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about my background, experience, or skills... Press Enter to send or Shift+Enter for new line."
                    className="input-field"
                    disabled={isTyping}
                    rows={1}
                    
                    />
                  <div
                    className={`input-counter ${
                      inputText.length > 200 ? "visible" : ""
                      }`}
                      >
                    {inputText.length}/500
                  </div>
                </div>
                <div className="control-buttons">
                  <button
                    onClick={isListening ? stopListening : startListening}
                    className={`btn btn-sm ${
                      isListening ? "btn-destructive" : "btn-outline"
                      }`}
                      disabled={isTyping}
                      title={isListening ? "Stop listening" : "Start voice input"}
                      >
                    {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isTyping}
                    className="btn btn-primary btn-sm"
                    title="Send message"
                    >
                    <Send size={20} />
                  </button>
                </div>
              </div>
              <div className="input-features">
                <p className="input-hint">
                  {isListening
                    ? "🎤 Listening... Speak now"
                    : "💬 Type your question or click the mic for voice input"}
                  <span className="shortcut">Enter</span>
                </p>
                <div className="input-status">
                  <div
                    className={`status-dot ${
                      isListening ? "listening" : isTyping ? "typing" : "ready"
                      }`}
                      ></div>
                  <span>
                    {isListening
                      ? "Listening"
                      : isTyping
                      ? "AI is typing..."
                      : "Ready"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

  );
}

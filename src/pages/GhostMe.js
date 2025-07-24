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
  PlayIcon
} from "lucide-react";
import { speech } from "../utils/useTTS"; // Updated speech() utility
import {simulateTyping} from "../utils/simulateTyping"
import "./page.scss";
import "./ghostMe.scss";
import { createAudioStreamPlayer } from "../utils/audioPlayer";
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
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const audioPlayer = useRef(createAudioStreamPlayer()).current;

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
      ()=>{
        setMessages((prev) =>
      prev.map((msg) =>
        msg.id === aiMessageId ? { ...msg, isTyping: false } : msg
      )
    );
      }
    );

    
    setIsTyping(false);
  };

  const handleReplay = (messageId) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) => {
        if (msg.id === messageId) {
          // Resume if paused
          if (msg.isPaused) {
            audioPlayer.resume();
            return { ...msg, isPlaying: true, isPaused: false };
          }
  
          // Pause if currently playing
          if (msg.isPlaying) {
            audioPlayer.pause();
            return { ...msg, isPlaying: false, isPaused: true };
          }
  
          // Fresh playback
          audioPlayer.reset();
          msg.audioChunks.forEach((chunk) => audioPlayer.enqueue(chunk));
  
          // When audio finishes
          audioPlayer.onDone(() => {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === messageId
                  ? { ...m, isPlaying: false, isPaused: false }
                  : m
              )
            );
          });
  
          return { ...msg, isPlaying: true, isPaused: false };
        }
  
        // All other messages stop
        return { ...msg, isPlaying: false, isPaused: false };
      })
    );
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

            <div className="theme-toggle" onClick={toggleTheme}>
              <div className={`toggle-slider ${isDarkMode ? "active" : ""}`}>
                {isDarkMode ? (
                  <Moon className="toggle-icon" />
                ) : (
                  <Sun className="toggle-icon" />
                )}
              </div>
            </div>

            <button className="btn btn-ghost btn-sm">
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
              {messages.map((message) => (
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
                      {message.type === "ai" &&
                        message.audioChunks?.length > 0 && (
                      
                          message.isTyping ? (
                            <div className="replay-button">
                              <Loader2 className="animate-spin" size={16} />
                            </div>
                          ) : (
                          <button onClick={() => handleReplay(message.id)}
                            className="replay-button"
                            title="Control audio"
                          >
                            {message.isPaused ? <PlayIcon size={14}/> 
                              : message.isPlaying ? <VolumeX size={16}/> 
                              : <Volume2 size={16}/>}
                          </button>

                          )
                        )
                        }
                    </div>
                  </div>
                </div>
              ))} 



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

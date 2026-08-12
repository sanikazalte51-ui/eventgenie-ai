import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { generateEventIdeas } from "../utils/gemini";
import "./ChatBot.css";

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = (error) => reject(error);
  });

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Welcome to EventGenie AI!\n\nI can help you plan your event. You can ask me for ideas, upload a picture of a venue or decoration, or paste a link to a social media trend!"
    }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, open]);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(f => f.type.startsWith('image/'));
    
    if (validFiles.length < files.length) {
      alert("Currently, only images are supported for direct upload.");
    }

    const newAttachments = await Promise.all(
      validFiles.map(async (f) => ({
        file: f,
        base64: await fileToBase64(f),
        previewUrl: URL.createObjectURL(f),
        type: f.type
      }))
    );

    setAttachments(prev => [...prev, ...newAttachments]);
    e.target.value = null; // reset input
  };

  const removeAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSend = async () => {
    if (!input.trim() && attachments.length === 0) return;
    
    const userMessage = {
      sender: "user",
      text: input,
      attachments: attachments.map(a => a.previewUrl)
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    const promptText = input || "What do you think about these images?";
    const currentAttachments = [...attachments];
    
    setInput("");
    setAttachments([]);
    setIsLoading(true);

    try {
      const responseText = await generateEventIdeas(promptText, currentAttachments);
      setMessages(prev => [...prev, { sender: "bot", text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: "bot", text: `❌ **Error**: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        sender: "bot",
        text: "👋 Welcome back! What are we planning today?"
      }
    ]);
  };

  return (
    <>
      <button className="chat-button" onClick={() => setOpen(!open)}>
        🤖
      </button>

      {open && (
        <div className="chat-box">
          <div className="chat-header">
            🤖 EventGenie AI
            <button className="close-btn" onClick={() => setOpen(false)}>✖</button>
          </div>

          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={msg.sender === "bot" ? "bot-message" : "user-message"}>
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="message-attachments">
                    {msg.attachments.map((url, idx) => (
                      <img key={idx} src={url} alt="attachment" className="message-image" />
                    ))}
                  </div>
                )}
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ))}
            {isLoading && (
              <div className="bot-message typing-indicator">
                <span>.</span><span>.</span><span>.</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            {attachments.length > 0 && (
              <div className="attachments-preview">
                {attachments.map((att, idx) => (
                  <div key={idx} className="attachment-item">
                    <img src={att.previewUrl} alt="preview" />
                    <button onClick={() => removeAttachment(idx)}>✖</button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="input-row">
              <label className="attach-btn">
                📎
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </label>
              
              <input 
                type="text"
                placeholder="Ask for ideas or paste a link..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              
              <button className="send-btn" onClick={handleSend} disabled={isLoading}>
                🚀
              </button>
            </div>
          </div>

          <div className="chat-footer">
            <button className="clear-btn" onClick={clearChat}>🗑 Clear Chat</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;
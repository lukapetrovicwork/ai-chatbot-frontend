import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ChatBubble from "./components/ChatBubble";
import ChatInput from "./components/ChatInput";

const API_URL = "https://ai-chatbot-backend-cvad.onrender.com/chat";

function App() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! Ask me any questions you have about Luka's career!" },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text) => {
    const newUserMsg = { sender: "user", text };
    setMessages((prev) => [...prev, newUserMsg]);
    setLoading(true);

    try {
      const response = await axios.post(API_URL, { question: text });
      const botReply = { sender: "bot", text: response.data.answer };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error connecting to AI." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-foreground flex flex-col items-center p-6 font-sans bg-[--gradient-bg]">
      <h1 className="text-3xl font-bold mb-2 text-[hsl(240_80%_65%)] text-center tracking-tight">
        Luka's AI Chatbot
      </h1>
      <p className="text-sm text-muted-foreground text-center max-w-xl mb-4">
        ⚠️ This project uses a free tool. The first response may take up to ~30 seconds, but subsequent replies will be faster.
      </p>

      <div className="w-full max-w-xl bg-card p-4 rounded-xl shadow-[0_8px_32px_hsl(var(--shadow-card))] flex flex-col gap-3 overflow-y-auto max-h-[70vh]">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} sender={msg.sender} text={msg.text} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  );
}

export default App;
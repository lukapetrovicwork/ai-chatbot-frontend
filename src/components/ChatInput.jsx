import { useState } from "react";

const ChatInput = ({ onSend, disabled }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input.trim());
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 w-full max-w-xl flex gap-2 px-1 sm:px-0">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow p-3 rounded-lg bg-input text-foreground border border-border placeholder-muted-foreground focus:outline-none shadow-inner"
        placeholder="Ask Luka anything..."
        disabled={disabled}
      />
      <button
        type="submit"
        className="bg-[hsl(240_80%_65%)] hover:brightness-110 text-primary-foreground px-5 py-2 rounded-lg font-medium shadow-md transition"
        disabled={disabled}
      >
        {disabled ? "..." : "Send"}
      </button>
    </form>
  );
};

export default ChatInput;

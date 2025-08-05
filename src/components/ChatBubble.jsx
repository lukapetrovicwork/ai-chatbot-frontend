const ChatBubble = ({ sender, text }) => {
  const isUser = sender === "user";

  return (
    <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`px-4 py-3 rounded-xl max-w-[75%] text-sm whitespace-pre-wrap shadow-md ${
          isUser ? "bg-[hsl(240_80%_65%)] text-primary-foreground" : "bg-card text-card-foreground"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default ChatBubble;
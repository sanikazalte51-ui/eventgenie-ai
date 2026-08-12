import { useState } from "react";
import "./ChatBot.css";

function ChatBot() {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text:
        "👋 Welcome to EventGenie AI!\n\nHow can I help you today?\nChoose one of the options below."
    }
  ]);

  const questions = [
    {
      question: "🎉 What types of events do you organize?",
      answer:
        "We organize Weddings, Birthdays, Ring Ceremonies, Baby Showers, Kelvan, Corporate Events, Engagements, Anniversary Celebrations and many more."
    },
    {
      question: "📅 How do I book an event?",
      answer:
        "Booking is simple!\n\n1️⃣ Click 'Start Planning'.\n2️⃣ Select your event.\n3️⃣ Fill in your event details.\n4️⃣ Choose food and decoration.\n5️⃣ Confirm your booking."
    },
    {
      question: "💰 What is the starting budget?",
      answer:
        "Our event packages start from ₹50,000. The final price depends on your selected services and guest count."
    },
    {
      question: "🍽 What food options are available?",
      answer:
        "We provide Veg, Non-Veg, Jain and Customized food packages with multiple menu choices."
    },
    {
      question: "🎨 Can I customize the decoration?",
      answer:
        "Yes! You can choose from Traditional, Floral, Royal, Modern and Luxury decoration themes."
    },
    {
      question: "🏛 Can I choose my own venue?",
      answer:
        "Yes. You can either select one of our recommended venues or use your own venue."
    },
    {
      question: "📧 Will I receive a confirmation email?",
      answer:
        "Yes. After confirming your booking, a confirmation email will be sent to your registered email address."
    },
    {
      question: "⭐ Why should I choose EventGenie AI?",
      answer:
        "EventGenie AI offers:\n\n✅ Easy event booking\n✅ Smart planning\n✅ Budget-friendly packages\n✅ Food & Decoration customization\n✅ Fast booking process\n✅ Friendly customer support"
    },
    {
      question: "📞 How can I contact support?",
      answer:
        "You can contact our support team anytime.\n\n📧 Email: sanikazalte02@gmail.com"
    },
    {
      question: "❌ Can I cancel my booking?",
      answer:
        "Yes. Please contact our support team as soon as possible to discuss cancellation options."
    }
  ];

  const askQuestion = (item) => {
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: item.question
      },
      {
        sender: "bot",
        text: item.answer
      }
    ]);
  };

  const clearChat = () => {
    setMessages([
      {
        sender: "bot",
        text:
          "👋 Welcome back!\n\nHow can I help you today?\nChoose one of the options below."
      }
    ]);
  };

  return (
    <>
      <button
        className="chat-button"
        onClick={() => setOpen(!open)}
      >
        🤖
      </button>

      {open && (
        <div className="chat-box">

          <div className="chat-header">
            🤖 EventGenie AI

            <button
              className="close-btn"
              onClick={() => setOpen(false)}
            >
              ✖
            </button>
          </div>

          <div className="chat-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "bot"
                    ? "bot-message"
                    : "user-message"
                }
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="quick-buttons">
            {questions.map((item, index) => (
              <button
                key={index}
                className="question-btn"
                onClick={() => askQuestion(item)}
              >
                {item.question}
              </button>
            ))}
          </div>

          <button
            className="clear-btn"
            onClick={clearChat}
          >
            🗑 Clear Chat
          </button>

        </div>
      )}
    </>
  );
}

export default ChatBot;
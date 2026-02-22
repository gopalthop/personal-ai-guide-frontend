import React, { useState } from "react";
import axios from "axios";
import "./Chat.css";

function Chat() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);

  // SEND MESSAGE FUNCTION
  const sendMessage = async () => {
    if (!question.trim()) return;

    // limit demo usage
    if (questionCount >= 5) {
      return alert("Demo limit reached. Please try later.");
    }

    // increase question count
    setQuestionCount((prev) => prev + 1);

    const userMsg = { type: "user", text: question };
    setMessages((prev) => [...prev, userMsg]);

    setLoading(true);
    const currentQuestion = question;
    setQuestion("");

    try {
      const res = await axios.post(
        "https://personal-ai-guide-backend.onrender.com",
        { question: currentQuestion }
      );

      const aiMsg = {
        type: "ai",
        text: res.data.answer || "No response from AI.",
      };

      setMessages((prev) => [...prev, aiMsg]);

    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        { type: "ai", text: "Error getting response." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="chatPage">

      <section className="pageCenter">
        <h1 className="pageTitle">Ask AI Assistant</h1>

        <p className="pageSubtitle">
          Ask any question and get intelligent answers
        </p>

        {/* CHAT MESSAGES */}
        <div className="chatBox">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={msg.type === "user" ? "userMsg" : "aiMsg"}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* INPUT AREA */}
        <div className="chatInput">
          <input
            placeholder="Type your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={loading}
          />

          <button
            className="primaryBtn"
            onClick={sendMessage}
            disabled={loading}
          >
            {loading ? "..." : "Send"}
          </button>
        </div>

        {/* DEMO COUNTER */}
        <p style={{ opacity: 0.6, marginTop: "10px" }}>
          Demo usage: {questionCount}/5 questions
        </p>

      </section>

    </div>
  );
}

export default Chat;
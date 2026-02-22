import React, { useState } from "react";
import axios from "axios";
import "./Upload.css";

function Upload() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  // TEXT NOTE UPLOAD
  const handleTextUpload = async () => {
    if (!text.trim()) return alert("Please enter some text");

    setLoading(true);

    try {
      await axios.post("https://personal-ai-guide-backend.onrender.com/api/upload", { text });

      alert("Knowledge saved!");
      setText("");
    } catch (err) {
      console.error(err);
      alert("Error saving knowledge");
    }

    setLoading(false);
  };

  // PDF UPLOAD
  const handlePDFUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPdfLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        "https://personal-ai-guide-backend.onrender.com/api/upload-pdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("PDF uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("PDF upload failed");
    }

    setPdfLoading(false);
  };

  return (
    <div className="uploadPage">

      <section className="pageCenter">
        <h1 className="pageTitle">Upload Knowledge</h1>

        <p className="pageSubtitle">
          Save notes or upload PDF documents for AI to reference
        </p>

        <div className="glassBox">

          {/* TEXT UPLOAD */}
          <h3>Enter your text or notes</h3>

          <textarea
            className="textArea"
            placeholder="Type or paste your notes here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            className="primaryBtn"
            onClick={handleTextUpload}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Knowledge"}
          </button>

          <hr style={{ margin: "30px 0", opacity: 0.2 }} />

          {/* PDF UPLOAD */}
          <h3>Upload PDF</h3>

          <input
            type="file"
            accept="application/pdf"
            onChange={handlePDFUpload}
          />

          {pdfLoading && <p>Uploading PDF...</p>}

          <p className="helperText">
            Your knowledge is stored securely and used by the AI assistant.
          </p>

        </div>
      </section>

    </div>
  );
}

export default Upload;
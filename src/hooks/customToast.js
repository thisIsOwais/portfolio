import React from "react";

const CustomToast = ({ title, message, linkText, linkUrl }) => {
  return (
    <div style={{
      padding: "12px 16px",
      background: "#1e1e1e",
      color: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
      fontFamily: "'Poppins', sans-serif"
    }}>
      <strong style={{
        display: "block",
        fontSize: "16px",
        marginBottom: "6px",
        color: "#ffd700"
      }}>
        {title}
      </strong>
      <p style={{
        fontSize: "14px",
        margin: 0,
        marginBottom: linkUrl ? "6px" : 0,
        lineHeight: "1.4"
      }}>
        {message}
      </p>
      {linkUrl && (
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "14px",
            color: "#00bfff",
            textDecoration: "underline",
            fontWeight: "500"
          }}
        >
          {linkText}
        </a>
      )}
    </div>
  );
};

export default CustomToast;

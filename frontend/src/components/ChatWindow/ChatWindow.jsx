import React from 'react';
import styles from './ChatWindow.module.css';

const ChatWindow = ({ chatHistory }) => {
  return (
    <div className={styles.chatWindow}>
      {chatHistory.map((entry, index) => (
        <div
          key={index}
          className={entry.sender === 'ai' ? styles.aiMessage : styles.userMessage}
        >
          {entry.message}
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
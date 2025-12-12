/**
 * useWebSocket.js
 * Custom hook for managing WebSocket connections.
 * Handles connection lifecycle and message communication.
 */

import { useEffect, useRef, useState } from "react";

/**
 * Custom hook for WebSocket communication.
 * Manages WebSocket connection lifecycle and provides message sending/receiving.
 *
 * @param {string} url - WebSocket server URL (e.g., "ws://localhost:8080")
 * @returns {Object} WebSocket state and methods
 * @returns {Array} returns.messages - Array of received messages
 * @returns {Function} returns.sendMessage - Function to send message to server
 *
 * @example
 * const { messages, sendMessage } = useWebSocket("ws://localhost:8080");
 *
 * const handleSendClick = () => {
 *   sendMessage(JSON.stringify({ type: "message", data: "Hello" }));
 * };
 *
 * return (
 *   <>
 *     {messages.map((msg, i) => <p key={i}>{msg}</p>)}
 *     <button onClick={handleSendClick}>Send Message</button>
 *   </>
 * );
 */
const useWebSocket = (url) => {
  // Reference to WebSocket instance (persists across renders)
  const socketRef = useRef(null);

  // Array of received messages
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Create WebSocket connection
    socketRef.current = new WebSocket(url);

    /**
     * Handle incoming messages from server.
     * Appends message to messages array.
     * @param {Event} event - WebSocket message event
     */
    socketRef.current.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    // Cleanup: Close WebSocket connection when component unmounts or URL changes
    return () => {
      socketRef.current?.close();
    };
  }, [url]);

  /**
   * Send message to WebSocket server.
   * @param {string} msg - Message to send
   */
  const sendMessage = (msg) => {
    socketRef.current?.send(msg);
  };

  return { messages, sendMessage };
};

export default useWebSocket;

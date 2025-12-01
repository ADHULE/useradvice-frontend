import { useEffect, useRef, useState } from "react";

const useWebSocket = (url) => {
  const socketRef = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socketRef.current = new WebSocket(url);

    socketRef.current.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    return () => {
      socketRef.current.close();
    };
  }, [url]);

  const sendMessage = (msg) => {
    socketRef.current?.send(msg);
  };

  return { messages, sendMessage };
};

export default useWebSocket;

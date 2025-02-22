import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const useWebSocket = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    const newSocket = io(`${API_URL}`);
    setSocket(newSocket);

    newSocket.on('documentUpdated', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => newSocket.disconnect();
  }, []);

  return { socket, messages };
};

export default useWebSocket;

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Button } from "./ui/Button.tsx";
import SendIcons from "./ui/Icons/SendIcons.tsx";
import { motion } from "framer-motion";

interface Message {
  id: string;
  text: string;
  isSelf: boolean;
}

const RoomChatClient: React.FC = () => {
  const { roomId: urlRoomId } = useParams<{ roomId: string }>();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [roomId, setRoomId] = useState<string>(urlRoomId || "");
  const [joined, setJoined] = useState<boolean>(!!urlRoomId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");

  const addMessage = useCallback((message: Omit<Message, "id">) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...message,
    };
    setMessages((prev) => {
      const isDuplicate = prev.some(
          (msg) => msg.text === newMessage.text && msg.isSelf === newMessage.isSelf
      );
      return isDuplicate ? prev : [...prev, newMessage];
    });
  }, []);

  useEffect(() => {
    const wsUrl =
        window.location.protocol === "https:"
            ? "wss://chat-backend-production-90ea.up.railway.app"
            : "ws://chat-backend-production-90ea.up.railway.app";
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("Connected to WebSocket server.");
      if (urlRoomId) {
        ws.send(
            JSON.stringify({
              type: "join",
              payload: { roomId: urlRoomId },
            })
        );
      }
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        switch (data.type) {
          case "chat":
            addMessage({
              text: data.payload.message,
              isSelf: data.payload.isSelf,
            });
            break;
          case "join_confirmation":
            setJoined(true);
            break;
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };

    setSocket(ws);

    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [urlRoomId, addMessage]);

  const joinRoom = () => {
    if (socket && roomId.trim()) {
      socket.send(
          JSON.stringify({
            type: "join",
            payload: { roomId },
          })
      );
    }
  };

  const createRoom = () => {
    const generatedRoomId = Math.random().toString(36).substr(2, 5).toUpperCase();
    setRoomId(generatedRoomId);
  };

  const sendMessage = () => {
    if (socket && inputMessage.trim()) {
      socket.send(
          JSON.stringify({
            type: "chat",
            payload: { message: inputMessage },
          })
      );
      setInputMessage("");
    }
  };

  return (
      <motion.div
          className="flex flex-col justify-center items-center p-4 w-full max-w-lg mx-auto h-screen md:h-[35rem]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
      >
        {!joined ? (
            <motion.div
                className="flex flex-col items-center w-full"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
              <motion.input
                  type="text"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder="Enter room ID (5 chars)"
                  maxLength={5}
                  className="border rounded px-4 py-2 mb-4 w-full text-black font-sans"
                  whileFocus={{ scale: 1.05 }}
              />
              <div className="flex flex-wrap justify-center items-center gap-2">
                <Button
                    onClick={joinRoom}
                    size="md"
                    variant="primary"
                    title="Join Room"
                />
                <Button
                    onClick={createRoom}
                    size="md"
                    variant="secondary"
                    title="Create New Room"
                />
              </div>
            </motion.div>
        ) : (
            <>
              <motion.div
                  className="p-2 mb-4 text-center rounded border w-full"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
              >
                <p className="text-xl font-medium">
                  Room ID: <span className="text-blue-600 text-xl">{roomId}</span>
                </p>
              </motion.div>
              <div className="h-[60%] md:h-[70%] w-full flex flex-col gap-4 relative border-2 border-gray-400 rounded overflow-y-scroll p-2">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        className={`mb-2 flex ${
                            msg.isSelf ? "justify-end" : "justify-start"
                        }`}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                      <p
                          className={`px-4 py-2 rounded-lg ${
                              msg.isSelf
                                  ? "text-white bg-blue-600 border border-blue-400"
                                  : "text-black bg-slate-100 border border-gray-600"
                          }`}
                      >
                        {msg.text}
                      </p>
                    </motion.div>
                ))}
              </div>
              <motion.div
                  className="mt-4 flex flex-col sm:flex-row justify-center items-center w-full"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
              >
                <motion.textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full sm:w-4/5 border border-gray-300 rounded-lg px-4 py-3 mr-2 text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-sans resize-none overflow-auto"
                    rows={1}
                    whileFocus={{ scale: 1.02 }}
                />
                <Button
                    variant="primary"
                    title="Send"
                    size="md"
                    onClick={sendMessage}
                    endIcon={<SendIcons size="md" />}
                />
              </motion.div>
            </>
        )}
      </motion.div>
  );
};

export default RoomChatClient;

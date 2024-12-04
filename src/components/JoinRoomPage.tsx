import React, { useState, useEffect } from "react";

const RoomChatClient: React.FC = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [roomId, setRoomId] = useState<string>("");
  const [joined, setJoined] = useState<boolean>(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");

  useEffect(() => {
    // Use 'wss' for secure WebSocket connection
    const wsUrl = window.location.protocol === 'https:'
        ? "wss://chat-backend-production-90ea.up.railway.app"
        : "ws://chat-backend-production-90ea.up.railway.app";

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("Connected to WebSocket server.");
    };

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket server.");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setSocket(ws);

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  const joinRoom = () => {
    if (socket && roomId.trim()) {
      socket.send(
          JSON.stringify({
            type: "join",
            payload: { roomId },
          })
      );
      setJoined(true);
    }
  };

  const createRoom = () => {
    const generatedRoomId = Math.random().toString(36).substr(2, 9);
    setRoomId(generatedRoomId);
    console.log(`Room Created: ${generatedRoomId}`);
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
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-4">Room Chat</h1>
        {roomId && (
            <div className=" p-2 mb-4 text-center rounded border">
              <p className="text-xl font-medium">Room ID: <span className="text-blue-600 text-xl">{roomId}</span></p>
            </div>
        )}
        {!joined ? (
            <div className="flex flex-col items-center">
              <input
                  type="text"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder="Enter room ID"
                  className="border rounded px-4 py-2 mb-4 w-full"
              />
              <div className="flex gap-5">
                <button
                    onClick={joinRoom}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Join Room
                </button>
                <button
                    onClick={createRoom}
                    className="bg-purple-500 text-white px-4 py-2 rounded  hover:bg-purple-600"
                >
                  Create Room
                </button>
              </div>

            </div>
        ) : (
            <>
              <div className="border rounded p-4 h-64 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`mb-2 flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                    >
                      <p
                          className={`px-4 py-2 rounded-lg ${
                              index % 2 === 0
                                  ? "text-gray-200 bg-gray-800 border border-gray-600"
                                  : "text-blue-500  border border-blue-400"
                          }`}
                      >
                        {msg}
                      </p>
                    </div>
                ))}
              </div>

              <div className="mt-4 flex">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="border rounded px-4 py-2 flex-1 mr-2"
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Send
                </button>
              </div>
            </>
        )}
      </div>
  );
};

export default RoomChatClient;

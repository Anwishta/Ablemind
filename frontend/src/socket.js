import { io } from "socket.io-client";

const socket = io("http://localhost:8000", {
  transports: ["websocket"],
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("✅ Connected to backend:", socket.id);
});

socket.on("disconnect", () => {
  console.log("❌ Disconnected from backend");
});

export default socket;

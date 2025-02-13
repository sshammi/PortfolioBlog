import { Tmessage } from "./msg.interface";
import Message from "./msg.model";


// Create a new message
const createMessage = async (payload: Tmessage) => {
  const message = await Message.create(payload);
  return message;
};

// Get all messages
const getAllMessages = async () => {
  const messages = await Message.find();
  return messages;
};

// Export services
export const MessageService = {
  createMessage,
  getAllMessages,
};

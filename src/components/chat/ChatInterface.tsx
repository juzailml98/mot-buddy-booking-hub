
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Send, Search, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define message interface
interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  isStaff: boolean;
}

// Define conversation interface
interface Conversation {
  id: string;
  customerId: string;
  customerName: string;
  lastMessage: string;
  lastMessageDate: Date;
  unreadCount: number;
}

// Mock customer data
const mockConversations: Conversation[] = [
  {
    id: "1",
    customerId: "c1",
    customerName: "John Smith",
    lastMessage: "Can I reschedule my MOT appointment?",
    lastMessageDate: new Date("2025-04-02T14:30:00"),
    unreadCount: 1,
  },
  {
    id: "2",
    customerId: "c2",
    customerName: "Sarah Johnson",
    lastMessage: "Thanks for your help with my MOT booking",
    lastMessageDate: new Date("2025-04-01T09:15:00"),
    unreadCount: 0,
  },
  {
    id: "3",
    customerId: "c3",
    customerName: "Mike Williams",
    lastMessage: "When will my report be ready?",
    lastMessageDate: new Date("2025-03-29T16:40:00"),
    unreadCount: 2,
  },
  {
    id: "4",
    customerId: "c4",
    customerName: "Emma Brown",
    lastMessage: "Is there any update on my repair quote?",
    lastMessageDate: new Date("2025-03-28T11:20:00"),
    unreadCount: 0,
  },
];

// Mock messages for a conversation
const mockMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "m1",
      senderId: "c1",
      senderName: "John Smith",
      content: "Hello, I need to reschedule my MOT appointment from Friday to next week if possible.",
      timestamp: new Date("2025-04-02T14:30:00"),
      isStaff: false,
    },
  ],
  "2": [
    {
      id: "m2",
      senderId: "c2",
      senderName: "Sarah Johnson",
      content: "Hi there, I just wanted to book an MOT test for my Volkswagen Golf.",
      timestamp: new Date("2025-04-01T09:10:00"),
      isStaff: false,
    },
    {
      id: "m3",
      senderId: "s1",
      senderName: "MOT Staff",
      content: "Hello Sarah, I've booked you in for next Wednesday at 10:30am. Does that work for you?",
      timestamp: new Date("2025-04-01T09:12:00"),
      isStaff: true,
    },
    {
      id: "m4",
      senderId: "c2",
      senderName: "Sarah Johnson",
      content: "That's perfect, thanks for your help!",
      timestamp: new Date("2025-04-01T09:15:00"),
      isStaff: false,
    },
  ],
  "3": [
    {
      id: "m5",
      senderId: "c3",
      senderName: "Mike Williams",
      content: "I completed my MOT test yesterday, when will the report be available?",
      timestamp: new Date("2025-03-29T16:40:00"),
      isStaff: false,
    },
    {
      id: "m6",
      senderId: "c3",
      senderName: "Mike Williams",
      content: "Also, will I receive a notification when it's ready?",
      timestamp: new Date("2025-03-29T16:41:00"),
      isStaff: false,
    },
  ],
  "4": [
    {
      id: "m7",
      senderId: "c4",
      senderName: "Emma Brown",
      content: "I received the repair quote but I have some questions about it.",
      timestamp: new Date("2025-03-28T11:15:00"),
      isStaff: false,
    },
    {
      id: "m8",
      senderId: "s1",
      senderName: "MOT Staff",
      content: "Hi Emma, I'd be happy to answer any questions you have. What would you like to know?",
      timestamp: new Date("2025-03-28T11:18:00"),
      isStaff: true,
    },
    {
      id: "m9",
      senderId: "c4",
      senderName: "Emma Brown",
      content: "Is there any update on my repair quote?",
      timestamp: new Date("2025-03-28T11:20:00"),
      isStaff: false,
    },
  ],
};

const ChatInterface: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [conversations, setConversations] = useState(mockConversations);
  const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessages);
  const { toast } = useToast();

  // Filter conversations by search term
  const filteredConversations = conversations.filter((conversation) =>
    conversation.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!selectedConversation || !newMessage.trim()) return;

    const newMessageObj: Message = {
      id: `m${Date.now()}`,
      senderId: "s1",
      senderName: "MOT Staff",
      content: newMessage,
      timestamp: new Date(),
      isStaff: true,
    };

    // Update messages
    const updatedMessages = {
      ...messages,
      [selectedConversation]: [...(messages[selectedConversation] || []), newMessageObj],
    };

    // Update conversation last message
    const updatedConversations = conversations.map((convo) => {
      if (convo.id === selectedConversation) {
        return {
          ...convo,
          lastMessage: newMessage,
          lastMessageDate: new Date(),
        };
      }
      return convo;
    });

    setMessages(updatedMessages);
    setConversations(updatedConversations);
    setNewMessage("");

    toast({
      title: "Message sent",
      description: "Your message has been sent successfully",
    });
  };

  // Format date to show only time if today, otherwise show date
  const formatMessageDate = (date: Date) => {
    const today = new Date();
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    if (isToday) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex h-[600px] border rounded-md overflow-hidden">
      {/* Contact list */}
      <div className="w-1/3 border-r">
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <ScrollArea className="h-[552px]">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                selectedConversation === conversation.id ? "bg-gray-100" : ""
              }`}
              onClick={() => {
                setSelectedConversation(conversation.id);
                // Mark as read when selected
                if (conversation.unreadCount > 0) {
                  const updatedConversations = conversations.map((c) => {
                    if (c.id === conversation.id) {
                      return { ...c, unreadCount: 0 };
                    }
                    return c;
                  });
                  setConversations(updatedConversations);
                }
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-gray-200 rounded-full p-2 mr-3">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">{conversation.customerName}</p>
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">
                    {conversation.lastMessageDate.toLocaleDateString()}
                  </p>
                  {conversation.unreadCount > 0 && (
                    <span className="inline-block bg-mot text-white text-xs rounded-full h-5 w-5 flex items-center justify-center mt-1">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          {filteredConversations.length === 0 && (
            <div className="p-4 text-center text-gray-500">No conversations found</div>
          )}
        </ScrollArea>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat header */}
            <div className="p-3 border-b bg-gray-50 flex items-center">
              <div className="bg-gray-200 rounded-full p-2 mr-3">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="font-medium">
                  {conversations.find((c) => c.id === selectedConversation)?.customerName}
                </p>
                <p className="text-xs text-gray-500">Vehicle: Ford Focus (AB12CDE)</p>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                {messages[selectedConversation]?.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isStaff ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.isStaff
                          ? "bg-mot text-white rounded-br-none"
                          : "bg-gray-100 rounded-bl-none"
                      }`}
                    >
                      <div className="text-sm">{message.content}</div>
                      <div
                        className={`text-xs mt-1 text-right ${
                          message.isStaff ? "text-mot-gray" : "text-gray-500"
                        }`}
                      >
                        {formatMessageDate(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
                {messages[selectedConversation]?.length === 0 && (
                  <div className="text-center text-gray-500 my-8">No messages yet</div>
                )}
              </div>
            </ScrollArea>

            {/* Message input */}
            <div className="p-3 border-t">
              <div className="flex">
                <Textarea
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="rounded-r-none"
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  className="rounded-l-none bg-mot hover:bg-mot/90"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Press Enter to send, Shift+Enter for a new line
              </p>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <User className="h-12 w-12 mx-auto text-gray-400 mb-2" />
              <p className="text-lg font-medium">Select a conversation</p>
              <p className="text-sm">Choose a customer from the list to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;

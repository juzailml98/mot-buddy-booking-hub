
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash, Search, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

// Enhanced booking interface to include messages
interface Message {
  id: string;
  content: string;
  timestamp: Date;
  isStaff: boolean;
}

interface Booking {
  id: string;
  customerName: string;
  registration: string;
  vehicleDetails: string;
  date: Date;
  status: string;
  messages: Message[];
  unreadCount: number;
}

// Enhanced mock booking data with messages
const mockBookings: Booking[] = [
  {
    id: "1",
    customerName: "John Smith",
    registration: "AB12CDE",
    vehicleDetails: "Ford Focus (2018)",
    date: new Date("2025-04-15T09:00:00"),
    status: "Confirmed",
    messages: [
      {
        id: "m1",
        content: "Hi, I want to confirm my MOT appointment for next week.",
        timestamp: new Date("2025-04-10T10:15:00"),
        isStaff: false,
      }
    ],
    unreadCount: 1,
  },
  {
    id: "2",
    customerName: "Sarah Johnson",
    registration: "XY58ABC",
    vehicleDetails: "Volkswagen Golf (2020)",
    date: new Date("2025-04-16T10:30:00"),
    status: "Confirmed",
    messages: [
      {
        id: "m2",
        content: "Can I reschedule my MOT appointment to next week?",
        timestamp: new Date("2025-04-12T14:30:00"),
        isStaff: false,
      },
      {
        id: "m3",
        content: "Yes, we can reschedule to next Friday at 10:30am. Does that work for you?",
        timestamp: new Date("2025-04-12T15:00:00"),
        isStaff: true,
      }
    ],
    unreadCount: 0,
  },
  {
    id: "3",
    customerName: "Mike Williams",
    registration: "LK70MNO",
    vehicleDetails: "Toyota Prius (2021)",
    date: new Date("2025-04-05T14:00:00"),
    status: "Completed",
    messages: [
      {
        id: "m4",
        content: "When will my report be ready?",
        timestamp: new Date("2025-03-29T16:40:00"),
        isStaff: false,
      },
      {
        id: "m5",
        content: "Your report will be ready by tomorrow afternoon.",
        timestamp: new Date("2025-03-29T17:10:00"),
        isStaff: true,
      },
      {
        id: "m6",
        content: "Thanks for the update!",
        timestamp: new Date("2025-03-29T17:20:00"),
        isStaff: false,
      }
    ],
    unreadCount: 0,
  },
  {
    id: "4",
    customerName: "Emma Brown",
    registration: "PQ19RST",
    vehicleDetails: "Nissan Qashqai (2019)",
    date: new Date("2025-04-10T11:00:00"),
    status: "Cancelled",
    messages: [
      {
        id: "m7",
        content: "I need to cancel my appointment due to an emergency.",
        timestamp: new Date("2025-04-08T09:30:00"),
        isStaff: false,
      },
      {
        id: "m8",
        content: "Your appointment has been cancelled. No fee will be charged.",
        timestamp: new Date("2025-04-08T09:45:00"),
        isStaff: true,
      }
    ],
    unreadCount: 0,
  },
];

const BookingList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookings, setBookings] = useState(mockBookings);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();

  const filteredBookings = bookings.filter((booking) =>
    booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.registration.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.vehicleDetails.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
    toast({
      title: "Booking deleted",
      description: `Booking ID ${id} has been removed`,
    });
  };

  const handleEdit = (id: string) => {
    // In a real app, this would open an edit modal or navigate to an edit page
    toast({
      title: "Edit booking",
      description: `Editing booking ID ${id}`,
    });
  };

  const handleOpenMessages = (booking: Booking) => {
    setSelectedBooking(booking);
    setMessageDialogOpen(true);
    
    // Mark messages as read
    if (booking.unreadCount > 0) {
      const updatedBookings = bookings.map((b) => {
        if (b.id === booking.id) {
          return { ...b, unreadCount: 0 };
        }
        return b;
      });
      setBookings(updatedBookings);
    }
  };

  const handleSendMessage = () => {
    if (!selectedBooking || !newMessage.trim()) return;

    const newMessageObj: Message = {
      id: `m${Date.now()}`,
      content: newMessage,
      timestamp: new Date(),
      isStaff: true,
    };

    // Add new message to the booking
    const updatedBookings = bookings.map((booking) => {
      if (booking.id === selectedBooking.id) {
        return {
          ...booking,
          messages: [...booking.messages, newMessageObj],
        };
      }
      return booking;
    });

    setBookings(updatedBookings);
    setNewMessage("");
    
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case "Completed":
        return <Badge className="bg-blue-500">Completed</Badge>;
      case "Cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Upcoming MOT Appointments</h3>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <div className="font-medium">{booking.customerName}</div>
                  </TableCell>
                  <TableCell>
                    <div>{booking.vehicleDetails}</div>
                    <div className="text-xs text-gray-500">{booking.registration}</div>
                  </TableCell>
                  <TableCell>
                    {booking.date.toLocaleDateString()} at{" "}
                    {booking.date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenMessages(booking)}
                      className="relative"
                    >
                      <MessageSquare className="h-4 w-4" />
                      {booking.unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs">
                          {booking.unreadCount}
                        </span>
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(booking.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(booking.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No bookings found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Message Dialog */}
      <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
        <DialogContent className="max-w-md sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selectedBooking ? `Messages with ${selectedBooking.customerName}` : "Messages"}
            </DialogTitle>
          </DialogHeader>

          {selectedBooking && (
            <>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="font-medium">{selectedBooking.vehicleDetails}</div>
                <div className="text-sm text-gray-500">
                  {selectedBooking.registration} - Appointment: {selectedBooking.date.toLocaleDateString()} at{" "}
                  {selectedBooking.date.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto border rounded-md p-3">
                {selectedBooking.messages.length > 0 ? (
                  <div className="space-y-4">
                    {selectedBooking.messages.map((message) => (
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
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">No messages yet</div>
                )}
              </div>

              <div className="flex items-end gap-2">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                  rows={2}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-mot hover:bg-mot/90"
                >
                  Send
                </Button>
              </div>
            </>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setMessageDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingList;

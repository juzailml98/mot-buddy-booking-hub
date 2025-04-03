
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock booking data
const mockBookings = [
  {
    id: "1",
    customerName: "John Smith",
    registration: "AB12CDE",
    vehicleDetails: "Ford Focus (2018)",
    date: new Date("2025-04-15T09:00:00"),
    status: "Confirmed",
  },
  {
    id: "2",
    customerName: "Sarah Johnson",
    registration: "XY58ABC",
    vehicleDetails: "Volkswagen Golf (2020)",
    date: new Date("2025-04-16T10:30:00"),
    status: "Confirmed",
  },
  {
    id: "3",
    customerName: "Mike Williams",
    registration: "LK70MNO",
    vehicleDetails: "Toyota Prius (2021)",
    date: new Date("2025-04-05T14:00:00"),
    status: "Completed",
  },
  {
    id: "4",
    customerName: "Emma Brown",
    registration: "PQ19RST",
    vehicleDetails: "Nissan Qashqai (2019)",
    date: new Date("2025-04-10T11:00:00"),
    status: "Cancelled",
  },
];

const BookingList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookings, setBookings] = useState(mockBookings);
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
    </div>
  );
};

export default BookingList;

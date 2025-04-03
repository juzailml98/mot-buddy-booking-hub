
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Car, FileText } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const MyBookings = () => {
  const [email, setEmail] = useState("");
  const [reference, setReference] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState<any[] | null>(null);
  const { toast } = useToast();

  // Mock booking data
  const mockBookingsData = [
    {
      id: "MOT-12345",
      vehicleReg: "AB12CDE",
      vehicleDetails: "Ford Focus (2018)",
      date: new Date("2025-04-15T09:00:00"),
      status: "Upcoming",
      report: null,
    },
    {
      id: "MOT-12346",
      vehicleReg: "XY58ABC",
      vehicleDetails: "Volkswagen Golf (2020)",
      date: new Date("2025-03-20T10:30:00"),
      status: "Completed",
      report: "mot-report-12346.pdf",
    },
  ];

  const handleFindBookings = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !reference) {
      toast({
        title: "Missing information",
        description: "Please enter both your email and booking reference",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // For demo purposes, we'll show bookings if the reference is "MOT1234"
      if (reference.toUpperCase() === "MOT1234") {
        setBookings(mockBookingsData);
        toast({
          title: "Bookings found",
          description: "Your booking details have been loaded",
        });
      } else {
        setBookings([]);
        toast({
          title: "No bookings found",
          description: "Try with reference: MOT1234",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Upcoming":
        return <Badge className="bg-blue-500">Upcoming</Badge>;
      case "Completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "Cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold mb-8 text-center">My MOT Bookings</h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Find Your Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFindBookings} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reference">Booking Reference</Label>
                  <Input
                    id="reference"
                    placeholder="e.g., MOT1234"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    For demo, use reference: MOT1234
                  </p>
                </div>
                
                <Button
                  type="submit"
                  className="w-full mot-btn-gradient"
                  disabled={isLoading}
                >
                  {isLoading ? "Searching..." : "Find My Bookings"}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {bookings && (
            <div className="space-y-6">
              <h2 className="text-xl font-medium">Your Bookings</h2>
              
              {bookings.length > 0 ? (
                <Table className="border rounded-md">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Reference</TableHead>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.id}</TableCell>
                        <TableCell>
                          <div>{booking.vehicleDetails}</div>
                          <div className="text-xs text-gray-500">{booking.vehicleReg}</div>
                        </TableCell>
                        <TableCell>
                          {booking.date.toLocaleDateString()} at{" "}
                          {booking.date.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                        <TableCell className="text-right space-x-2">
                          {booking.status === "Upcoming" && (
                            <Button variant="outline" size="sm">
                              Reschedule
                            </Button>
                          )}
                          {booking.report && (
                            <Button variant="outline" size="sm">
                              <FileText className="mr-1 h-4 w-4" />
                              View Report
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Card className="bg-gray-50">
                  <CardContent className="py-8 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                      <Calendar className="h-6 w-6 text-gray-600" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">No bookings found</h3>
                    <p className="text-gray-500 mb-4">
                      We couldn't find any bookings with the provided details.
                    </p>
                    <Button asChild className="mot-btn-gradient">
                      <a href="/booking">Book an MOT Now</a>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MyBookings;

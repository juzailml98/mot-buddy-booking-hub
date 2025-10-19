
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Car, FileText, MessageSquare, Plus, User } from "lucide-react";
import DashboardStats from "@/components/dashboard/DashboardStats";
import BookingList from "@/components/dashboard/BookingList";
import BookingForm from "@/components/booking/BookingForm";
import ReportsManagement from "@/components/reports/ReportsManagement";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-6 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Staff Dashboard</h1>
              <p className="text-gray-500">
                Manage bookings, reports, and customer information
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button className="mot-btn-gradient">
                <Plus className="mr-2 h-4 w-4" />
                New Booking
              </Button>
            </div>
          </div>
          
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="bg-mot-gray">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white">
                Overview
              </TabsTrigger>
              <TabsTrigger value="bookings" className="data-[state=active]:bg-white">
                Bookings
              </TabsTrigger>
              <TabsTrigger value="customers" className="data-[state=active]:bg-white">
                Customers
              </TabsTrigger>
              <TabsTrigger value="new-booking" className="data-[state=active]:bg-white">
                New Booking
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <DashboardStats />
              
              <BookingList />
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="mr-2 h-5 w-5" />
                      Recent Reports
                    </CardTitle>
                    <CardDescription>
                      Recently completed MOT test reports
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Toyota Prius (LK70MNO)</p>
                          <p className="text-sm text-gray-500">MOT Report - Completed on April 5, 2025</p>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Honda Civic (BC22DEF)</p>
                          <p className="text-sm text-gray-500">Service Record - Completed on April 1, 2025</p>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Ford Focus (AB12CDE)</p>
                          <p className="text-sm text-gray-500">Diagnostic Report - Completed on March 30, 2025</p>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageSquare className="mr-2 h-5 w-5" />
                      Recent Messages
                    </CardTitle>
                    <CardDescription>
                      Latest customer communications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-gray-100 p-2 rounded-full">
                          <User className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="font-medium">Sarah Johnson (XY58ABC)</p>
                            <span className="text-xs text-gray-500">Yesterday</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            Can I reschedule my MOT appointment to next week?
                          </p>
                          <Button variant="link" className="p-0 h-auto text-mot" size="sm">
                            Reply
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-gray-100 p-2 rounded-full">
                          <User className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="font-medium">Mike Williams (LK70MNO)</p>
                            <span className="text-xs text-gray-500">2 days ago</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            Are any repairs needed for my Toyota Prius?
                          </p>
                          <Button variant="link" className="p-0 h-auto text-mot" size="sm">
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>All Bookings</CardTitle>
                  <CardDescription>
                    View and manage all MOT test bookings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BookingList />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Vehicle Reports Management</CardTitle>
                  <CardDescription>
                    Create and manage different types of vehicle reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ReportsManagement />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="customers">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Management</CardTitle>
                  <CardDescription>
                    View and manage customer information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-8 text-gray-500">
                    Customer management functionality to be implemented in future updates.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="new-booking">
              <Card>
                <CardHeader>
                  <CardTitle>Create New Booking</CardTitle>
                  <CardDescription>
                    Book an MOT test for a customer
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BookingForm isStaffBooking={true} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;

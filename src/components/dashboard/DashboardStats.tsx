
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Car, CheckCircle, Clock } from "lucide-react";

const DashboardStats = () => {
  // Mock statistics - in a real app these would come from an API
  const stats = {
    totalBookings: 42,
    upcomingBookings: 12,
    completedMOTs: 30,
    vehiclesServiced: 25,
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Total Bookings
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <p className="text-2xl font-bold">{stats.totalBookings}</p>
          <Calendar className="h-8 w-8 text-mot opacity-80" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Upcoming MOTs
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <p className="text-2xl font-bold">{stats.upcomingBookings}</p>
          <Clock className="h-8 w-8 text-mot-light opacity-80" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Completed MOTs
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <p className="text-2xl font-bold">{stats.completedMOTs}</p>
          <CheckCircle className="h-8 w-8 text-mot-accent opacity-80" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Vehicles Serviced
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <p className="text-2xl font-bold">{stats.vehiclesServiced}</p>
          <Car className="h-8 w-8 text-gray-500 opacity-80" />
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;

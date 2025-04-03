
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface AppointmentCalendarProps {
  onDateTimeSelect: (date: Date, timeSlot: string) => void;
}

const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({ onDateTimeSelect }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  // Mock available time slots - in a real app these would be fetched from an API
  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30"
  ];

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null); // Reset time slot when date changes
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTimeSlot(time);
    if (selectedDate) {
      const [hours, minutes] = time.split(':').map(Number);
      const dateTime = new Date(selectedDate);
      dateTime.setHours(hours, minutes);
      onDateTimeSelect(dateTime, time);
    }
  };

  // Function to check if a date should be disabled
  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Disable past dates and weekends
    const isPastDate = date < today;
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    
    return isPastDate || isWeekend;
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-4">Select Appointment Date & Time</h3>
        <div className="space-y-6">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={isDateDisabled}
            className="rounded-md border"
          />
          
          {selectedDate && (
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Available Time Slots
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTimeSlot === time ? "default" : "outline"}
                    className={selectedTimeSlot === time ? "bg-mot" : ""}
                    onClick={() => handleTimeSelect(time)}
                    size="sm"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentCalendar;


import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Car } from "lucide-react";
import VehicleLookup, { VehicleData } from "@/components/ui/VehicleLookup";
import AppointmentCalendar from "@/components/booking/AppointmentCalendar";

interface BookingFormProps {
  isStaffBooking?: boolean;
}

const BookingForm: React.FC<BookingFormProps> = ({ isStaffBooking = false }) => {
  const [step, setStep] = useState(1);
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(null);
  const [appointmentTime, setAppointmentTime] = useState<string | null>(null);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleVehicleSelect = (data: VehicleData) => {
    setVehicleData(data);
    setStep(2);
  };

  const handleDateTimeSelect = (date: Date, timeSlot: string) => {
    setAppointmentDate(date);
    setAppointmentTime(timeSlot);
    setStep(3);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicleData || !appointmentDate || !appointmentTime) {
      toast({
        title: "Missing information",
        description: "Please complete all steps of the booking process",
        variant: "destructive",
      });
      return;
    }

    if (!customerDetails.name || !customerDetails.email || !customerDetails.phone) {
      toast({
        title: "Missing details",
        description: "Please provide all required contact information",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Booking successful!",
        description: `MOT booked for ${vehicleData.make} ${vehicleData.model} on ${appointmentDate.toLocaleDateString()} at ${appointmentTime}`,
      });
      setIsSubmitting(false);
      // In a real app, you would redirect to a confirmation page or show a success modal
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isStaffBooking ? "Staff Booking Portal" : "Book Your MOT Test"}
      </h2>
      
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <Button
            variant={step === 1 ? "default" : "outline"}
            className={`${step === 1 ? "bg-mot" : "bg-white"} rounded-full h-10 w-10 p-0`}
            onClick={() => setStep(1)}
          >
            1
          </Button>
          <div className={`h-1 flex-grow mx-2 ${step > 1 ? "bg-mot" : "bg-gray-200"}`}></div>
          <Button
            variant={step === 2 ? "default" : "outline"}
            className={`${step === 2 ? "bg-mot" : "bg-white"} rounded-full h-10 w-10 p-0`}
            onClick={() => vehicleData && setStep(2)}
            disabled={!vehicleData}
          >
            2
          </Button>
          <div className={`h-1 flex-grow mx-2 ${step > 2 ? "bg-mot" : "bg-gray-200"}`}></div>
          <Button
            variant={step === 3 ? "default" : "outline"}
            className={`${step === 3 ? "bg-mot" : "bg-white"} rounded-full h-10 w-10 p-0`}
            onClick={() => appointmentDate && setStep(3)}
            disabled={!appointmentDate}
          >
            3
          </Button>
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span>Vehicle Details</span>
          <span>Select Date & Time</span>
          <span>Customer Info</span>
        </div>
      </div>
      
      {step === 1 && (
        <>
          <VehicleLookup onVehicleSelect={handleVehicleSelect} />
          
          {vehicleData && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Car className="mr-2 h-5 w-5" />
                  Vehicle Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Registration</Label>
                    <p className="font-medium">{vehicleData.registration}</p>
                  </div>
                  <div>
                    <Label>Make</Label>
                    <p className="font-medium">{vehicleData.make}</p>
                  </div>
                  <div>
                    <Label>Model</Label>
                    <p className="font-medium">{vehicleData.model}</p>
                  </div>
                  <div>
                    <Label>Year</Label>
                    <p className="font-medium">{vehicleData.year}</p>
                  </div>
                  <div>
                    <Label>Fuel Type</Label>
                    <p className="font-medium">{vehicleData.fuelType}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full mot-btn-gradient" onClick={() => setStep(2)}>
                  Continue to Select Date & Time
                </Button>
              </CardFooter>
            </Card>
          )}
        </>
      )}
      
      {step === 2 && (
        <>
          <AppointmentCalendar onDateTimeSelect={handleDateTimeSelect} />
          
          {appointmentDate && appointmentTime && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Selected Appointment</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <span className="font-medium">Date:</span> {appointmentDate.toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p>
                  <span className="font-medium">Time:</span> {appointmentTime}
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full mot-btn-gradient" onClick={() => setStep(3)}>
                  Continue to Customer Details
                </Button>
              </CardFooter>
            </Card>
          )}
        </>
      )}
      
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Customer Details</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={customerDetails.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={customerDetails.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={customerDetails.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={customerDetails.notes}
                  onChange={handleInputChange}
                  placeholder="Any specific requirements or information we should know"
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full mot-btn-gradient"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Confirm Booking"}
              </Button>
              
              <div className="text-sm text-gray-500">
                By booking an appointment, you agree to our terms and conditions.
              </div>
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  );
};

export default BookingForm;


import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BookingForm from "@/components/booking/BookingForm";

const Booking = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10 px-4">
        <div className="container mx-auto">
          <BookingForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Booking;


import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Car, Calendar, FileText, MessageSquare } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-mot py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
            Book Your MOT Test in Minutes
          </h1>
          <p className="text-xl text-white/90 mb-8 text-center max-w-2xl">
            Fast, convenient MOT testing with digital reports and easy booking. Save time with MOT Buddy.
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-6 mot-btn-gradient">
            <Link to="/booking">Book Your MOT Now</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose <span className="text-mot">MOT Buddy</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="mot-card">
              <CardContent className="pt-6 text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-mot/10">
                  <Calendar className="h-6 w-6 text-mot" />
                </div>
                <h3 className="text-lg font-medium mb-2">Easy Booking</h3>
                <p className="text-gray-500">
                  Book your MOT in minutes with our simple online booking system.
                </p>
              </CardContent>
            </Card>
            
            <Card className="mot-card">
              <CardContent className="pt-6 text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-mot-light/10">
                  <Car className="h-6 w-6 text-mot-light" />
                </div>
                <h3 className="text-lg font-medium mb-2">Vehicle Lookup</h3>
                <p className="text-gray-500">
                  Enter your registration and we'll fill in the details automatically.
                </p>
              </CardContent>
            </Card>
            
            <Card className="mot-card">
              <CardContent className="pt-6 text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-mot-accent/10">
                  <FileText className="h-6 w-6 text-mot-accent" />
                </div>
                <h3 className="text-lg font-medium mb-2">Digital Reports</h3>
                <p className="text-gray-500">
                  Access your MOT reports online and share them easily.
                </p>
              </CardContent>
            </Card>
            
            <Card className="mot-card">
              <CardContent className="pt-6 text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                  <MessageSquare className="h-6 w-6 text-gray-600" />
                </div>
                <h3 className="text-lg font-medium mb-2">Direct Support</h3>
                <p className="text-gray-500">
                  Contact garage staff directly through our messaging system.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 h-full w-0.5 bg-mot-light"></div>
              
              {/* Step 1 */}
              <div className="relative flex items-start mb-8 gap-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-mot text-white">
                  <span className="text-xl font-bold">1</span>
                </div>
                <div className="pt-3">
                  <h3 className="text-xl font-medium mb-2">Enter Your Registration</h3>
                  <p className="text-gray-600">
                    Simply enter your vehicle registration and we'll look up all the necessary details. No more paperwork!
                  </p>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative flex items-start mb-8 gap-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-mot text-white">
                  <span className="text-xl font-bold">2</span>
                </div>
                <div className="pt-3">
                  <h3 className="text-xl font-medium mb-2">Choose a Date & Time</h3>
                  <p className="text-gray-600">
                    Select from our available slots to find a time that works best for you. We offer flexible appointment times.
                  </p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative flex items-start gap-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-mot text-white">
                  <span className="text-xl font-bold">3</span>
                </div>
                <div className="pt-3">
                  <h3 className="text-xl font-medium mb-2">Confirm & Attend</h3>
                  <p className="text-gray-600">
                    Receive a confirmation email with all details. Bring your vehicle at the scheduled time and we'll take care of the rest.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button asChild className="mot-btn-gradient">
                <Link to="/booking">Book Your MOT Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-mot">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Book Your MOT?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Our easy online booking system makes scheduling your MOT test quick and hassle-free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="default" className="bg-white text-mot hover:bg-gray-100">
              <Link to="/booking">Book Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/my-bookings">View My Bookings</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;

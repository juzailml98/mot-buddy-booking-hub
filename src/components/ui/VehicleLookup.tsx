
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VehicleLookupProps {
  onVehicleSelect: (vehicleData: VehicleData) => void;
}

export interface VehicleData {
  registration: string;
  make: string;
  model: string;
  year: string;
  fuelType: string;
}

const VehicleLookup: React.FC<VehicleLookupProps> = ({ onVehicleSelect }) => {
  const [registration, setRegistration] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock vehicle database - in a real app this would be an API call
  const mockVehicleDatabase: Record<string, VehicleData> = {
    "AB12CDE": {
      registration: "AB12CDE",
      make: "Ford",
      model: "Focus",
      year: "2018",
      fuelType: "Petrol",
    },
    "XY58ABC": {
      registration: "XY58ABC",
      make: "Volkswagen",
      model: "Golf",
      year: "2020",
      fuelType: "Diesel",
    },
    "LK70MNO": {
      registration: "LK70MNO",
      make: "Toyota",
      model: "Prius",
      year: "2021",
      fuelType: "Hybrid",
    },
  };

  const handleLookup = () => {
    if (!registration.trim()) {
      toast({
        title: "Registration required",
        description: "Please enter a vehicle registration number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      const formattedReg = registration.toUpperCase().replace(/\s/g, "");
      const vehicleData = mockVehicleDatabase[formattedReg];

      if (vehicleData) {
        toast({
          title: "Vehicle found",
          description: `${vehicleData.make} ${vehicleData.model} (${vehicleData.year})`,
        });
        onVehicleSelect(vehicleData);
      } else {
        toast({
          title: "Vehicle not found",
          description: "Try one of our sample registrations: AB12CDE, XY58ABC, or LK70MNO",
          variant: "destructive",
        });
      }

      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-4">Vehicle Lookup</h3>
        <div className="flex space-x-2">
          <Input
            placeholder="Enter registration (e.g., AB12CDE)"
            value={registration}
            onChange={(e) => setRegistration(e.target.value)}
            className="uppercase"
            maxLength={8}
          />
          <Button onClick={handleLookup} disabled={isLoading}>
            <Search className="mr-2 h-4 w-4" />
            {isLoading ? "Searching..." : "Lookup"}
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          For demo purposes, try: AB12CDE, XY58ABC, or LK70MNO
        </p>
      </CardContent>
    </Card>
  );
};

export default VehicleLookup;

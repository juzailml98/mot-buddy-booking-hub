
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, FileText, Car, Edit, Download, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define a type for reports
interface Report {
  id: string;
  customerName: string;
  registration: string;
  vehicleDetails: string;
  reportType: "MOT" | "Diagnostic" | "Service";
  date: Date;
  status: "Completed" | "Pending" | "In Progress";
}

// Mock data for reports
const mockReports: Report[] = [
  {
    id: "1",
    customerName: "John Smith",
    registration: "AB12CDE",
    vehicleDetails: "Ford Focus (2018)",
    reportType: "MOT",
    date: new Date("2025-04-05T14:00:00"),
    status: "Completed",
  },
  {
    id: "2",
    customerName: "Sarah Johnson",
    registration: "XY58ABC",
    vehicleDetails: "Volkswagen Golf (2020)",
    reportType: "MOT",
    date: new Date("2025-04-10T10:30:00"),
    status: "Pending",
  },
  {
    id: "3",
    customerName: "Mike Williams",
    registration: "LK70MNO",
    vehicleDetails: "Toyota Prius (2021)",
    reportType: "Diagnostic",
    date: new Date("2025-04-01T11:15:00"),
    status: "Completed",
  },
  {
    id: "4",
    customerName: "Emma Brown",
    registration: "PQ19RST",
    vehicleDetails: "Nissan Qashqai (2019)",
    reportType: "Service",
    date: new Date("2025-03-28T09:45:00"),
    status: "Completed",
  },
  {
    id: "5",
    customerName: "David Lee",
    registration: "GH45IJK",
    vehicleDetails: "Audi A3 (2022)",
    reportType: "Diagnostic",
    date: new Date("2025-04-08T15:30:00"),
    status: "In Progress",
  },
];

const ReportsManagement: React.FC = () => {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [reportTypeFilter, setReportTypeFilter] = useState<string | null>(null);
  const { toast } = useToast();

  // Filter reports based on active tab, search term, and report type filter
  const filteredReports = reports.filter((report) => {
    const matchesTab = activeTab === "all" || 
                      (activeTab === "mot" && report.reportType === "MOT") ||
                      (activeTab === "diagnostic" && report.reportType === "Diagnostic") ||
                      (activeTab === "service" && report.reportType === "Service");
    
    const matchesSearch = report.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.registration.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.vehicleDetails.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !reportTypeFilter || report.reportType === reportTypeFilter;
    
    return matchesTab && matchesSearch && matchesType;
  });

  // Get status badge based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "Pending":
        return <Badge className="bg-amber-500">Pending</Badge>;
      case "In Progress":
        return <Badge className="bg-blue-500">In Progress</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Get report type badge based on type
  const getReportTypeBadge = (type: string) => {
    switch (type) {
      case "MOT":
        return <Badge className="bg-mot">MOT</Badge>;
      case "Diagnostic":
        return <Badge className="bg-purple-500">Diagnostic</Badge>;
      case "Service":
        return <Badge className="bg-indigo-500">Service</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const handleAddReport = () => {
    toast({
      title: "Create new report",
      description: "This feature will be implemented soon",
    });
  };

  const handleDownload = (id: string) => {
    toast({
      title: "Report downloaded",
      description: `Report ID ${id} has been downloaded`,
    });
  };

  const handleEdit = (id: string) => {
    toast({
      title: "Edit report",
      description: `Editing report ID ${id}`,
    });
  };

  const handleDelete = (id: string) => {
    setReports(reports.filter((report) => report.id !== id));
    toast({
      title: "Report deleted",
      description: `Report ID ${id} has been removed`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full md:w-auto"
        >
          <TabsList>
            <TabsTrigger value="all">All Reports</TabsTrigger>
            <TabsTrigger value="mot">MOT</TabsTrigger>
            <TabsTrigger value="diagnostic">Diagnostic</TabsTrigger>
            <TabsTrigger value="service">Service</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-full sm:w-64"
            />
          </div>

          <div className="flex gap-2">
            <Select onValueChange={(value) => setReportTypeFilter(value || null)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All types</SelectItem>
                <SelectItem value="MOT">MOT</SelectItem>
                <SelectItem value="Diagnostic">Diagnostic</SelectItem>
                <SelectItem value="Service">Service</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={handleAddReport}>
              <Plus className="mr-2 h-4 w-4" /> New Report
            </Button>
          </div>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer/Vehicle</TableHead>
              <TableHead>Report Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div className="font-medium">{report.customerName}</div>
                    <div className="text-sm text-gray-500">
                      {report.vehicleDetails} ({report.registration})
                    </div>
                  </TableCell>
                  <TableCell>{getReportTypeBadge(report.reportType)}</TableCell>
                  <TableCell>
                    {report.date.toLocaleDateString()} at{" "}
                    {report.date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell>{getStatusBadge(report.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDownload(report.id)}
                      title="Download"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(report.id)}
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(report.id)}
                      title="Delete"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No reports found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ReportsManagement;

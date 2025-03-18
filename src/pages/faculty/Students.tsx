
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";
import { CustomCard } from "@/components/ui/CustomCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Download, Search, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FacultyStudents() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock student data
  const students = [
    {
      id: "1",
      name: "John Doe",
      rollNumber: "CS2001",
      department: "Computer Science",
      year: "3rd Year",
      email: "john.doe@example.com",
    },
    {
      id: "2",
      name: "Jane Smith",
      rollNumber: "ME1005",
      department: "Mechanical Engineering",
      year: "2nd Year",
      email: "jane.smith@example.com",
    },
    {
      id: "3",
      name: "Alice Johnson",
      rollNumber: "EC3045",
      department: "Electronics",
      year: "4th Year",
      email: "alice.johnson@example.com",
    },
    {
      id: "4",
      name: "Bob Williams",
      rollNumber: "CS2023",
      department: "Computer Science",
      year: "3rd Year",
      email: "bob.williams@example.com",
    },
    {
      id: "5",
      name: "Charlie Brown",
      rollNumber: "CV1089",
      department: "Civil Engineering",
      year: "1st Year",
      email: "charlie.brown@example.com",
    },
  ];

  // Filter students based on search query
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Download students data as CSV
  const downloadStudentsData = () => {
    // Create CSV content
    const headers = ["Name", "Roll Number", "Department", "Year", "Email"];
    const csvContent = [
      headers.join(","),
      ...students.map((student) => 
        [
          student.name,
          student.rollNumber,
          student.department,
          student.year,
          student.email,
        ].join(",")
      ),
    ].join("\n");

    // Create a blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "students_list.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <PageContainer>
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Assigned Students</h1>
        </motion.div>
        <p className="text-muted-foreground mt-1 ml-10">
          View and manage students assigned to you
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <CustomCard>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search students..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              onClick={downloadStudentsData}
              variant="outline"
              className="shrink-0 gap-1"
            >
              <Download className="h-4 w-4" />
              <span>Export CSV</span>
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Roll Number</TableHead>
                  <TableHead className="hidden md:table-cell">Department</TableHead>
                  <TableHead className="hidden md:table-cell">Year</TableHead>
                  <TableHead className="hidden lg:table-cell">Email</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.rollNumber}</TableCell>
                      <TableCell className="hidden md:table-cell">{student.department}</TableCell>
                      <TableCell className="hidden md:table-cell">{student.year}</TableCell>
                      <TableCell className="hidden lg:table-cell">{student.email}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/faculty/student/${student.id}`)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No students found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CustomCard>
      </motion.div>
    </PageContainer>
  );
}

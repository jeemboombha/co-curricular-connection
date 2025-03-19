
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";
import { CustomCard } from "@/components/ui/CustomCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Search, Filter } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function FacultyVerified() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<"all" | "approved" | "rejected">("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for verified submissions
  const verifiedSubmissions = [
    {
      id: "1",
      student: "John Doe",
      studentId: "S12345",
      type: "Cultural Event",
      title: "Annual Music Festival",
      submittedOn: "2023-10-15",
      status: "approved",
      verifiedOn: "2023-10-20",
    },
    {
      id: "2",
      student: "Jane Smith",
      studentId: "S12346",
      type: "Technical Event",
      title: "Hackathon 2023",
      submittedOn: "2023-10-16",
      status: "rejected",
      verifiedOn: "2023-10-21",
      rejectionReason: "Insufficient evidence provided",
    },
    {
      id: "3",
      student: "Mike Johnson",
      studentId: "S12347",
      type: "Sports Event",
      title: "Inter-College Cricket Tournament",
      submittedOn: "2023-10-17",
      status: "approved",
      verifiedOn: "2023-10-22",
    },
    {
      id: "4",
      student: "Sarah Williams",
      studentId: "S12348",
      type: "Research Paper",
      title: "Machine Learning Approaches for Healthcare",
      submittedOn: "2023-10-18",
      status: "approved",
      verifiedOn: "2023-10-23",
    },
    {
      id: "5",
      student: "David Brown",
      studentId: "S12349",
      type: "Internship",
      title: "Software Developer Intern at Tech Solutions",
      submittedOn: "2023-10-19",
      status: "rejected",
      verifiedOn: "2023-10-24",
      rejectionReason: "Duration less than required minimum",
    },
  ];

  // Filter submissions based on filter and search term
  const filteredSubmissions = verifiedSubmissions.filter((submission) => {
    const matchesFilter =
      filter === "all" || submission.status === filter;
    const matchesSearch =
      submission.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <PageContainer>
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold tracking-tight">
            Verified Submissions
          </h1>
          <p className="text-muted-foreground mt-1">
            View all approved and rejected verification requests
          </p>
        </motion.div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        <motion.div variants={item} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by student name, ID or submission title..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-40">
              <Select
                value={filter}
                onValueChange={(value) => setFilter(value as any)}
              >
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Submissions</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" className="gap-1">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>
        </motion.div>

        <motion.div variants={item}>
          <CustomCard>
            <div className="rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Submitted On</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Verified On</TableHead>
                    <TableHead>Reason (if rejected)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.length > 0 ? (
                    filteredSubmissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell>
                          <div className="font-medium">{submission.student}</div>
                          <div className="text-sm text-muted-foreground">
                            {submission.studentId}
                          </div>
                        </TableCell>
                        <TableCell>{submission.type}</TableCell>
                        <TableCell>{submission.title}</TableCell>
                        <TableCell>{submission.submittedOn}</TableCell>
                        <TableCell>
                          <div
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              submission.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {submission.status === "approved"
                              ? "Approved"
                              : "Rejected"}
                          </div>
                        </TableCell>
                        <TableCell>{submission.verifiedOn}</TableCell>
                        <TableCell>
                          {submission.rejectionReason || "-"}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="h-24 text-center"
                      >
                        No matching records found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CustomCard>
        </motion.div>
      </motion.div>
    </PageContainer>
  );
}

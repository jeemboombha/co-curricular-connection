
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";
import { CustomCard } from "@/components/ui/CustomCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, ArrowLeft, Check, X, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export default function FacultyRequests() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);
  const [comment, setComment] = useState("");
  
  // Mock pending requests data
  const pendingRequests = [
    {
      id: "1",
      studentName: "John Doe",
      rollNumber: "CS2001",
      title: "Hackathon 2023",
      category: "Technical Event",
      submittedOn: "2023-06-22",
      details: {
        eventName: "Hackathon 2023",
        location: "University Auditorium",
        date: "2023-06-15",
        category: "Coding",
        awards: "First Prize",
        description: "Participated in a 24-hour hackathon and won the first prize for developing an innovative solution for healthcare.",
        proof: "https://example.com/certificate.pdf",
      },
    },
    {
      id: "2",
      studentName: "Jane Smith",
      rollNumber: "ME1005",
      title: "Summer Internship at ABC Corp",
      category: "Internship",
      submittedOn: "2023-05-10",
      details: {
        company: "ABC Corp",
        role: "Software Development Intern",
        location: "New York",
        startDate: "2023-05-15",
        endDate: "2023-07-15",
        stipend: "$1000 per month",
        description: "Worked on developing new features for the company's mobile application.",
        proof: "https://example.com/offer-letter.pdf",
      },
    },
    {
      id: "3",
      studentName: "Alice Johnson",
      rollNumber: "EC3045",
      title: "Research on IoT Applications",
      category: "Research Paper",
      submittedOn: "2023-04-20",
      details: {
        title: "Applications of IoT in Healthcare",
        type: "Journal Article",
        journalName: "International Journal of IoT",
        volume: "12",
        issue: "3",
        pageNumbers: "45-67",
        publisher: "Tech Publications",
        issn: "1234-5678",
        description: "Research paper on the applications of IoT in healthcare monitoring systems.",
        proof: "https://example.com/paper.pdf",
      },
    },
  ];

  // Filter requests based on search query
  const filteredRequests = pendingRequests.filter(
    (request) =>
      request.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle view request details
  const handleViewRequest = (request: any) => {
    setSelectedRequest(request);
    setViewDialogOpen(true);
  };

  // Handle approve/reject action
  const handleAction = (request: any, action: "approve" | "reject") => {
    setSelectedRequest(request);
    setActionType(action);
    setActionDialogOpen(true);
  };

  // Submit the action (approve/reject)
  const submitAction = () => {
    if (!selectedRequest || !actionType) return;
    
    // In a real app, this would be an API call
    console.log("Action:", actionType, "Request ID:", selectedRequest.id, "Comment:", comment);
    
    toast({
      title: actionType === "approve" ? "Request Approved" : "Request Rejected",
      description: `You have ${actionType}d the request from ${selectedRequest.studentName}.`,
    });
    
    setActionDialogOpen(false);
    setComment("");
    
    // In a real app, you would update the UI after the API response
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
          <h1 className="text-3xl font-bold tracking-tight">Pending Requests</h1>
        </motion.div>
        <p className="text-muted-foreground mt-1 ml-10">
          Approve or reject student submission requests
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
                placeholder="Search requests..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="hidden md:table-cell">Submitted On</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{request.studentName}</div>
                          <div className="text-sm text-muted-foreground">{request.rollNumber}</div>
                        </div>
                      </TableCell>
                      <TableCell>{request.title}</TableCell>
                      <TableCell className="hidden md:table-cell">{request.category}</TableCell>
                      <TableCell className="hidden md:table-cell">{request.submittedOn}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewRequest(request)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 border-green-600 hover:bg-green-50"
                            onClick={() => handleAction(request, "approve")}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-600 hover:bg-red-50"
                            onClick={() => handleAction(request, "reject")}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No pending requests found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* View Details Dialog */}
          <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Request Details</DialogTitle>
                <DialogDescription>
                  View the detailed information submitted by the student.
                </DialogDescription>
              </DialogHeader>

              {selectedRequest && (
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Student</h3>
                      <p>{selectedRequest.studentName}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Roll Number</h3>
                      <p>{selectedRequest.rollNumber}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Title</h3>
                      <p>{selectedRequest.title}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
                      <p>{selectedRequest.category}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Submitted On</h3>
                      <p>{selectedRequest.submittedOn}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">Submission Details</h3>
                    
                    {Object.entries(selectedRequest.details).map(([key, value]) => {
                      if (key === "proof") {
                        return (
                          <div key={key} className="mt-4">
                            <h3 className="text-sm font-medium text-muted-foreground">Proof Document</h3>
                            <a 
                              href={value as string} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              View Document
                            </a>
                          </div>
                        );
                      } else {
                        return (
                          <div key={key} className="mt-2">
                            <h3 className="text-sm font-medium text-muted-foreground capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </h3>
                            <p>{value as string}</p>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              )}

              <DialogFooter className="mt-6">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="text-green-600 border-green-600 hover:bg-green-50"
                    onClick={() => {
                      setViewDialogOpen(false);
                      handleAction(selectedRequest, "approve");
                    }}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    className="text-red-600 border-red-600 hover:bg-red-50"
                    onClick={() => {
                      setViewDialogOpen(false);
                      handleAction(selectedRequest, "reject");
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Approve/Reject Dialog */}
          <Dialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {actionType === "approve" ? "Approve Request" : "Reject Request"}
                </DialogTitle>
                <DialogDescription>
                  {actionType === "approve"
                    ? "Add an optional comment for approving this request."
                    : "Please provide a reason for rejecting this request."}
                </DialogDescription>
              </DialogHeader>

              {selectedRequest && (
                <div className="space-y-4 mt-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium">Request</h3>
                    <p className="text-sm">{selectedRequest.title} - {selectedRequest.studentName}</p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="comment" className="text-sm font-medium">
                      {actionType === "approve" ? "Comment (Optional)" : "Reason for Rejection"}
                    </label>
                    <Textarea
                      id="comment"
                      placeholder={
                        actionType === "approve"
                          ? "Add any comments for the student..."
                          : "Provide a reason for rejection..."
                      }
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="min-h-[100px]"
                      required={actionType === "reject"}
                    />
                  </div>
                </div>
              )}

              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActionDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant={actionType === "approve" ? "default" : "destructive"}
                  onClick={submitAction}
                  disabled={actionType === "reject" && !comment.trim()}
                >
                  {actionType === "approve" ? "Approve" : "Reject"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CustomCard>
      </motion.div>
    </PageContainer>
  );
}

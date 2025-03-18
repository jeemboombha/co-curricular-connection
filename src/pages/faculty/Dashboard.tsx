
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { CustomCard } from "@/components/ui/CustomCard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Clipboard, 
  Users, 
  CheckCircle, 
  Clock, 
  Download 
} from "lucide-react";

export default function FacultyDashboard() {
  const { user } = useAuth();

  // Faculty dashboard features
  const features = [
    {
      id: "students",
      name: "View Assigned Students",
      icon: <Users className="h-6 w-6" />,
      description: "View and manage students assigned to you",
      url: "/faculty/students",
    },
    {
      id: "requests",
      name: "Pending Requests",
      icon: <Clock className="h-6 w-6" />,
      description: "View and approve/reject pending verification requests",
      url: "/faculty/requests",
    },
    {
      id: "verified",
      name: "Verified Submissions",
      icon: <CheckCircle className="h-6 w-6" />,
      description: "Track approved and rejected verifications",
      url: "/faculty/verified",
    },
    {
      id: "reports",
      name: "Download Reports",
      icon: <Download className="h-6 w-6" />,
      description: "Generate and download reports of student activities",
      url: "/faculty/reports",
    },
  ];

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
            Welcome, {user?.name || "Faculty"}
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage student submissions and verification requests
          </p>
        </motion.div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 md:grid-cols-2"
      >
        {features.map((feature) => (
          <motion.div key={feature.id} variants={item}>
            <CustomCard className="h-full">
              <div className="flex flex-col h-full">
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{feature.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>

                <div className="mt-auto pt-4">
                  <Button asChild className="w-full justify-center">
                    <Link to={feature.url}>Access</Link>
                  </Button>
                </div>
              </div>
            </CustomCard>
          </motion.div>
        ))}
      </motion.div>
    </PageContainer>
  );
}

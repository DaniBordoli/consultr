import React from "react";
import "../styles/dashboard.css";

interface DashboardProps {
  message: string;
}

const Dashboard: React.FC<DashboardProps> = ({ message }) => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">{message}</div>
    </div>
  );
};

export default Dashboard;

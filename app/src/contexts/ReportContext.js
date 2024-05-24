// src/context/ReportContext.js
import React, { createContext, useState, useContext } from 'react';
import { createReport } from '../services/ReportService';
import { AuthContext } from '../services/AuthService';

const ReportContext = createContext();

const ReportProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [reports, setReports] = useState([]);

  const addReport = async (reportData) => {
    try {
      const newReport = await createReport(reportData, token);
      setReports([...reports, newReport]);
    } catch (error) {
      throw error;
    }
  };

  return (
    <ReportContext.Provider value={{ reports, addReport }}>
      {children}
    </ReportContext.Provider>
  );
};

export { ReportContext, ReportProvider };

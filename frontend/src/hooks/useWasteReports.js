import { useState, useEffect } from 'react';
import {
  getWasteReports,
  createWasteReport,
  updateWasteReport,
  deleteWasteReport,
} from '../services/wasteReportAPI.js';

const useWasteReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const data = await getWasteReports();
      setReports(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addReport = async (data) => {
    const newReport = await createWasteReport(data);
    setReports((prev) => [...prev, newReport]);
  };

  const editReport = async (id, data) => {
    await updateWasteReport(id, data);
    setReports((prev) =>
      prev.map((r) => (r._id === id ? { ...r, ...data } : r))
    );
  };

  const removeReport = async (id) => {
    await deleteWasteReport(id);
    setReports((prev) => prev.filter((r) => r._id !== id));
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return {
    reports,
    loading,
    error,
    fetchReports,
    addReport,
    editReport,
    removeReport,
  };
};

export default useWasteReports;

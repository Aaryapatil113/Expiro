import wasteReportModel from '../models/wasteReportModel.js';
import { ObjectId } from 'mongodb';

const getAllReports = async () => {
  return await wasteReportModel.findAll();
};

const getReportById = async (id) => {
  const report = await wasteReportModel.findById(id);
  if (!report) throw new Error('Waste report not found');
  return report;
};

const getReportsByProduct = async (productId) => {
  return await wasteReportModel.findByProduct(productId);
};

const createReport = async ({ productId, productName, quantityRemoved, reason, reportedBy, notes }) => {
  const newReport = {
    productId: new ObjectId(productId),
    productName,
    quantityRemoved,
    reason,
    reportedBy,
    notes: notes || '',
    reportedAt: new Date(),
  };
  const result = await wasteReportModel.insertOne(newReport);
  return { _id: result.insertedId, ...newReport };
};

const updateReport = async (id, updates) => {
  const result = await wasteReportModel.updateOne(id, updates);
  if (result.matchedCount === 0) throw new Error('Waste report not found');
  return { message: 'Waste report updated' };
};

const deleteReport = async (id) => {
  const result = await wasteReportModel.deleteOne(id);
  if (result.deletedCount === 0) throw new Error('Waste report not found');
  return { message: 'Waste report deleted' };
};

export default {
  getAllReports,
  getReportById,
  getReportsByProduct,
  createReport,
  updateReport,
  deleteReport,
};

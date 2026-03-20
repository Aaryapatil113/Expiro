import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

const COLLECTION = "waste_reports";

const findAll = async () => {
  return await getDB().collection(COLLECTION).find().toArray();
};

const findById = async (id) => {
  return await getDB()
    .collection(COLLECTION)
    .findOne({ _id: new ObjectId(id) });
};

const findByProduct = async (productId) => {
  return await getDB()
    .collection(COLLECTION)
    .find({ productId: new ObjectId(productId) })
    .toArray();
};

const insertOne = async (report) => {
  return await getDB().collection(COLLECTION).insertOne(report);
};

const updateOne = async (id, updates) => {
  return await getDB()
    .collection(COLLECTION)
    .updateOne({ _id: new ObjectId(id) }, { $set: updates });
};

const deleteOne = async (id) => {
  return await getDB()
    .collection(COLLECTION)
    .deleteOne({ _id: new ObjectId(id) });
};

export default {
  findAll,
  findById,
  findByProduct,
  insertOne,
  updateOne,
  deleteOne,
};

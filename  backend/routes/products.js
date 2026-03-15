import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { getDB } from '../db/connection.js';

const router = Router();

// GET all products
router.get('/', async (req, res) => {
    try {
        const products = await getDB().collection('products').find().toArray();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// GET single product
router.get('/:id', async (req, res) => {
    try {
        const product = await getDB()
            .collection('products')
            .findOne({ _id: new ObjectId(req.params.id) });
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

// GET expiring products within N days
router.get('/expiring/:days', async (req, res) => {
    try {
        const days = parseInt(req.params.days);
        const now = new Date();
        const future = new Date();
        future.setDate(now.getDate() + days);
        const products = await getDB()
            .collection('products')
            .find({
                'batches.expiryDate': { $lte: future },
            })
            .toArray();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch expiring products' });
    }
});

// POST create product
router.post('/', async (req, res) => {
    try {
        const { name, category, shelfLocation, stockCount, batches } = req.body;
        const newProduct = {
            name,
            category,
            shelfLocation,
            stockCount: stockCount || 0,
            batches: batches || [],
            createdAt: new Date(),
        };
        const result = await getDB().collection('products').insertOne(newProduct);
        res.status(201).json({ _id: result.insertedId, ...newProduct });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create product' });
    }
});

// PUT update product
router.put('/:id', async (req, res) => {
    try {
        const { name, category, shelfLocation, stockCount, batches } = req.body;
        const result = await getDB()
            .collection('products')
            .updateOne(
                { _id: new ObjectId(req.params.id) },
                { $set: { name, category, shelfLocation, stockCount, batches } }
            );
        if (result.matchedCount === 0)
            return res.status(404).json({ error: 'Product not found' });
        res.json({ message: 'Product updated' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// DELETE product
router.delete('/:id', async (req, res) => {
    try {
        const result = await getDB()
            .collection('products')
            .deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0)
            return res.status(404).json({ error: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

export default router;
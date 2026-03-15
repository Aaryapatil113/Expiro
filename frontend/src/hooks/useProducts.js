import { useState, useEffect } from 'react';
import {
    getProducts,
    getExpiringProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from '../services/productAPI.js';

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchExpiring = async (days) => {
        setLoading(true);
        try {
            const data = await getExpiringProducts(days);
            setProducts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addProduct = async (data) => {
        const newProduct = await createProduct(data);
        setProducts((prev) => [...prev, newProduct]);
    };

    const editProduct = async (id, data) => {
        await updateProduct(id, data);
        setProducts((prev) =>
            prev.map((p) => (p._id === id ? { ...p, ...data } : p))
        );
    };

    const removeProduct = async (id) => {
        await deleteProduct(id);
        setProducts((prev) => prev.filter((p) => p._id !== id));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return {
        products,
        loading,
        error,
        fetchProducts,
        fetchExpiring,
        addProduct,
        editProduct,
        removeProduct,
    };
};

export default useProducts;
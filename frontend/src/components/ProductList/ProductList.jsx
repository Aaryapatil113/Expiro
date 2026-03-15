import { useState } from 'react';
import PropTypes from 'prop-types';
import './ProductList.css';

const ProductList = ({ products, loading, onEdit, onDelete, onAdd }) => {
    const [search, setSearch] = useState('');
    const [filterCategory, setFilterCategory] = useState('');

    const categories = [...new Set(products.map((p) => p.category))];

    const filtered = products.filter((p) => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchCategory = filterCategory ? p.category === filterCategory : true;
        return matchSearch && matchCategory;
    });

    if (loading) return <p className="loading">Loading products...</p>;

    return (
        <div className="product-list">
            <div className="product-list-header">
                <h2>Products</h2>
                <button className="btn-add" onClick={onAdd}>+ Add Product</button>
            </div>
            <div className="product-filters">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>
            {filtered.length === 0 ? (
                <p className="no-products">No products found.</p>
            ) : (
                <table className="product-table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Shelf Location</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filtered.map((p) => (
                        <tr key={p._id}>
                            <td>{p.name}</td>
                            <td>{p.category}</td>
                            <td>{p.shelfLocation}</td>
                            <td>{p.stockCount}</td>
                            <td>
                                <button className="btn-edit" onClick={() => onEdit(p)}>Edit</button>
                                <button className="btn-delete" onClick={() => onDelete(p._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

ProductList.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
            shelfLocation: PropTypes.string.isRequired,
            stockCount: PropTypes.number.isRequired,
        })
    ).isRequired,
    loading: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
};

export default ProductList;
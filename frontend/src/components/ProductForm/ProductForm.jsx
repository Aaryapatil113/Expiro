import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ProductForm.css';

const CATEGORIES = [
    'Produce',
    'Fruits',
    'Dairy',
    'Bakery',
    'Pasta & Grains',
    'Frozen Foods',
    'Snacks',
    'Chocolates & Candy',
    'Beverages',
    'Breakfast',
    'Canned & Packaged Foods',
    'Toiletries & Personal Care',
    'Cleaning Supplies',
];

const emptyForm = {
    name: '',
    category: '',
    shelfLocation: '',
    stockCount: 0,
    batches: [],
};

const ProductForm = ({ onSubmit, onCancel, initial }) => {
    const [form, setForm] = useState(emptyForm);
    const [batch, setBatch] = useState({ quantity: '', expiryDate: '' });

    useEffect(() => {
        if (initial) setForm(initial);
    }, [initial]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const addBatch = () => {
        if (!batch.quantity || !batch.expiryDate) return;
        setForm((prev) => ({
            ...prev,
            batches: [
                ...prev.batches,
                { quantity: parseInt(batch.quantity), expiryDate: new Date(batch.expiryDate), receivedAt: new Date() },
            ],
        }));
        setBatch({ quantity: '', expiryDate: '' });
    };

    const removeBatch = (idx) => {
        setForm((prev) => ({
            ...prev,
            batches: prev.batches.filter((_, i) => i !== idx),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <div className="product-form-overlay">
            <div className="product-form-card">
                <h2>{initial ? 'Edit Product' : 'Add Product'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input name="name" value={form.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" value={form.category} onChange={handleChange} required>
                            <option value="">Select a category</option>
                            {CATEGORIES.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Shelf Location</label>
                        <input name="shelfLocation" value={form.shelfLocation} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Stock Count</label>
                        <input name="stockCount" type="number" value={form.stockCount} onChange={handleChange} min="0" />
                    </div>

                    <div className="batch-section">
                        <h3>Stock Batches</h3>
                        <div className="batch-inputs">
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={batch.quantity}
                                onChange={(e) => setBatch((prev) => ({ ...prev, quantity: e.target.value }))}
                            />
                            <input
                                type="date"
                                value={batch.expiryDate}
                                onChange={(e) => setBatch((prev) => ({ ...prev, expiryDate: e.target.value }))}
                            />
                            <button type="button" onClick={addBatch} className="btn-add-batch">Add Batch</button>
                        </div>
                        {form.batches.length > 0 && (
                            <ul className="batch-list">
                                {form.batches.map((b, i) => (
                                    <li key={i}>
                                        Qty: {b.quantity} — Expires: {new Date(b.expiryDate).toLocaleDateString()}
                                        <button type="button" onClick={() => removeBatch(i)} className="btn-remove-batch">✕</button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onCancel} className="btn-cancel">Cancel</button>
                        <button type="submit" className="btn-submit">{initial ? 'Update' : 'Add'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

ProductForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    initial: PropTypes.shape({
        name: PropTypes.string,
        category: PropTypes.string,
        shelfLocation: PropTypes.string,
        stockCount: PropTypes.number,
        batches: PropTypes.array,
    }),
};

ProductForm.defaultProps = {
    initial: null,
};

export default ProductForm;
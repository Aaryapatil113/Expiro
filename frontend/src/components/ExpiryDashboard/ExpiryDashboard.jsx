import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './ExpiryDashboard.css';

const getUrgency = (expiryDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiry = new Date(expiryDate);
    expiry.setHours(0, 0, 0, 0);
    const diff = (expiry - today) / (1000 * 60 * 60 * 24);
    if (diff < 0) return 'expired';
    if (diff === 0) return 'today';
    if (diff <= 3) return 'soon';
    return 'ok';
};

const urgencyLabel = {
    expired: '⚫ Expired',
    today: '🔴 Expiring Today',
    soon: '🟡 Expiring Within 3 Days',
    ok: '🟢 OK',
};

const ExpiryDashboard = ({ products, loading }) => {
    const [filtered, setFiltered] = useState([]);
    const [filterUrgency, setFilterUrgency] = useState('all');

    useEffect(() => {
        const withUrgency = products.flatMap((p) =>
            (p.batches || []).map((b) => ({
                productName: p.name,
                category: p.category,
                shelfLocation: p.shelfLocation,
                quantity: b.quantity,
                expiryDate: b.expiryDate,
                urgency: getUrgency(b.expiryDate),
            }))
        ).filter((b) => b.urgency !== 'ok');

        const sorted = withUrgency.sort((a, b) => {
            const order = { expired: 0, today: 1, soon: 2 };
            return order[a.urgency] - order[b.urgency];
        });

        setFiltered(
            filterUrgency === 'all'
                ? sorted
                : sorted.filter((b) => b.urgency === filterUrgency)
        );
    }, [products, filterUrgency]);

    if (loading) return <p className="loading">Loading expiry data...</p>;

    return (
        <div className="expiry-dashboard">
            <div className="expiry-header">
                <h2>Expiry Dashboard</h2>
                <select
                    value={filterUrgency}
                    onChange={(e) => setFilterUrgency(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="expired">Expired</option>
                    <option value="today">Expiring Today</option>
                    <option value="soon">Expiring Within 3 Days</option>
                </select>
            </div>
            {filtered.length === 0 ? (
                <p className="no-expiry">No expiring products found. 🎉</p>
            ) : (
                <table className="expiry-table">
                    <thead>
                    <tr>
                        <th>Status</th>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Shelf</th>
                        <th>Qty</th>
                        <th>Expiry Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filtered.map((b, i) => (
                        <tr key={i} className={`row-${b.urgency}`}>
                            <td>{urgencyLabel[b.urgency]}</td>
                            <td>{b.productName}</td>
                            <td>{b.category}</td>
                            <td>{b.shelfLocation}</td>
                            <td>{b.quantity}</td>
                            <td>{new Date(b.expiryDate).toLocaleDateString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

ExpiryDashboard.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
            shelfLocation: PropTypes.string.isRequired,
            batches: PropTypes.arrayOf(
                PropTypes.shape({
                    quantity: PropTypes.number.isRequired,
                    expiryDate: PropTypes.string.isRequired,
                })
            ),
        })
    ).isRequired,
    loading: PropTypes.bool.isRequired,
};

export default ExpiryDashboard;
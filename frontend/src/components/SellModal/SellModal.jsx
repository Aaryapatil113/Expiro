import { useState } from 'react';
import PropTypes from 'prop-types';
import './SellModal.css';

const SellModal = ({ product, onConfirm, onCancel }) => {
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');

  const totalRemaining = product.batches
    ? product.batches.reduce((sum, b) => sum + (b.remainingQuantity || 0), 0)
    : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const qty = parseInt(quantity);
    if (!qty || qty <= 0) {
      setError('Please enter a valid quantity');
      return;
    }
    if (qty > totalRemaining) {
      setError(`Only ${totalRemaining} units available`);
      return;
    }
    onConfirm(qty);
  };

  return (
    <div className="sell-overlay">
      <div className="sell-card">
        <h2>Log Sale</h2>
        <p className="sell-product-name">{product.productName}</p>
        <p className="sell-stock">
          Available stock: <strong>{totalRemaining} units</strong>
        </p>
        {error && <p className="sell-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="sell-input-group">
            <label>Units Sold</label>
            <input
              type="number"
              min="1"
              max={totalRemaining}
              value={quantity}
              onChange={(e) => { setQuantity(e.target.value); setError(''); }}
              placeholder="Enter quantity sold"
              autoFocus
            />
          </div>
          <div className="sell-actions">
            <button type="button" onClick={onCancel} className="btn-cancel">Cancel</button>
            <button type="submit" className="btn-confirm">Confirm Sale</button>
          </div>
        </form>
      </div>
    </div>
  );
};

SellModal.propTypes = {
  product: PropTypes.shape({
    productId: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    batches: PropTypes.array,
  }).isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default SellModal;

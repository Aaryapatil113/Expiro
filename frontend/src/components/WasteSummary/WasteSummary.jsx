import PropTypes from 'prop-types';
import './WasteSummary.css';

const WasteSummary = ({ reports, loading }) => {
  if (loading) return <p className="loading">Loading summary...</p>;

  const summary = reports.reduce((acc, r) => {
    const key = r.productName;
    if (!acc[key]) acc[key] = { productName: key, totalRemoved: 0, count: 0 };
    acc[key].totalRemoved += r.quantityRemoved;
    acc[key].count += 1;
    return acc;
  }, {});

  const sorted = Object.values(summary).sort((a, b) => b.totalRemoved - a.totalRemoved);

  return (
    <div className="waste-summary">
      <h2>Waste Summary</h2>
      {sorted.length === 0 ? (
        <p className="no-data">No waste data available.</p>
      ) : (
        <table className="summary-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Total Qty Removed</th>
              <th>No. of Reports</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((s) => (
              <tr key={s.productName}>
                <td>{s.productName}</td>
                <td>{s.totalRemoved}</td>
                <td>{s.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

WasteSummary.propTypes = {
  reports: PropTypes.arrayOf(
    PropTypes.shape({
      productName: PropTypes.string.isRequired,
      quantityRemoved: PropTypes.number.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default WasteSummary;

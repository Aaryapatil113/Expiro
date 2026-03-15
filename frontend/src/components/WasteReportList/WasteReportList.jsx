import PropTypes from 'prop-types';
import './WasteReportList.css';

const WasteReportList = ({ reports, loading, onEdit, onDelete, onAdd }) => {
  if (loading) return <p className="loading">Loading waste reports...</p>;

  return (
    <div className="waste-report-list">
      <div className="waste-report-header">
        <h2>Waste Reports</h2>
        <button className="btn-add" onClick={onAdd}>+ Log Waste</button>
      </div>
      {reports.length === 0 ? (
        <p className="no-reports">No waste reports found.</p>
      ) : (
        <table className="waste-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty Removed</th>
              <th>Reason</th>
              <th>Reported By</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r._id}>
                <td>{r.productName}</td>
                <td>{r.quantityRemoved}</td>
                <td>{r.reason}</td>
                <td>{r.reportedBy}</td>
                <td>{new Date(r.reportedAt).toLocaleDateString()}</td>
                <td>
                  <button className="btn-edit" onClick={() => onEdit(r)}>Edit</button>
                  <button className="btn-delete" onClick={() => onDelete(r._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

WasteReportList.propTypes = {
  reports: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      productName: PropTypes.string.isRequired,
      quantityRemoved: PropTypes.number.isRequired,
      reason: PropTypes.string.isRequired,
      reportedBy: PropTypes.string.isRequired,
      reportedAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default WasteReportList;

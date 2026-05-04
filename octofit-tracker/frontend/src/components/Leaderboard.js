import React, { useCallback, useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getBaseUrl = () => {
    const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
    return codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
      : 'http://localhost:8000/api/leaderboard/';
  };

  const formatValue = (value) => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'object') return JSON.stringify(value);
    return value;
  };

  const renderTable = (items) => {
    if (!items.length) return <div className="alert alert-info">No leaderboard entries available.</div>;

    const firstItem = items[0];
    const columns = firstItem && typeof firstItem === 'object' && !Array.isArray(firstItem)
      ? Object.keys(firstItem)
      : null;

    if (!columns) {
      return <pre>{JSON.stringify(items, null, 2)}</pre>;
    }

    return (
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-light">
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column}>{formatValue(item[column])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const fetchLeaderboard = useCallback(async () => {
    const endpoint = getBaseUrl();
    console.log('Fetching leaderboard from:', endpoint);

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched leaderboard data:', data);
      setLeaderboard(data.results || data);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  return (
    <div className="card main-card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div>
          <h2 className="mb-0">Leaderboard</h2>
          <p className="text-muted mb-0">Top scored entries from the backend API.</p>
        </div>
        <button className="btn btn-outline-primary" onClick={fetchLeaderboard}>Refresh</button>
      </div>
      <div className="card-body">
        {loading && <div className="alert alert-info">Loading leaderboard...</div>}
        {error && <div className="alert alert-danger">Error: {error}</div>}
        {!loading && !error && renderTable(leaderboard)}
      </div>
    </div>
  );
};

export default Leaderboard;
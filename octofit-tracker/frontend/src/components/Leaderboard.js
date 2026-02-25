import React, { useState, useEffect } from 'react';

const medalColor = (rank) => {
  if (rank === 1) return '#FFD700';
  if (rank === 2) return '#C0C0C0';
  if (rank === 3) return '#CD7F32';
  return '#6c757d';
};

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    console.log('Leaderboard: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Leaderboard: fetched data', data);
        const list = Array.isArray(data) ? data : data.results || [];
        const sorted = [...list].sort((a, b) => (b.score || 0) - (a.score || 0));
        setEntries(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Leaderboard: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div>
      <div className="d-flex align-items-center mb-3">
        <span className="fs-2 me-2">🏆</span>
        <h2 className="mb-0 fw-bold">Leaderboard</h2>
        {!loading && !error && (
          <span className="badge bg-warning text-dark ms-3">{entries.length}</span>
        )}
      </div>

      {error && (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <span className="me-2">⚠️</span> {error}
        </div>
      )}

      <div className="card octofit-card">
        <div className="card-header bg-warning text-dark">
          Top Scores
        </div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : entries.length === 0 ? (
            <p className="text-muted text-center py-4 mb-0">No leaderboard data found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover octofit-table mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Team</th>
                    <th>Score</th>
                    <th>Total Calories</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, idx) => {
                    const rank = idx + 1;
                    return (
                      <tr key={entry._id || entry.id || idx} className={rank <= 3 ? 'table-warning' : ''}>
                        <td>
                          <span
                            className="rank-badge text-white"
                            style={{ backgroundColor: medalColor(rank) }}
                          >
                            {rank}
                          </span>
                        </td>
                        <td><span className="fw-semibold">{entry.name || entry.username}</span></td>
                        <td><span className="badge bg-secondary">{entry.username}</span></td>
                        <td>
                          {entry.team
                            ? <span className="badge bg-info text-dark">{entry.team}</span>
                            : <span className="text-muted small">—</span>}
                        </td>
                        <td>
                          <span className="badge bg-secondary fs-6">{entry.score}</span>
                        </td>
                        <td>
                          <span className="badge bg-danger">{entry.total_calories} kcal</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;

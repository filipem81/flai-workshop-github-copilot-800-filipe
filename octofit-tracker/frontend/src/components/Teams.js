import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  useEffect(() => {
    console.log('Teams: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Teams: fetched data', data);
        const list = Array.isArray(data) ? data : data.results || [];
        setTeams(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Teams: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  const resolveMembers = (members) => {
    if (!Array.isArray(members)) return String(members || '');
    return members.map((m) =>
      typeof m === 'object' ? (m.username || JSON.stringify(m)) : m
    );
  };

  return (
    <div>
      <div className="d-flex align-items-center mb-3">
        <span className="fs-2 me-2">🤝</span>
        <h2 className="mb-0 fw-bold">Teams</h2>
        {!loading && !error && (
          <span className="badge bg-info text-dark ms-3">{teams.length}</span>
        )}
      </div>

      {error && (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <span className="me-2">⚠️</span> {error}
        </div>
      )}

      <div className="card octofit-card">
        <div className="card-header bg-info text-dark">
          Fitness Teams
        </div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : teams.length === 0 ? (
            <p className="text-muted text-center py-4 mb-0">No teams found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover octofit-table mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Team Name</th>
                    <th>Members</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, idx) => {
                    const memberList = resolveMembers(team.members);
                    return (
                      <tr key={team._id || team.id || idx}>
                        <td className="text-muted small">{idx + 1}</td>
                        <td><span className="fw-semibold">{team.name}</span></td>
                        <td>
                          {Array.isArray(memberList)
                            ? memberList.map((m, i) => (
                                <span key={i} className="badge bg-secondary me-1">{m}</span>
                              ))
                            : <span className="badge bg-secondary">{memberList}</span>
                          }
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

export default Teams;

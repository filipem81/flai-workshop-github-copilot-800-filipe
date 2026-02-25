import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  useEffect(() => {
    console.log('Users: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Users: fetched data', data);
        const list = Array.isArray(data) ? data : data.results || [];
        setUsers(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Users: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div>
      <div className="d-flex align-items-center mb-3">
        <span className="fs-2 me-2">👤</span>
        <h2 className="mb-0 fw-bold">Users</h2>
        {!loading && !error && (
          <span className="badge bg-primary ms-3">{users.length}</span>
        )}
      </div>

      {error && (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <span className="me-2">⚠️</span> {error}
        </div>
      )}

      <div className="card octofit-card">
        <div className="card-header bg-primary text-white">
          Registered Members
        </div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : users.length === 0 ? (
            <p className="text-muted text-center py-4 mb-0">No users found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover octofit-table mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, idx) => (
                    <tr key={user._id || user.id || idx}>
                      <td className="text-muted small">{idx + 1}</td>
                      <td><span className="fw-semibold">{user.name}</span></td>
                      <td><span className="badge bg-secondary">{user.username}</span></td>
                      <td><a href={`mailto:${user.email}`} className="text-decoration-none">{user.email}</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;

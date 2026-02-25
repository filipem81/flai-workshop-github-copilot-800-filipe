import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  useEffect(() => {
    console.log('Workouts: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Workouts: fetched data', data);
        const list = Array.isArray(data) ? data : data.results || [];
        setWorkouts(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Workouts: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div>
      <div className="d-flex align-items-center mb-3">
        <span className="fs-2 me-2">💪</span>
        <h2 className="mb-0 fw-bold">Workouts</h2>
        {!loading && !error && (
          <span className="badge bg-danger ms-3">{workouts.length}</span>
        )}
      </div>

      {error && (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <span className="me-2">⚠️</span> {error}
        </div>
      )}

      <div className="card octofit-card">
        <div className="card-header bg-danger text-white">
          Personalised Workout Plans
        </div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : workouts.length === 0 ? (
            <p className="text-muted text-center py-4 mb-0">No workouts found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover octofit-table mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Duration (min)</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((workout, idx) => (
                    <tr key={workout._id || workout.id || idx}>
                      <td className="text-muted small">{idx + 1}</td>
                      <td><span className="fw-semibold">{workout.name}</span></td>
                      <td>{workout.description}</td>
                      <td>
                        <span className="badge bg-danger">{workout.duration} min</span>
                      </td>
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

export default Workouts;

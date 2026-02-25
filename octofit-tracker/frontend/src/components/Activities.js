import React, { useState, useEffect } from 'react';

const activityBadgeColor = (type) => {
  const map = { running: 'success', cycling: 'info', swimming: 'primary', gym: 'warning', yoga: 'secondary' };
  return map[(type || '').toLowerCase()] || 'dark';
};

// Parse ISO date string (YYYY-MM-DD) without timezone shifting
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const [year, month, day] = String(dateStr).split('-');
  if (!year || !month || !day) return dateStr;
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]} ${year}`;
};

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  useEffect(() => {
    console.log('Activities: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Activities: fetched data', data);
        const list = Array.isArray(data) ? data : data.results || [];
        setActivities(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Activities: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div>
      <div className="d-flex align-items-center mb-3">
        <span className="fs-2 me-2">🏃</span>
        <h2 className="mb-0 fw-bold">Activities</h2>
        {!loading && !error && (
          <span className="badge bg-success ms-3">{activities.length}</span>
        )}
      </div>

      {error && (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <span className="me-2">⚠️</span> {error}
        </div>
      )}

      <div className="card octofit-card">
        <div className="card-header bg-success text-white">
          Fitness Activity Log
        </div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : activities.length === 0 ? (
            <p className="text-muted text-center py-4 mb-0">No activities found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover octofit-table mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Type</th>
                    <th>Duration (min)</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, idx) => (
                    <tr key={activity._id || activity.id || idx}>
                      <td className="text-muted small">{idx + 1}</td>
                      <td><span className="fw-semibold">{activity.user}</span></td>
                      <td>
                        <span className={`badge bg-${activityBadgeColor(activity.type)}`}>
                          {activity.type}
                        </span>
                      </td>
                      <td>{activity.duration}</td>
                      <td>{formatDate(activity.date)}</td>
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

export default Activities;

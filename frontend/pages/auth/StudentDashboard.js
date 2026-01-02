import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../api';
import './Dashboard.css';
import DashboardLayout from '../../components/DashboardLayout';

const StudentDashboard = () => {
  const router = useRouter();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchForm();
  }, []);

  const fetchForm = async () => {
    try {
      const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
      const userEmail = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null;
      const q = userId ? `?userId=${encodeURIComponent(userId)}` : userEmail ? `?email=${encodeURIComponent(userEmail)}` : '';
      const response = await api.get(`/forms/my-form${q}`);
      setForm(response.data);
    } catch (err) {
      if (err.response?.status !== 404) {
        setError(err.response?.data?.message || 'Failed to fetch form');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    
    // Trigger auth change event
    window.dispatchEvent(new Event('authChanged'));
    
    router.replace('/');
  };

  const formatStatus = (status) => {
    if (!status) return 'Not started';
    return status.replace(/_/g, ' ').replace(/^(\w)/, (c) => c.toUpperCase());
  };

  const formatDate = (value) => {
    if (!value) return '--';
    try {
      return new Date(value).toLocaleDateString();
    } catch (err) {
      return '--';
    }
  };

  const stats = [
    {
      label: 'Form Status',
      value: form ? formatStatus(form.status) : 'Not started',
      helper: form ? 'Auto-synced with your submission' : 'Complete your form to get matched'
    },
    {
      label: 'Preferred Domain',
      value: form?.desiredDomain || 'Select a track',
      helper: form ? 'Chosen focus area' : 'Update anytime from your form'
    },
    {
      label: 'Mentor Assigned',
      value: form?.mentorName || 'Pending',
      helper: form?.mentorEmail || 'We will notify you once assigned'
    },
    {
      label: 'Last Updated',
      value: form ? formatDate(form.updatedAt || form.createdAt) : '--',
      helper: 'Based on your latest submission'
    }
  ];

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <DashboardLayout title="Student Dashboard" role="student" onLogout={handleLogout}>
      {error && <div className="alert alert-error">{error}</div>}

      <section className="stats-grid">
        {stats.map((stat) => (
          <article key={stat.label} className="stat-card">
            <p className="stat-label">{stat.label}</p>
            <p className="stat-value">{stat.value}</p>
            <p className="stat-helper">{stat.helper}</p>
          </article>
        ))}
      </section>

      {form && (
        <section className="content-card">
          <header className="content-card-header">
            <div>
              <p className="eyebrow">Submission overview</p>
              <h2>Your Interest Form</h2>
            </div>
            <span className={`status-badge status-${form.status}`}>
              {formatStatus(form.status)}
            </span>
          </header>

          <div className="info-grid">
            <div className="info-row">
              <p className="info-label">Interests</p>
              <p className="info-value">{Array.isArray(form.interests) ? form.interests.join(', ') : form.interests}</p>
            </div>
            <div className="info-row">
              <p className="info-label">Desired Domain</p>
              <p className="info-value">{form.desiredDomain}</p>
            </div>
            <div className="info-row">
              <p className="info-label">Experience</p>
              <p className="info-value">{form.experience}</p>
            </div>
            <div className="info-row">
              <p className="info-label">Career Goals</p>
              <p className="info-value">{form.goals}</p>
            </div>
          </div>

          {form.mentorName && (
            <div className="mentor-highlight">
              <div>
                <p className="info-label">Assigned Mentor</p>
                <p className="mentor-name">{form.mentorName}</p>
                <p className="mentor-email">{form.mentorEmail}</p>
              </div>
            </div>
          )}

          <div className="card-actions">
            <button className="btn btn-secondary" onClick={() => router.push('/student/form')}>
              Edit Form
            </button>
          </div>
        </section>
      )}
    </DashboardLayout>
  );
};

export default StudentDashboard;

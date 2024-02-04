import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isHiringEventOpen, setHiringEventOpen] = useState(false);
  const [isDashboardOpen, setDashboardOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [jobDetailsCompleted, setJobDetailsCompleted] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "",
    startDate: "",
    endDate: "",
    jobDescription: "",
    location: "",
    jobPreference: "remote",
    numPositions: 1,
    internalPerson: "",
  });

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
    setHiringEventOpen(false);
    setDashboardOpen(false);
  };

  const toggleHiringEvent = () => {
    setHiringEventOpen(!isHiringEventOpen);
    setDashboardOpen(false);
  };

  const toggleDashboard = () => {
    setDashboardOpen(!isDashboardOpen);
    setHiringEventOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Date validation
    const { startDate, endDate } = formData;
    if (new Date(startDate) > new Date(endDate)) {
      alert("End date must be equal to or after the start date");
      return;
    }

    // Show success message
    setShowSuccessMessage(true);
    setJobDetailsCompleted(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOKButtonClick = () => {
    setShowSuccessMessage(false);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="sidebar-icon" onClick={toggleSidebar}>
          {isSidebarOpen ? "X" : "☰"}
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
      </header>

      <div className="content-container">
        {isSidebarOpen && (
          <div className="sidebar">
            <div className="sidebar-item" onClick={toggleDashboard}>
              Dashboard
            </div>
            <div className="sidebar-item" onClick={toggleHiringEvent}>
              Create Hiring Event
            </div>
          </div>
        )}

        {isHiringEventOpen && (
          <div className="hiring-event-container">
            <h2 className="hiring-event-heading">Create Hiring Event</h2>
            <div className={`hiring-event-labels ${jobDetailsCompleted ? 'job-details-completed' : ''}`}>
              <div className="label">Job Details</div>
              <div className="label">Event Link</div>
            </div>
            <form className="job-details-form" onSubmit={handleSubmit}>
              <label htmlFor="jobTitle">Job Title</label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                required
              />

              <div className="date-fields">
                <div>
                  <label htmlFor="startDate">Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="endDate">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <label htmlFor="jobDescription">Job Description</label>
              <input
                type="file"
                id="jobDescription"
                name="jobDescription"
                accept=".pdf, .doc, .docx"
                required
              />

              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="jobPreference">Job Preference</label>
              <select
                id="jobPreference"
                name="jobPreference"
                value={formData.jobPreference}
                onChange={handleInputChange}
              >
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">Onsite</option>
              </select>

              <label htmlFor="numPositions">Number of Positions</label>
              <input
                type="number"
                id="numPositions"
                name="numPositions"
                value={formData.numPositions}
                onChange={handleInputChange}
                min="1"
                required
              />

              <label htmlFor="internalPerson">Internal Person</label>
              <input
                type="text"
                id="internalPerson"
                name="internalPerson"
                value={formData.internalPerson}
                onChange={handleInputChange}
              />

              <button type="submit">Create</button>
            </form>
          </div>
        )}

        {showSuccessMessage && (
          <div className="success-popup">
            <p>Job created successfully</p>
            <button onClick={handleOKButtonClick}>OK</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import JoblyApi from '../api';
import JobCard from './JobCard';
import "../styles/Jobs.css"; 

function Jobs() {
  // Two states: one for controlling the input and one for the actual search term.
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);

  // Fetch jobs whenever the search term changes.
  useEffect(() => {
    async function fetchJobs() {
      try {
        let jobs = await JoblyApi.getJobs(searchTerm);
        setJobs(jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    }
    fetchJobs();
  }, [searchTerm]);

  // When the form is submitted, update the search term.
  function handleSubmit(evt) {
    evt.preventDefault();
    setSearchTerm(searchInput);
  }

  return (
    <div className="jobs-container">
      <h1>Jobs</h1>
      <form className="job-search-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Search for jobs..."
          value={searchInput}
          onChange={evt => setSearchInput(evt.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="job-list">
        {jobs.length ? (
          jobs.map(job => <JobCard key={job.id} job={job} />)
        ) : (
          <p className="no-jobs">No jobs found.</p>
        )}
      </div>
    </div>
  );
}

export default Jobs;

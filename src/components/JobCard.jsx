import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from "../UserContext";
import "../styles/JobCard.css";

function JobCard({ job }) {
  const { applications, applyToJob } = useContext(UserContext);
  const hasApplied = applications ? applications.has(job.id) : false;

  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p>
        Salary: {job.salary ? `$${job.salary}` : "N/A"} | Equity: {job.equity ? job.equity : "None"}
      </p>
      {job.companyHandle && (
        <p>
          Company: <Link to={`/companies/${job.companyHandle}`}>{job.companyHandle}</Link>
        </p>
      )}
      {hasApplied ? (
        <button disabled>Applied</button>
      ) : (
        <button onClick={() => applyToJob(job.id)}>Apply</button>
      )}
    </div>
  );
}

export default JobCard;

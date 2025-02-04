import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from '../api';
import JobCard from './JobCard';
import "../styles/CompanyDetail.css";

function CompanyDetail() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function fetchCompany() {
      try {
        let companyData = await JoblyApi.getCompany(handle);
        setCompany(companyData);
      } catch (error) {
        console.error("Error fetching company:", error);
      }
    }
    fetchCompany();
  }, [handle]);

  if (!company) return <p>Loading company details...</p>;

  return (
    <div className="company-detail-container">
      <h1>{company.name}</h1>
      <p>{company.description}</p>

      {/* Render jobs for this company */}
      <div className="jobs-section">
        <h2>Available Jobs</h2>
        {company.jobs.length > 0 ? (
          company.jobs.map(job => <JobCard key={job.id} job={job} />)
        ) : (
          <p className="no-jobs">No jobs listed for this company.</p>
        )}
      </div>
    </div>
  );
}

export default CompanyDetail;

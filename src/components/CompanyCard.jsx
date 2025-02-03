import React from "react";
import { Link } from "react-router-dom";

function CompanyCard({ company }) {
  return (
    <div className="company-card">
      <Link to={`/companies/${company.handle}`}>
        <h2>{company.name}</h2>
      </Link>
      {company.logoUrl && <img src={company.logoUrl} alt={`${company.name} logo`} />}
      <p>{company.description}</p>
    </div>
  );
}

export default CompanyCard;

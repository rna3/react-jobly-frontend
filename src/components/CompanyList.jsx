import React, { useState, useEffect } from 'react';
import JoblyApi from '../api';
import CompanyCard from './CompanyCard';

function CompanyList() {
  // This state controls the input field.
  const [searchInput, setSearchInput] = useState("");
  // This state is used to trigger fetching companies.
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState([]);

  // Whenever searchTerm changes, fetch companies.
  useEffect(() => {
    async function fetchCompanies() {
      try {
        let companies = await JoblyApi.getCompanies(searchTerm);
        setCompanies(companies);
      } catch (error) {
        console.error("Error fetching companies", error);
      }
    }
    fetchCompanies();
  }, [searchTerm]);

  // On form submission, update the searchTerm state.
  function handleSubmit(evt) {
    evt.preventDefault();
    setSearchTerm(searchInput);
  }

  return (
    <div>
      <h1>Companies</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Search for companies..." 
          value={searchInput}
          onChange={evt => setSearchInput(evt.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {companies.length > 0 ? (
          companies.map(company => (
            <CompanyCard key={company.handle} company={company} />
          ))
        ) : (
          <p>No companies found.</p>
        )}
      </div>
    </div>
  );
}

export default CompanyList;

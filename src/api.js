import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // The token for interacting with the API will be stored here.
  static token = null;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = JoblyApi.token ? { Authorization: `Bearer ${JoblyApi.token}` } : {};
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response || err.message);

      let message = err.response?.data?.error?.message || "Unknown API error";
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** Login a user and get a token */
  static async login(data) {
    try {
      let res = await this.request("auth/token", data, "post");
      return res.token;
    } catch (err) {
      console.error("Login Error:", err);
      throw err;
    }
  }

  /** Signup a new user and get a token */
  static async signup(data) {
    try {
      let res = await this.request("auth/register", data, "post");
      return res.token;
    } catch (err) {
      console.error("Signup Error:", err);
      throw err;
    }
  }

  /** Get user data */
  static async getCurrentUser(username) {
    try {
      let res = await this.request(`users/${username}`);
      return res.user;
    } catch (err) {
      console.error("Get User Error:", err);
      throw err;
    }
  }

  /** Update user profile */
  static async updateUser(username, data) {
    try {
      let res = await this.request(`users/${username}`, data, "patch");
      return res.user;
    } catch (err) {
      console.error("Update User Error:", err);
      throw err;
    }
  }

  /** Get details on a company by handle */
  static async getCompany(handle) {
    try {
      let res = await this.request(`companies/${handle}`);
      return res.company;
    } catch (err) {
      console.error("Get Company Error:", err);
      throw err;
    }
  }

  /** Get companies with optional search term */
  static async getCompanies(searchTerm = "") {
    try {
      let res = await this.request("companies", { nameLike: searchTerm });
      return res.companies;
    } catch (err) {
      console.error("Get Companies Error:", err);
      throw err;
    }
  }

  /** Get jobs with an optional search term */
  static async getJobs(searchTerm = "") {
    try {
      const params = searchTerm.trim() ? { title: searchTerm } : {};
      let res = await this.request("jobs", params);
      return res.jobs;
    } catch (err) {
      console.error("Get Jobs Error:", err);
      throw err;
    }
  }

  /** Apply to a job */
  static async applyToJob(username, jobId) {
    try {
      let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
      return res.applied;
    } catch (err) {
      console.error("Apply To Job Error:", err);
      throw err;
    }
  }
}

export default JoblyApi;

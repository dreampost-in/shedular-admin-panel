import React, { useState, useEffect } from "react";
import api from "../components/apiConfig";

const AdminStatistics = () => {
  const [stats, setStats] = useState({
    successRate: "0",
    happyStudents: "0",
    schedules: "0",
  });
  const [statId, setStatId] = useState(null);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await api.get("/statistics");
      if (response.data.success) {
        setStats(response.data.data);
        setStatId(response.data.data._id);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.warn("Statistics not found, creating new entry...");
        const newStats = { successRate: "0", happyStudents: "0", schedules: "0" };
        try {
          const createResponse = await api.post("/statistics", newStats);
          setStats(createResponse.data.data);
          setStatId(createResponse.data.data._id);
        } catch (createError) {
          console.error("Error creating default statistics:", createError.message);
        }
      } else {
        console.error("Error fetching statistics:", error.message);
      }
    }
  };

  const handleChange = (e) => {
    setStats({ ...stats, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (statId) {
        await api.put(`/statistics/${statId}`, stats);
      } else {
        await api.post("/statistics", stats);
      }
      fetchStatistics();
    } catch (error) {
      console.error("Error updating statistics:", error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/statistics/${statId}`);
      setStats({ successRate: "0", happyStudents: "0", schedules: "0" });
      setStatId(null);
    } catch (error) {
      console.error("Error deleting statistics:", error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6"> Admin Statistics</h2>
      
      {/* Statistics Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-lg">
              <th className="border p-3">Metric</th>
              <th className="border p-3">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-3 font-medium">Schedules</td>
              <td className="border p-3">{stats.schedules}</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border p-3 font-medium">Happy Students</td>
              <td className="border p-3">{stats.happyStudents}</td>
            </tr>
            <tr>
              <td className="border p-3 font-medium">Mutual Matches</td>
              <td className="border p-3">{stats.successRate}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Update Form */}
      <div className="bg-white p-6 shadow-md rounded-lg mt-6">
        <h3 className="text-xl font-semibold mb-4"> Update Statistics</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          
        <label className="block">
            <span className="text-gray-700">Schedules:</span>
            <input type="text" name="schedules" value={stats.schedules} onChange={handleChange} className="w-full p-2 border rounded" />
          </label>

          <label className="block">
            <span className="text-gray-700">Happy Students:</span>
            <input type="text" name="happyStudents" value={stats.happyStudents} onChange={handleChange} className="w-full p-2 border rounded" />
          </label>

          <label className="block">
            <span className="text-gray-700">Mutual Matches:</span>
            <input type="text" name="successRate" value={stats.successRate} onChange={handleChange} className="w-full p-2 border rounded" />
          </label>

          <div className="flex gap-3">
            <button type="submit" className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700">
               Save
            </button>
            {statId && (
              <button type="button" onClick={handleDelete} className="bg-red-600 text-black px-4 py-2 rounded hover:bg-red-700">
                 Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminStatistics;

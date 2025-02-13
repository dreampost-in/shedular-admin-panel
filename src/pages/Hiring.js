import React, { useEffect, useState } from "react";
import api from "../components/apiConfig";

const Hiring = () => {
  const [hiringRecords, setHiringRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all hiring records
  const fetchHiringRecords = async () => {
    try {
      const response = await api.get("/hiring");
      setHiringRecords(response.data);
    } catch (error) {
      console.error("Error fetching hiring records:", error);
      alert("Failed to load hiring records.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a hiring record
  const deleteHiring = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (!confirmDelete) return;

    try {
        console.log(id)
      await api.delete(`/hiring/${id}`);
      alert("Hiring record deleted successfully.");
      setHiringRecords(hiringRecords.filter(record => record._id !== id)); // Update UI after deletion
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("Failed to delete the record.");
    }
  };

  useEffect(() => {
    fetchHiringRecords();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Hiring Applications</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-3 text-left">Full Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Mobile</th>
                <th className="p-3 text-left">Degree</th>
                <th className="p-3 text-left">field Of Study</th>
                <th className="p-3 text-left">applying Role</th>
                <th className="p-3 text-left">applying Exam</th>
                <th className="p-3 text-left">times Appeared</th>
                <th className="p-3 text-left">prepared With</th>
                <th className="p-3 text-left">Employment Status</th>
                <th className="p-3 text-left">post Department</th>
                <th className="p-3 text-left">experience Details</th>
                <th className="p-3 text-left">Resume</th>
                <th className="p-3 text-left">Proof</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hiringRecords.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center p-4">No records found</td>
                </tr>
              ) : (
                hiringRecords.map((record) => (
                  <tr key={record._id} className="border-b">
                    <td className="p-3">{record.fullName}</td>
                    <td className="p-3">{record.email}</td>
                    <td className="p-3">{record.mobileNumber}</td>
                    <td className="p-3">{record.highestDegree}</td>
                    <td className="p-3">{record.fieldOfStudy}</td>
                    <td className="p-3">{record.applyingRole}</td>
                    <td className="p-3">{record.applyingExam}</td>
                    <td className="p-3">{record.timesAppeared}</td>
                    <td className="p-3">{record.preparedWith}</td>
                    <td className="p-3">{record.employmentStatus}</td>
                    <td className="p-3">{record.postDepartment ? record.postDepartment : "N/A"}</td>
                    <td className="p-3">{record.experienceDetails}</td>
                    <td className="p-3">
  {record.resumeFile ? (
    <a href={record.resumeFile} download className="text-blue-500 underline">
      Download Resume
    </a>
  ) : "N/A"}
</td>
<td className="p-3">
  {record.proofFile ? (
    <a href={record.proofFile} download className="text-blue-500 underline">
      Download Proof
    </a>
  ) : "N/A"}
</td>

                    <td className="p-3 text-center">
                      <button
                        onClick={() => deleteHiring(record._id)}
                        className="bg-red-500 text-black px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Hiring;

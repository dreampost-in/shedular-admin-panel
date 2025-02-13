import React, { useEffect, useState } from "react";
import api from "../components/apiConfig";

const UserFeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filter, setFilter] = useState("all");

  // Fetch all feedback
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await api.get("/feedback");
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };
    fetchFeedback();
  }, []);

  // Function to publish/unpublish feedback
  const togglePublish = async (id, isPublished) => {
    try {
      await api.put(`/feedback/publish/${id}`, { isPublished: !isPublished });
      setFeedbacks(feedbacks.map((f) => (f._id === id ? { ...f, isPublished: !isPublished } : f)));
    } catch (error) {
      console.error("Error updating feedback status:", error);
    }
  };

  // Function to delete feedback
  const handleDelete = async (id) => {
    try {
      await api.delete(`/feedback/${id}`);
      setFeedbacks(feedbacks.filter((f) => f._id !== id));
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  // Filtered feedback list
  const filteredFeedbacks = feedbacks.filter((feedback) => {
    if (filter === "all") return true;
    return filter === "published" ? feedback.isPublished : !feedback.isPublished;
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">User Feedback</h1>

      {/* Filter Buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-5 py-2 font-semibold rounded-lg transition ${
            filter === "all" ? "bg-blue-600 text-black" : "bg-gray-300 text-gray-800"
          }`}
          onClick={() => setFilter("all")}
        >
          All Feedbacks
        </button>
        <button
          className={`px-5 py-2 font-semibold rounded-lg transition ${
            filter === "published" ? "bg-green-600 text-black" : "bg-gray-300 text-gray-800"
          }`}
          onClick={() => setFilter("published")}
        >
          Published
        </button>
        <button
          className={`px-5 py-2 font-semibold rounded-lg transition ${
            filter === "not_published" ? "bg-orange-600 text-black" : "bg-gray-300 text-gray-800"
          }`}
          onClick={() => setFilter("not_published")}
        >
          Not Published
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-800 font-semibold text-center">
            <th className="py-3 px-4 border">Name</th>
            <th className="py-3 px-4 border">Rating</th>
            <th className="py-3 px-4 border">Feedback</th>
            <th className="py-3 px-4 border">Status</th>
            <th className="py-3 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFeedbacks.map((feedback) => (
            <tr key={feedback._id} className="border-t text-center">
              <td className="py-3 px-4 border font-medium text-gray-900">{feedback.name}</td>
              <td className="py-3 px-4 border text-lg font-bold text-blue-700">{feedback.rating}</td>
              <td className="py-3 px-4 border text-gray-800">{feedback.feedback}</td>
              <td className="py-3 px-4 border">
                <span
                  className={`px-3 py-1 rounded-lg text-black font-semibold ${
                    feedback.isPublished ? "bg-green-500" : "bg-orange-500"
                  }`}
                >
                  {feedback.isPublished ? "Published" : "Not Published"}
                </span>
              </td>
              <td className="py-3 px-4 border flex justify-center space-x-3">
                <button
                  className={`px-4 py-2 font-semibold rounded-lg transition text-black ${
                    feedback.isPublished ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                  }`}
                  onClick={() => togglePublish(feedback._id, feedback.isPublished)}
                >
                  {feedback.isPublished ? "Unpublish" : "Publish"}
                </button>
                <button
                  className="px-4 py-2 font-semibold bg-gray-700 hover:bg-gray-800 text-black rounded-lg transition"
                  onClick={() => handleDelete(feedback._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserFeedbackPage;

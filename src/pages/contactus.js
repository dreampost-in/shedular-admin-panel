import React, { useEffect, useState } from "react";
import api from "../components/apiConfig"; // Ensure API config is correctly imported

const AdminContact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all contact records
  const fetchContacts = async () => {
    try {
      const response = await api.get("/contact");
      setContacts(response.data.data); // Adjust based on API response structure
    } catch (error) {
      console.error("Error fetching contacts:", error);
      alert("Failed to load contact records.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a contact record
  const deleteContact = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/contact/${id}`);
      alert("Contact record deleted successfully.");
      setContacts(contacts.filter(contact => contact._id !== id)); // Remove from UI
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete the contact.");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Contact Us Records</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Contact Number</th>
                <th className="p-3 text-left">Comment</th>
                <th className="p-3 text-left">Submitted At</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-4">No records found</td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr key={contact._id} className="border-b">
                    <td className="p-3">{contact.name}</td>
                    <td className="p-3">{contact.email}</td>
                    <td className="p-3">{contact.contactNumber}</td>
                    <td className="p-3">{contact.comment}</td>
                    <td className="p-3">{new Date(contact.createdAt).toLocaleString()}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => deleteContact(contact._id)}
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

export default AdminContact;

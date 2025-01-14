import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../components/apiConfig"; // Replace with your API config
import { useNavigate } from 'react-router-dom';

const EditScheduler = () => {
  const navigate = useNavigate();
  const [courseContentOptions, setCourseContentOptions] = useState([]);
  const [selectedGoalDuration, setSelectedGoalDuration] = useState('');
  const [courseContent, setCourseContent] = useState(null);
  const [features, setFeatures] = useState('');
  const [resources, setResources] = useState('');
  const [courseInfo, setCourseInfo] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [goal, setGoal] = useState('');
  const [duration, setDuration] = useState('');
  const [maxLeaves, setMaxLeaves] = useState(''); // New state for maxLeaves
  const [step, setStep] = useState(1); // New state to manage steps
  const [showConfirmModal, setShowConfirmModal] = useState(false); // State for confirmation modal
  const [goalToDelete, setGoalToDelete] = useState(null); // State for goal to delete
  const [viewCourseContent, setViewCourseContent] = useState(null); // For viewing data
  const [showViewModal, setShowViewModal] = useState(false); // State for view modal

  useEffect(() => {
    const fetchCourseContentOptions = async () => {
      try {
        const response = await api.get('/coursecontent/goals');
        setCourseContentOptions(response.data);
      } catch (error) {
        console.error('Error fetching course content options:', error);
      }
    };
    fetchCourseContentOptions();
  }, []);

  const handleGoalDurationSelect = async (id) => {
    try {
      const response = await api.get(`/course-content/details/${id}`);
      setCourseContent(response.data.data);
      setDuration(response.data.data.duration);
      setMaxLeaves(response.data.data.maxLeaves);
      setGoal(response.data.data.goal);
      setFeatures(response.data.data.features);
      setResources(response.data.data.resources);
      setCourseInfo(response.data.data.courseInfo);
      setSubjects(response.data.data.subjects);
      setSelectedGoalDuration(id);
      setStep(2); // Move to Step 2 (editing form)
    } catch (error) {
      console.error('Error fetching course content:', error);
      alert('Error fetching course content.');
    }
  };

  const handleSubjectTitleChange = (e, subjectIndex) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[subjectIndex].title = e.target.value;
    setSubjects(updatedSubjects);
  };

  const handleAddSubject = () => {
    setSubjects([...subjects, { title: '', dailyContents: [] }]);
  };

  const handleDeleteSubject = (subjectIndex) => {
    const updatedSubjects = subjects.filter((_, index) => index !== subjectIndex);
    setSubjects(updatedSubjects);
  };

  const handleAddDay = (subjectIndex) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[subjectIndex].dailyContents.push({
      day: updatedSubjects[subjectIndex].dailyContents.length + 1,
      topics: [],
    });
    setSubjects(updatedSubjects);
  };

  const handleDeleteDay = (subjectIndex, dayIndex) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[subjectIndex].dailyContents = updatedSubjects[subjectIndex].dailyContents.filter(
      (_, index) => index !== dayIndex
    );
    setSubjects(updatedSubjects);
  };

  const handleAddTopic = (subjectIndex, dayIndex) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[subjectIndex].dailyContents[dayIndex].topics.push({
      name: '',
      link: '',
      hours: 0,
      pdfName: '',
      description: '',
    });
    setSubjects(updatedSubjects);
  };

  const handleDeleteTopic = (subjectIndex, dayIndex, topicIndex) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[subjectIndex].dailyContents[dayIndex].topics = updatedSubjects[subjectIndex].dailyContents[dayIndex].topics.filter((_, index) => index !== topicIndex);
    setSubjects(updatedSubjects);
  };

  const handleTopicChange = (e, subjectIndex, dayIndex, topicIndex, field) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[subjectIndex].dailyContents[dayIndex].topics[topicIndex][field] = e.target.value;
    setSubjects(updatedSubjects);
  };

  const handleSubmit = async () => {
    try {
      const payload = { goal, duration, features, resources, courseInfo,maxLeaves, subjects };
      console.log(subjects)
      const response = await api.put(`/course-content/${selectedGoalDuration}`, payload);
      if (response.status === 200) {
        alert('Course content updated successfully!');
        setStep(1); // Go back to Step 1 after successful update
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to update course content. Please try again.');
    }
  };

  const handleViewCourseContent = async (id) => {
    try {
      const response = await api.get(`/course-content/details/${id}`);
      console.log(response.data)
      setViewCourseContent(response.data.data);
      setShowViewModal(true); // Show the modal
    } catch (error) {
      console.error('Error fetching course content:', error);
      alert('Error fetching course content.');
    }
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setViewCourseContent(null);
  };

  const handleDeleteCourseContent = async () => {
    try {
      const response = await api.delete(`/course-content/${goalToDelete}`);
      if (response.status === 200) {
        alert('Course content deleted successfully!');
        setCourseContentOptions(courseContentOptions.filter(option => option.goalId !== goalToDelete));
        setShowConfirmModal(false); // Close the modal after deletion
      }
    } catch (error) {
      console.error('Error deleting course content:', error);
      alert('Failed to delete course content. Please try again.');
    }
  };
  const openConfirmModal = (goalId) => {
    setGoalToDelete(goalId);
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setGoalToDelete(null);
  };

    // Navigate to the scheduler page when adding a new schedule
    const handleAddScheduleClick = () => {
      navigate('/scheduler');
    };

  return (
<div className="container">
  <div className="d-flex justify-content-between align-items-center my-4">
    <h2 className="text-center m-0">Edit Course Table</h2>
    <button onClick={handleAddScheduleClick} className="btn btn-success">
      Add New Table
    </button>
  </div>

  {/* Step 1: Course content options */}
  {step === 1 && (
    <div className="row">
      <div className="col-md-12 mb-3">
        <label className="form-label">Select Table To Edit</label>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Goal</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courseContentOptions.map((option) => (
              <tr key={option.goalId}>
                <td>{option.goal}</td>
                <td>{option.duration}</td>
                <td>
                  <button
                    className="btn btn-outline-primary me-2"
                    onClick={() => handleGoalDurationSelect(option.goalId)}
                  >
                    Edit
                  </button>
                  <button
                      className="btn btn-outline-info me-2"
                      onClick={() => handleViewCourseContent(option.goalId)}
                    >
                      View
                    </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => openConfirmModal(option.goalId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )}
{showViewModal && (
  <div className="modal show d-block" tabIndex="-1">
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Course Content Details</h5>
          <button
            type="button"
            className="btn-close"
            onClick={handleCloseViewModal}
          ></button>
        </div>
        <div className="modal-body">
          {viewCourseContent ? (
            <div>
              {/* Basic Course Details */}
              <h6 className="mb-3">Course Overview</h6>
              <p><strong>Goal:</strong> {viewCourseContent.goal}</p>
              <p><strong>Duration:</strong> {viewCourseContent.duration}</p>
              <p><strong>Max Leaves:</strong> {viewCourseContent.maxLeaves}</p> {/* Max Leaves */}
              <p><strong>Features:</strong> {viewCourseContent.features}</p>
              <p><strong>Resources:</strong> {viewCourseContent.resources}</p>
              <p><strong>Course Info:</strong> {viewCourseContent.courseInfo}</p>

              {/* Subjects and Daily Contents */}
              <div className="mt-4">
                <h6>Subjects</h6>
                {viewCourseContent.subjects.map((subject, subjectIndex) => (
                  <div key={subjectIndex} className="mb-3">
                    <p className="fw-bold">Subject: {subject.title}</p>
                    <p><strong>Description:</strong> {subject.description}</p> {/* Subject Description */}
                    
                    <h6>Daily Contents:</h6>
                    <ul className="list-unstyled">
                      {subject.dailyContents.map((content, contentIndex) => (
                        <li key={contentIndex} className="mb-2">
                          <strong>Day {content.day}:</strong>
                          <ul>
                            {content.topics.map((topic, topicIndex) => (
                              <li key={topicIndex}>
                                <strong>Topic:</strong> {topic.name} 
                                <span> ({topic.hours} hours)</span>
                                <br />
                                <span> Link: {topic.link} </span>
                                <br />
                                <span> Note: {topic.pdfName} </span>
                                <br />
                                <span> Description: {topic.description} </span>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCloseViewModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}

   {showConfirmModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button type="button" className="btn-close" onClick={closeConfirmModal}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this course content?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeConfirmModal}>
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={handleDeleteCourseContent}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Prefilled form to edit */}
      {step === 2 && courseContent && (
        <>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Goal</label>
              <select className="form-select" value={goal} onChange={(e) => setGoal(e.target.value)}>
                <option value="">Select Goal</option>
                <option value="SSC">SSC</option>
                <option value="RRB">RRB</option>
                <option value="BANKING">BANKING</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Duration</label>
              <select className="form-select" value={duration} onChange={(e) => setDuration(e.target.value)}>
                <option value="">Select Duration</option>
                <option value="120-days">120 Days</option>
                <option value="150-days">150 Days</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Max Leaves</label>
            <input
                      type="number"
              className="form-control"
              value={maxLeaves}
              onChange={(e) => setMaxLeaves(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Features</label>
            <textarea
              className="form-control"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Resources</label>
            <textarea
              className="form-control"
              value={resources}
              onChange={(e) => setResources(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Course Information</label>
            <textarea
              className="form-control"
              value={courseInfo}
              onChange={(e) => setCourseInfo(e.target.value)}
            />
          </div>

          <h3>Subjects</h3>
          <button className="btn btn-success mt-3" onClick={handleAddSubject}>
            Add Subject
          </button>
          <div className="d-flex flex-wrap">
            {subjects.map((subject, subjectIndex) => (
              <div key={subjectIndex} className="border p-3 m-2" style={{ minWidth: '300px', flex: '1 1 300px' }}>
                <label className="form-label">Subject Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={subject.title}
                  onChange={(e) => handleSubjectTitleChange(e, subjectIndex)}
                />
                <button className="btn btn-danger mt-2" onClick={() => handleDeleteSubject(subjectIndex)}>
                  Delete Subject
                </button>
                <button className="btn btn-secondary mt-2" onClick={() => handleAddDay(subjectIndex)}>
                  Add Day
                </button>
                {subject.dailyContents.map((day, dayIndex) => (
                  <div key={dayIndex} className="mt-3">
                    <h5>
                      Day {day.day}{' '}
                      <button
                        className="btn btn-danger btn-sm ms-2"
                        onClick={() => handleDeleteDay(subjectIndex, dayIndex)}
                      >
                        Delete Day
                      </button>
                    </h5>
                    <button className="btn btn-primary mb-2" onClick={() => handleAddTopic(subjectIndex, dayIndex)}>
                      Add Topic
                    </button>
                    {day.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="mb-2">
                        <input
                          type="text"
                          placeholder="Topic Name"
                          className="form-control"
                          value={topic.name}
                          onChange={(e) => handleTopicChange(e, subjectIndex, dayIndex, topicIndex, 'name')}
                        />
                        <input
                          type="text"
                          placeholder="Link"
                          className="form-control"
                          value={topic.link}
                          onChange={(e) => handleTopicChange(e, subjectIndex, dayIndex, topicIndex, 'link')}
                        />
                        <input
                          type="number"
                          placeholder="Hours"
                          className="form-control"
                          value={topic.hours}
                          onChange={(e) => handleTopicChange(e, subjectIndex, dayIndex, topicIndex, 'hours')}
                        />
                        <input
                          type="text"
                          placeholder="Add PDF Name Or Note"
                          className="form-control"
                          value={topic.pdfName}
                          onChange={(e) => handleTopicChange(e, subjectIndex, dayIndex, topicIndex, 'pdfName')}
                        />
                        <textarea
                          placeholder="Description"
                          className="form-control"
                          value={topic.description}
                          onChange={(e) => handleTopicChange(e, subjectIndex, dayIndex, topicIndex, 'description')}
                        />
                        <button
                          className="btn btn-danger btn-sm mt-2"
                          onClick={() => handleDeleteTopic(subjectIndex, dayIndex, topicIndex)}
                        >
                          Delete Topic
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <button className="btn btn-primary mt-3" onClick={handleSubmit}>
            Save Schedule
          </button>
        </>
      )}
    </div>
  );
};

export default EditScheduler;

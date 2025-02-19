import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../components/apiConfig";
import { useNavigate } from 'react-router-dom';

const Scheduler = () => {
  const [goal, setGoal] = useState('');
  const [duration, setDuration] = useState('');
  const [features, setFeatures] = useState('');
  const [resources, setResources] = useState('');
  const [courseInfo, setCourseInfo] = useState('');
  const [maxLeaves, setMaxLeaves] = useState(0); // New state for maxLeaves
  const [hrsanddays, sethrsanddays] = useState(''); // New state for hours/days field
  const [subjects, setSubjects] = useState([{ title: '', dailyContents: [] }]);
  const navigate = useNavigate();

  const handleAddSubject = () => {
    setSubjects([...subjects, { title: '', dailyContents: [] }]);
  };
  const handleDeleteSubject = (subjectIndex) => {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      const updatedSubjects = subjects.filter((_, index) => index !== subjectIndex);
      setSubjects(updatedSubjects);
    }
  };
  
  // const handleDeleteSubject = (subjectIndex) => {
  //   const updatedSubjects = subjects.filter((_, index) => index !== subjectIndex);
  //   setSubjects(updatedSubjects);
  // };

  const handleSubjectTitleChange = (e, subjectIndex) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[subjectIndex].title = e.target.value;
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
    updatedSubjects[subjectIndex].dailyContents[dayIndex].topics = updatedSubjects[subjectIndex].dailyContents[
      dayIndex
    ].topics.filter((_, index) => index !== topicIndex);
    setSubjects(updatedSubjects);
  };

  const handleTopicChange = (e, subjectIndex, dayIndex, topicIndex, field) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[subjectIndex].dailyContents[dayIndex].topics[topicIndex][field] = e.target.value;
    setSubjects(updatedSubjects);
  };

  const handleSubmit = async () => {
    try {
      const payload = { goal, duration, features, resources, courseInfo,maxLeaves,hrsanddays, subjects };
      console.log(subjects)
      const response = await api.post('/course-content', payload);

      if (response.status === 201) {
        alert('Course content saved successfully!');
        navigate('/Edit-schedules'); // Navigate to the Edit-schedules page
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to save course content. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2 className="my-4 text-center">Scheduler</h2>

      {/* Goal and Duration Side by Side */}
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
            <option value="60-days">60 Days</option>
                <option value="90-days">90 Days</option>
                <option value="150-days">150 Days</option>
                <option value="200-days">200 Days</option>
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
          min="0"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Hours/Days</label>
        <input
          type="text"
          className="form-control"
          value={hrsanddays}
          onChange={(e) => sethrsanddays(e.target.value)}
          placeholder="Enter hours/days"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Features</label>
        <textarea className="form-control" value={features} onChange={(e) => setFeatures(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label">Resources</label>
        <textarea className="form-control" value={resources} onChange={(e) => setResources(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label">Course Information</label>
        <textarea className="form-control" value={courseInfo} onChange={(e) => setCourseInfo(e.target.value)} />
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
        Save Table
      </button>
    </div>
  );
};

export default Scheduler;

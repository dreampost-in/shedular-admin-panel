import React, { useState, useEffect } from "react";
import api from "../components/apiConfig";

const ContentResourceManagement = () => {
  const [step, setStep] = useState(1); // Tracks current step
  const [schedules, setSchedules] = useState([]);
  const [newSchedule, setNewSchedule] = useState({
    goalId: "",
    goal: "",
    exam: "",
    category: "",
    hrsanddays: "",
    stage: "",
    price: "",
  });
  const [goalOptions, setGoalOptions] = useState([]);

  // Fetch goal options on component mount
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await api.get("/coursecontent/goals");
        setGoalOptions(response.data); // Fetch available goals
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };
    fetchGoals();
  }, []);

  // Dynamic exam options based on the selected goal
  const getExamOptions = (goal) => {
    switch (goal) {
      case "SSC":
        return ["CGL", "CPO", "CHSL", "MTS", "GD"];
      case "RRB":
        return ["NTPC", "ALP", "JE", "Group-D"];
      case "BANKING":
        return ["PO", "Clerk"];
      default:
        return [];
    }
  };

  const getCategoryOptions = () => ["FRESHER", "REPEATER", "BOTH"];
  const getHrsAndDaysOptions = () => ["<5", ">5"];
  const getStageOptions = () => ["PRELIMS", "MAINS", "PRELIMS+MAINS"];

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Proceed to Step 2 with selected goal
  const handleGoalSelection = (goal) => {
    setNewSchedule((prev) => ({
      ...prev,
      goalId: goal.goalId,
      goal: goal.goal,
    }));
    setStep(2); // Move to Step 2
  };

  // Publish schedule
  const handlePublish = async () => {
    try {
      const response = await api.post("/schedule/add", newSchedule);
      setSchedules((prev) => [...prev, response.data.data]);
      alert("Schedule published successfully!");
      setStep(1); // Reset to Step 1
      setNewSchedule({
        goalId: "",
        goal: "",
        exam: "",
        category: "",
        hrsanddays: "",
        stage: "",
        price: "",
      });
    } catch (error) {
      console.error("Error publishing schedule:", error);
    }
  };

  return (
    <div className="container mt-5 p-4 bg-light rounded shadow">
      <h1 className="text-center text-primary mb-4">
        Content and Resource Management
      </h1>
      <p className="text-center text-muted">
        Manage your schedules and course content with ease.
      </p>

      {step === 1 && (
        <div>
          <h3 className="text-secondary">Step 1: Select a Goal</h3>
          <div className="row">
            {goalOptions.map((goal) => (
              <div
                key={goal.goalId}
                className="col-md-3 p-2"
                onClick={() => handleGoalSelection(goal)}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <h5>{goal.goal}</h5>
                <p>Duration: {goal.duration}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="text-secondary">Step 2: Fill in the Details</h3>
          <div className="row mb-3">
            <div className="col-md-3">
              <label className="form-label text-muted">Exam</label>
              <select
                className="form-select"
                value={newSchedule.exam}
                onChange={handleInputChange}
                name="exam"
              >
                <option value="">Select Exam</option>
                {getExamOptions(newSchedule.goal).map((exam) => (
                  <option key={exam} value={exam}>
                    {exam}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label text-muted">Category</label>
              <select
                className="form-select"
                value={newSchedule.category}
                onChange={handleInputChange}
                name="category"
              >
                <option value="">Select Category</option>
                {getCategoryOptions().map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label text-muted">Hours/Days</label>
              <select
                className="form-select"
                value={newSchedule.hrsanddays}
                onChange={handleInputChange}
                name="hrsanddays"
              >
                <option value="">Select Hours/Days</option>
                {getHrsAndDaysOptions().map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label text-muted">Stage</label>
              <select
                className="form-select"
                value={newSchedule.stage}
                onChange={handleInputChange}
                name="stage"
              >
                <option value="">Select Stage</option>
                {getStageOptions().map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-3">
              <label className="form-label text-muted">Price</label>
              <input
                type="text"
                className="form-control"
                value={newSchedule.price}
                onChange={handleInputChange}
                name="price"
              />
            </div>
            <div className="col-md-3">
              <button onClick={handlePublish} className="btn btn-primary">
                Publish
              </button>
            </div>
            <div className="col-md-3">
              <button onClick={() => setStep(1)} className="btn btn-secondary">
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentResourceManagement;

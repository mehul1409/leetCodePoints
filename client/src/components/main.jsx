import React, { useState, useEffect } from 'react';
import './main.css';
import axios from 'axios';

const Main = () => {
  const [formData, setFormData] = useState({
    easy: "",
    medium: "",
    hard: "",
  });

  const [questionNumbers, setQuestionNumbers] = useState([""]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [details, setDetails] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuestionNumberChange = (index, value) => {
    const updatedQuestionNumbers = [...questionNumbers];
    updatedQuestionNumbers[index] = value;
    setQuestionNumbers(updatedQuestionNumbers);
  };

  useEffect(() => {
    const easyPoints = parseFloat(formData.easy) || 0;
    const mediumPoints = parseFloat(formData.medium) || 0;
    const hardPoints = parseFloat(formData.hard) || 0;
    setTotalPoints(easyPoints * 100 + mediumPoints * 200 + hardPoints * 300);
  }, [formData]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get("https://leetcodepoints.onrender.com/details");
        setDetails(response.data); // Store fetched details in state
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails(); // Call the function to fetch details

    // Cleanup function (optional for preventing memory leaks)
    return () => {
      // Clean up if necessary (e.g., abort fetch)
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const dataToSend = {
      ...formData,
      questionNumbers,
      totalPoints
    };

    try {
      const response = await axios.post("https://leetcodepoints.onrender.com/addDetail", dataToSend);
      console.log(response.data);
      // Optionally refresh the details list after adding a new entry
      setDetails([...details, response.data]);
      // Reset formData and questionNumbers after submission
      setFormData({ easy: "", medium: "", hard: "" });
      setQuestionNumbers([""]);
      setTotalPoints(0);
    } catch (error) {
      console.log(`Error while sending data to the backend: ${error}`);
    }
  };

  const addQuestionNumberField = () => {
    setQuestionNumbers([...questionNumbers, ""]); // Add an empty string for new input
  };

  return (
    <div className="App">
      <h1>Leetcode Question Tracker</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Easy: </label>
          <input
            type="number"
            name="easy"
            value={formData.easy}
            onChange={handleChange}
            placeholder="Enter Easy level points"
          />
        </div>

        <div>
          <label>Medium: </label>
          <input
            type="number"
            name="medium"
            value={formData.medium}
            onChange={handleChange}
            placeholder="Enter Medium level points"
          />
        </div>

        <div>
          <label>Hard: </label>
          <input
            type="number"
            name="hard"
            value={formData.hard}
            onChange={handleChange}
            placeholder="Enter Hard level points"
          />
        </div>

        <div>
          <label>Total Points: </label>
          <input
            type="number"
            value={totalPoints}
            readOnly
            placeholder="Total points calculated"
          />
        </div>

        <div>
          <label>Question Numbers:</label>
          {questionNumbers.map((questionNumber, index) => (
            <input
              key={index} // Ideally, use a unique identifier
              type="number"
              value={questionNumber}
              onChange={(e) => handleQuestionNumberChange(index, e.target.value)}
              placeholder={`Enter Question Number ${index + 1}`}
              className='questionDiv'
            />
          ))}
          <button type="button" onClick={addQuestionNumberField}>
            Add Question Number
          </button>
        </div>

        <button type="submit">Submit</button>
      </form>

      <h2>Fetched Details</h2>
      <ul>
        {details.map((detail, index) => (
          <li key={detail.id || index} className="detail-card">
            <div className="card-header">
              <span className="serial-number">S.No: {index + 1}</span>
              <br />
              <span className="date">{detail.createdAt ? new Date(detail.createdAt).toLocaleDateString() : 'N/A'}</span>
            </div>
            <div className="card-body">
              <div className="difficulty">
                <span className="easy">Easy: {detail.easy}</span>
                <span className="medium">Medium: {detail.medium}</span>
                <span className="hard">Hard: {detail.hard}</span>
              </div>
              <div className="total-points">
                Total Points: {detail.totalPoints}
              </div>
              <div className="question-numbers">
                Question Numbers: {detail.questionNumbers ? detail.questionNumbers.join(', ') : 'N/A'}
              </div>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default Main;

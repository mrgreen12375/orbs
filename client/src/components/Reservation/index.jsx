import React, { useState } from "react";

function Reservation() {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const [formData, setFormData] = useState({
    room: "",
    start: "",
    end: "",
    purpose: "",
  });

  const [message, setMessage] = useState("");

  const handlePrevWeek = () => {
    const prevWeek = new Date(currentWeek);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setCurrentWeek(prevWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(currentWeek);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentWeek(nextWeek);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateBooking = async () => {
    try {
      // TODO: Call your API here

      console.log(formData);

      setMessage("Room booked successfully!");
    } catch (error) {
      setMessage("Failed to create booking.");
    }
  };

  const handleReset = () => {
    setFormData({
      room: "",
      start: "",
      end: "",
      purpose: "",
    });

    setMessage("");
  };

  return (
    <div className="rb-wrap">
      <div className="rb-head">
        <div>
          <h1>O.R.B.S.</h1>
          <div className="rb-muted">
            Weekly schedule for Conference Rooms A-D
          </div>
        </div>
      </div>

      <div className="rb-panel">
        <div className="rb-toolbar">
          <button className="rb-btn" type="button" onClick={handlePrevWeek}>
            Previous week
          </button>

          <strong>{currentWeek.toLocaleDateString()}</strong>

          <button className="rb-btn" type="button" onClick={handleNextWeek}>
            Next week
          </button>
        </div>

        <div className="rb-grid">
          <table className="rb-table">
            <thead>
              <tr>
                <th>Room</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Room A</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>

              <tr>
                <td>Room B</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>

              <tr>
                <td>Room C</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>

              <tr>
                <td>Room D</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="rb-panel rb-booking-panel">
        <h2>Create a Booking</h2>

        <p className="rb-booking-intro">
          Choose a room, set the time, and add a purpose.
        </p>

        <div className="rb-form">
          <label className="rb-field">
            Room
            <select name="room" value={formData.room} onChange={handleChange}>
              <option value="">Select a Room</option>
              <option value="A">Conference Room A</option>
              <option value="B">Conference Room B</option>
              <option value="C">Conference Room C</option>
              <option value="D">Conference Room D</option>
            </select>
          </label>

          <label className="rb-field">
            Start
            <input
              type="datetime-local"
              name="start"
              value={formData.start}
              onChange={handleChange}
            />
          </label>

          <label className="rb-field">
            End
            <input
              type="datetime-local"
              name="end"
              value={formData.end}
              onChange={handleChange}
            />
          </label>

          <label className="rb-field">
            Purpose
            <input
              type="text"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              maxLength={100}
              placeholder="Team planning"
            />
          </label>
        </div>

        <div className="rb-actions">
          <button
            type="button"
            className="rb-btn rb-btn-danger"
            onClick={handleReset}
          >
            Reset Reservations
          </button>

          <button
            type="button"
            className="rb-btn rb-btn-primary"
            onClick={handleCreateBooking}
          >
            Book Room
          </button>
        </div>

        <div role="status" aria-live="polite">
          {message}
        </div>
      </div>
    </div>
  );
}

export default Reservation;

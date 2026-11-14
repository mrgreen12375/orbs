import React from "react";

function Reservation() {
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
          <button className="rb-btn" id="rb-prev" type="button">
            Previous week
          </button>

          <strong id="rb-week-label">Loading week...</strong>

          <button className="rb-btn" id="rb-next" type="button">
            Next week
          </button>
        </div>

        <div className="rb-grid">
          <table className="rb-table">
            <thead id="rb-head-days"></thead>
            <tbody id="rb-calendar"></tbody>
          </table>
        </div>
      </div>

      <div className="rb-panel rb-booking-panel">
        <h2>Create a booking</h2>

        <p className="rb-booking-intro">
          Choose a room, set the time, and add a purpose.
        </p>

        <div className="rb-form">
          <label className="rb-field">
            Room
            <select id="rb-room"></select>
          </label>

          <label className="rb-field">
            Start
            <input id="rb-start" type="datetime-local" />
          </label>

          <label className="rb-field">
            End
            <input id="rb-end" type="datetime-local" />
          </label>

          <label className="rb-field">
            Purpose
            <input
              id="rb-purpose"
              type="text"
              maxLength={100}
              placeholder="Team planning"
            />
          </label>
        </div>

        <div className="rb-actions">
          <button id="rb-reset" type="button" className="rb-btn rb-btn-danger">
            Reset reservations
          </button>

          <button
            id="rb-create"
            type="button"
            className="rb-btn rb-btn-primary"
          >
            Book room
          </button>
        </div>

        <div id="rb-message" role="status" aria-live="polite"></div>
      </div>
    </div>
  );
}

export default Reservation;

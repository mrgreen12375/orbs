import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <section>
        <div class="rb-wrap">
          <div class="rb-head">
            <div>
              <h1>KeenStack Room Bookings</h1>
              <div class="rb-muted">
                Weekly schedule for Conference Rooms A-D
              </div>
            </div>
          </div>
          <div class="rb-panel">
            <div class="rb-toolbar">
              <button class="rb-btn" id="rb-prev" type="button">
                Previous week
              </button>
              <strong id="rb-week-label">Loading week...</strong>
              <button class="rb-btn" id="rb-next" type="button">
                Next week
              </button>
            </div>
            <div class="rb-grid">
              <table class="rb-table">
                <thead id="rb-head-days"></thead>
                <tbody id="rb-calendar"></tbody>
              </table>
            </div>
          </div>
          <div class="rb-panel rb-booking-panel">
            <h2>Create a booking</h2>
            <p class="rb-booking-intro">
              Choose a room, set the time, and add a purpose.
            </p>
            <div class="rb-form">
              <label class="rb-field">
                Room<select id="rb-room"></select>
              </label>
              <label class="rb-field">
                Start
                <input id="rb-start" type="datetime-local" />
              </label>
              <label class="rb-field">
                End
                <input id="rb-end" type="datetime-local" />
              </label>
              <label class="rb-field">
                Purpose
                <input
                  id="rb-purpose"
                  type="text"
                  maxlength="100"
                  placeholder="Team planning"
                />
              </label>
            </div>
            <div class="rb-actions">
              <button id="rb-reset" type="button" class="rb-btn rb-btn-danger">
                Reset reservations
              </button>
              <button
                id="rb-create"
                type="button"
                class="rb-btn rb-btn-primary"
              >
                Book room
              </button>
            </div>
            <div id="rb-message" role="status" aria-live="polite"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;

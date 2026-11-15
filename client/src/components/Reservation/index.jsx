import React, { useEffect, useState } from "react";
import ReservationCard from "../ReservationCard";
import logo from "../../assets/orb.png";

function Reservation() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [reservations, setReservations] = useState([]);

  const [formData, setFormData] = useState({
    room: "",
    start: "",
    end: "",
    purpose: "",
  });

  const [message, setMessage] = useState("");

  const rooms = [
    {
      id: 1,
      name: "Conference Room A",
    },
    {
      id: 2,
      name: "Conference Room B",
    },
    {
      id: 3,
      name: "Conference Room C",
    },
    {
      id: 4,
      name: "Conference Room D",
    },
  ];

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch("/api/reservations");

      if (!response.ok) {
        throw new Error("Failed to load reservations.");
      }

      const data = await response.json();

      setReservations(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getWeekDates = (date) => {
    const start = new Date(date);

    const day = start.getDay();

    const mondayOffset = day === 0 ? -6 : 1 - day;

    start.setDate(start.getDate() + mondayOffset);

    const weekDates = [];

    for (let i = 0; i < 5; i++) {
      const current = new Date(start);

      current.setDate(start.getDate() + i);

      weekDates.push(current);
    }

    return weekDates;
  };

  const sameDay = (reservationDate, weekDate) => {
    const reservation = new Date(reservationDate);

    return (
      reservation.getFullYear() === weekDate.getFullYear() &&
      reservation.getMonth() === weekDate.getMonth() &&
      reservation.getDate() === weekDate.getDate()
    );
  };

  const weekDates = getWeekDates(currentWeek);

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

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateBooking = async () => {
    try {
      if (
        !formData.room ||
        !formData.start ||
        !formData.end ||
        !formData.purpose
      ) {
        setMessage("Please complete all fields.");
        return;
      }

      if (new Date(formData.end) <= new Date(formData.start)) {
        setMessage("End time must be after start time.");
        return;
      }

      const overlappingReservation = reservations.find(
        (reservation) =>
          reservation.roomId === Number(formData.room) &&
          new Date(formData.start) < new Date(reservation.endTime) &&
          new Date(formData.end) > new Date(reservation.startTime)
      );

      if (overlappingReservation) {
        setMessage("This room is already reserved during that time.");

        return;
      }

      const reservationData = {
        roomId: Number(formData.room),
        reservedBy: "Steven Green",
        startTime: formData.start,
        endTime: formData.end,
        purpose: formData.purpose,
      };

      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setMessage("Room booked successfully!");

      setFormData({
        room: "",
        start: "",
        end: "",
        purpose: "",
      });

      await fetchReservations();
    } catch (error) {
      console.error(error);

      setMessage(error.message);
    }
  };

  const handleCancelReservation = async (id) => {
    try {
      const response = await fetch(`/api/reservations/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to cancel reservation.");
      }

      setMessage("Reservation cancelled.");

      await fetchReservations();
    } catch (error) {
      console.error(error);

      setMessage(error.message);
    }
  };

  const handleDeleteAllReservations = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete ALL reservations?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch("/api/reservations", {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete reservations.");
      }

      await fetchReservations();

      setMessage(`${data.deletedCount} reservations deleted.`);
    } catch (error) {
      console.error("Error deleting reservations:", error);
      setMessage(error.message);
    }
  };

  return (
    <div className="rb-wrap">
      <div className="rb-head">
        <div className="rb-logo">
          <img src={logo} alt="Logo" />
          <h1>Office Room Booking System</h1>
        </div>
      </div>

      <div className="rb-panel">
        <div className="rb-toolbar">
          <button className="rb-btn" type="button" onClick={handlePrevWeek}>
            Previous Week
          </button>

          <strong>Week of {weekDates[0].toLocaleDateString()}</strong>

          <button className="rb-btn" type="button" onClick={handleNextWeek}>
            Next Week
          </button>
        </div>

        <div className="rb-grid">
          <table className="rb-table">
            <thead>
              <tr>
                <th>Room</th>

                {weekDates.map((date) => (
                  <th key={date.toISOString()}>
                    <div>
                      {date.toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </div>

                    <div>{date.toLocaleDateString()}</div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.name}</td>

                  {weekDates.map((date) => (
                    <td key={`${room.id}-${date.toISOString()}`}>
                      {reservations
                        .filter(
                          (reservation) =>
                            reservation.roomId === room.id &&
                            sameDay(reservation.startTime, date)
                        )
                        .map((reservation) => (
                          <ReservationCard
                            key={reservation.id}
                            reservation={reservation}
                            onCancel={handleCancelReservation}
                          />
                        ))}
                    </td>
                  ))}
                </tr>
              ))}
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

              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))}
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
            onClick={handleDeleteAllReservations}
          >
            Reset Calender
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

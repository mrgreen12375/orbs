import React from "react";

function ReservationCard({ reservation, onCancel }) {
  const start = new Date(reservation.startTime).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  const end = new Date(reservation.endTime).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  const handleCancel = () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this reservation?"
    );

    if (!confirmed) {
      return;
    }

    onCancel(reservation.id);
  };

  return (
    <div className="reservation-card">
      <div className="reservation-card-title">{reservation.purpose}</div>

      <div className="reservation-card-time">
        {start} - {end}
      </div>

      <button
        type="button"
        className="reservation-card-cancel"
        onClick={handleCancel}
      >
        Cancel
      </button>
    </div>
  );
}

export default ReservationCard;

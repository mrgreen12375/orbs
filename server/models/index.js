const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

const Reservation = sequelize.define(
  "Reservation",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "rooms",
        key: "id",
      },
    },

    reservedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfterStart(value) {
          if (new Date(value) <= new Date(this.startTime)) {
            throw new Error("End time must be after start time.");
          }
        },
      },
    },

    purpose: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("requested", "confirmed", "cancelled"),
      allowNull: false,
      defaultValue: "requested",
    },
  },
  {
    tableName: "reservations",
    timestamps: true,
    underscored: true,
  }
);

module.exports = Reservation;

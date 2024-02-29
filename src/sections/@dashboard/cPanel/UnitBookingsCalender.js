import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import moment from 'moment';
import { format } from 'date-fns';

UnitBookingCalenderWithLineStrikeOut.propTypes = {
  bookings: PropTypes.array,
  month: PropTypes.number,
};

export default function UnitBookingCalenderWithLineStrikeOut({ bookings, month }) {
  const [selectedRanges, setSelectedRanges] = useState([]);
  const [startingDate, setStartingDate] = useState(new Date(new Date().getFullYear(), month, 1));

  // Function to get the month name from startingDate
  const getMonthName = () => format(startingDate, 'MMMM');

  const getBookingsRanges = useCallback(() => {
    setSelectedRanges([]); // Clear existing ranges
    bookings?.forEach((booking) => {
      const start = format(new Date(booking.checkIn), 'dd-MM-yyyy');
      const end = format(new Date(booking.checkOut), 'dd-MM-yyyy');

      const rangeObj = { start, end };
      setSelectedRanges((prev) => [...prev, rangeObj]);
    });
  }, [bookings]);

  useEffect(() => {
    getBookingsRanges();
  }, [bookings, getBookingsRanges]);

  useEffect(() => {
    setStartingDate(new Date(new Date().getFullYear(), month, 1)); // Update starting date
  }, [bookings, month]);

  return (
    <div style={{ width: '100%' }}>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <h2>{getMonthName()}</h2>
      </div>
      <Calendar
        value={startingDate} // Set the starting date based on the month number
        showNavigation={false}
        tileClassName={({ date }) => {
          const formattedDate = moment(date).format('DD-MM-YYYY');
          const isSelected = selectedRanges.some((range) =>
            moment(formattedDate, 'DD-MM-YYYY').isBetween(
              moment(range.start, 'DD-MM-YYYY'),
              moment(range.end, 'DD-MM-YYYY'),
              null,
              '[]'
            )
          );
          if (isSelected) {
            const index = selectedRanges.findIndex((range) =>
              moment(formattedDate, 'DD-MM-YYYY').isBetween(
                moment(range.start, 'DD-MM-YYYY'),
                moment(range.end, 'DD-MM-YYYY'),
                null,
                '[]'
              )
            );
            return `selected-ranges-${index % 1}`;
          }
          return '';
        }}
      />
      <style>
        {selectedRanges.map(
          (range, index) =>
            `.selected-ranges-${index} {
            position: relative;
          }
          .selected-ranges-${index}::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            width: 100%;
            height: 4px; /* Increase thickness */
            background-color: red;
            opacity:0.4;

          }`
        )}
      </style>
    </div>
  );
}

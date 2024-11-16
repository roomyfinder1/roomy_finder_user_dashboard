import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import moment from 'moment';
import { format } from 'date-fns';

CalendarComponent.propTypes = {
  bookings: PropTypes.array,
};

export default function CalendarComponent({ bookings }) {
  const colors = ['#ff5733', '#33a3ff'];

  const [selectedRanges, setSelectedRanges] = useState([]);

  const getBookingsRanges = useCallback(() => {
    bookings?.forEach((booking) => {
      const start = format(new Date(booking.checkIn), 'dd-MM-yyyy');
      const end = format(new Date(booking.checkOut), 'dd-MM-yyyy');

      const rangeObj = { start, end };
      setSelectedRanges((prev) => [...prev, rangeObj]);
    });
  }, [bookings, setSelectedRanges]);

  useEffect(() => {
    getBookingsRanges();
  }, [bookings, getBookingsRanges]);

  return (
    <div style={{ width: '100%' }}>
      <Calendar
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
            return `selected-range-${index % 1}`;
          }
          return '';
        }}
      />
      <style>
        {selectedRanges.map(
          (range, index) =>
            `.selected-range-${index} {
            background-color: ${colors[index]};
            color: white;
            
          }`
        )}
      </style>
    </div>
  );
}

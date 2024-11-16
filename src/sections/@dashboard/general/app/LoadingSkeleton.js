import React from 'react';
import PropTypes from 'prop-types';
import { TableBody, TableRow, TableCell, Skeleton } from '@mui/material';

LoadingSkeleton.propTypes = {
  rows: PropTypes.number,
  columns: PropTypes.number,
};
export default function LoadingSkeleton({ rows, columns }) {
  return (
    <TableBody>
      {Array.from({ length: columns }).map((column, index) => (
        <TableRow key={`${column}${Math.random()}`}>
          {Array.from({ length: rows }).map((row) => (
            <TableCell key={`${row}${Math.random()}`}>
              <Skeleton width="100%" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}

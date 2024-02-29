import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const DownloadAsPdf = ({ contentId, buttonText, ref }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style>
        {`
          @media print {
            /* Set the width of the printed content to auto (available width) */
            body {
              width: auto;
              font-size: 6pt;
              color:"#fff;
              /* Add any other print-specific styles */
            }

            /* Example: Hide certain elements when printing */
            .no-print {
              display: none;
            }
          }
        `}
      </style>
      <Button onClick={handlePrint}>{buttonText}</Button>
    </>
  );
};

DownloadAsPdf.propTypes = {
  contentId: PropTypes.string,
  buttonText: PropTypes.string,
  ref: PropTypes.object,
};

export default DownloadAsPdf;

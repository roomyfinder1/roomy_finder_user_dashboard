import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Card,
  Typography,
  Stack,
  Tooltip,
  Box,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
// components
import Chart, { useChart } from '../../../../../components/chart';

LineGraph.propTypes = {
  sx: PropTypes.object,
  chart: PropTypes.object.isRequired,
  color: PropTypes.string,
  title: PropTypes.string,
  total: PropTypes.number,
  loading: PropTypes.bool,
  availableYears: PropTypes.arrayOf(PropTypes.number),
};

export default function LineGraph({
  total,
  color = 'primary',
  chart,
  title = 'Monthly Income',
  availableYears = [],
  loading = false,
  sx,
  ...other
}) {
  const theme = useTheme();
  const { series, options } = chart;

  // State to store the selected year
  const [selectedYear, setSelectedYear] = useState(availableYears[0] || new Date().getFullYear());

  // Handle year selection
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    // Add logic to fetch/update chart data for the selected year, if necessary
  };

  // Month labels for x-axis
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Chart options
  const chartOptions = useChart({
    colors: [theme.palette[color].main],
    chart: {
      sparkline: {
        enabled: false, // Ensure we show axes and labels
      },
    },
    xaxis: {
      categories: monthNames, // Month names on the x-axis
      labels: {
        show: true,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    stroke: {
      width: 2,
    },
    grid: {
      show: true,
      borderColor: theme.palette.divider,
    },
    tooltip: {
      marker: {
        show: true,
      },
      y: {
        formatter: (value) => `$${value.toLocaleString()}`,
        title: {
          formatter: () => 'Income:',
        },
      },
    },
    fill: {
      gradient: {
        opacityFrom: 0.5,
        opacityTo: 0.2,
      },
    },
    ...options,
  });

  return (
    <Card
      sx={{
        p: 3,
        boxShadow: 0,
        color: `${color}.darker`,
        backgroundColor: `${color}.lighter`,
        position: 'relative',
        ...sx,
      }}
      {...other}
    >
      {/* Year Selector */}
      <Box sx={{ position: 'absolute', right: 10, top: 10 }}>
        <Select
          value={selectedYear}
          onChange={handleYearChange}
          size="small"
          sx={{ backgroundColor: 'white', boxShadow: 1 }}
        >
          {availableYears.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Loading State */}
      {loading ? (
        <Stack justifyContent="center" alignItems="center" height={150}>
          <CircularProgress size={40} color={color} />
        </Stack>
      ) : (
        <>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
            <div>
              <Typography sx={{ mb: 2, typography: 'subtitle2' }}>{title}</Typography>
              <Tooltip title={title}>
                <Box sx={{ typography: 'h3' }}>
                  {total ? `$${total.toLocaleString()}` : 0}
                  <Typography variant="subtitle2">{title} till today</Typography>
                </Box>
              </Tooltip>
            </div>
          </Stack>

          {/* Line Chart */}
          <Chart type="area" series={[{ data: series }]} options={chartOptions} height={150} />
        </>
      )}
    </Card>
  );
}

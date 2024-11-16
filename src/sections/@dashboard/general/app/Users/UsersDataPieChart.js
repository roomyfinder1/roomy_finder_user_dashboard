import PropTypes from 'prop-types';

// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// utils
import { fNumber } from '../../../../../utils/formatNumber';
// components
import Chart, { useChart } from '../../../../../components/chart';

// ----------------------------------------------------------------------

UserDataPieChart.propTypes = {
  chart: PropTypes.object,
  title: PropTypes.string,
  subheader: PropTypes.string,
  height: PropTypes.number,
  renderId: PropTypes.string,
};

export default function UserDataPieChart({ renderId, title, subheader, chart, height, ...other }) {
  const themes = useTheme();
  const navigate = useNavigate();

  const CHART_HEIGHT = height || 300;

  const LEGEND_HEIGHT = 100;

  const StyledChart = styled('div')(({ theme }) => ({
    height: CHART_HEIGHT,
    marginTop: theme.spacing(5),
    '& .apexcharts-canvas svg': {
      height: CHART_HEIGHT,
    },
    '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
      overflow: 'visible',
    },
    '& .apexcharts-legend': {
      height: LEGEND_HEIGHT,
      alignContent: 'center',
      position: 'relative !important',
      borderTop: `solid 1px ${theme.palette.divider}`,
      top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
    },
  }));

  const { colors, series, options } = chart;

  const chartSeries = series.map((i) => i.value);

  const chartOptions = useChart({
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    colors,
    labels: series.map((i) => i.label),
    stroke: { colors: [themes.palette.background.paper], width: -25 },
    legend: { floating: true, horizontalAlign: 'center' },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (value) => fNumber(value),
        title: {
          formatter: (seriesName) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '80%',
          labels: {
            value: {
              formatter: (value) => fNumber(value),
            },
            total: {
              show: true,
              label: title,
              formatter: (w) => {
                const sum = w.globals.seriesTotals[0] + w.globals.seriesTotals[1];
                return fNumber(sum);
              },
            },
          },
        },
      },
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          navigate(`/dashboard/accounts/all_${title}_page`);
        }}
      />

      <StyledChart dir="ltr">
        <Chart type="donut" series={chartSeries} options={chartOptions} height={150} />
      </StyledChart>
    </Card>
  );
}

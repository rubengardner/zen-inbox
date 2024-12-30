import {Paper, useTheme} from "@mui/material";
import { BarChart } from "@mui/x-charts";

interface MonthlyEmailStats {
  [year: number]: {
    [month: number]: number;
  };
}

interface EmailPerMonthChartProps {
  monthlyEmailStats: MonthlyEmailStats;
}

interface SeriesData {
  label: string;
  data: number[];
}

const EmailPerMonthChart = (props: EmailPerMonthChartProps) => {
  const { monthlyEmailStats } = props;
   const theme = useTheme();

function processEmailStats(monthlyEmailStats: MonthlyEmailStats): SeriesData[] {
  const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);

  return Object.entries(monthlyEmailStats).map(([year, months]) => {
    const data = allMonths.map(month => months[month] || 0);
    return { label: year, data };
  });
}

  const series = processEmailStats(monthlyEmailStats);

  return (
     <Paper
            elevation={2}
            sx={{
                padding: theme.spacing(3),
                borderRadius: 2,
                backgroundColor: theme.palette.background.default,
                border: `1px solid ${theme.palette.primary.main}`,
                width: '90%',
                height: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
      <BarChart
        width={500}
        height={300}
        series={series}
      />
    </Paper>
  );
};

export default EmailPerMonthChart;
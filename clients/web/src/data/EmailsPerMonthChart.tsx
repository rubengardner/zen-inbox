import {Paper, useTheme} from "@mui/material";
import {BarChart} from "@mui/x-charts";
import {axisClasses} from '@mui/x-charts/ChartsAxis';

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

const EmailsPerMonthChart = (props: EmailPerMonthChartProps) => {
    const {monthlyEmailStats} = props;
    const theme = useTheme();

    function processEmailStats(monthlyEmailStats: MonthlyEmailStats): SeriesData[] {
        const allMonths = Array.from({length: 12}, (_, i) => i + 1);

        return Object.entries(monthlyEmailStats).map(([year, months]) => {
            const data = allMonths.map(month => months[month] || 0);
            return {label: year, data};
        });
    }

    const series = processEmailStats(monthlyEmailStats);

    const chartSetting = {
        yAxis: [
            {
                label: 'Emails',
            },
        ],
        sx: {
            [`.${axisClasses.left} .${axisClasses.label}`]: {
                transform: 'translate(-20px, 0)',
            },
        },
    };
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
                {...chartSetting}


            />
        </Paper>
    );
};

export default EmailsPerMonthChart;
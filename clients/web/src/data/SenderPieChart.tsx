import React from 'react';
import {PieChart,} from '@mui/x-charts';
import {Paper, Typography, useTheme} from "@mui/material";


const SenderPieChart = () => {
    const theme = useTheme();
    const response = [
        {sender: 'sender1@example.com', number_of_emails: 5},
        {sender: 'sender2@example.com', number_of_emails: 3},
        {sender: 'sender3@example.com', number_of_emails: 7},
        {sender: 'sender4@example.com', number_of_emails: 2},
        {sender: 'sender5@example.com', number_of_emails: 4},
        {sender: 'sender6@example.com', number_of_emails: 1}
    ];

    const topSenders = response
        .sort((a, b) => b.number_of_emails - a.number_of_emails)
        .slice(0, 5)
        .map(item => ({
            label: item.sender,
            value: item.number_of_emails
        }));

    return (
        <Paper
            elevation={2}
            sx={{
                padding: theme.spacing(3),
                borderRadius: 2,
                backgroundColor: theme.palette.background.default,
                width: '90%',
                height: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                border: `1px solid ${theme.palette.primary.main}`,
            }}
        >
            <Typography
                variant="h5"
                component="h2"
                color={theme.palette.text.primary}
                textAlign="center"
            >
                Top Senders
            </Typography>
            <PieChart
                series={[
                    {
                        data: topSenders,
                        innerRadius: 60,
                        outerRadius: 120,
                        paddingAngle: 5,
                        cornerRadius: 5,
                    },
                ]}
            />
        </Paper>
    );
};

export default SenderPieChart;

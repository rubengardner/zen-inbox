import React from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';

interface QueryDisplayProps {
    since?: string | null;
    before?: string | null;
    body?: string | null;
    sender?: string | null;
}

const QueryDisplay = (props: QueryDisplayProps) => {
    const theme = useTheme();
    const query = {
        since: props.since,
        before: props.before,
        body: props.body,
        sender: props.sender
    };

    return (
        <Paper
            elevation={2}
            sx={{
                padding: theme.spacing(3),
                borderRadius: 2,
                backgroundColor: theme.palette.background.default,
                width: '100%',
                maxWidth: '600px',
                margin: '0 auto',
            }}
        >
            <Typography
                variant="h5"
                component="h2"
                fontWeight="bold"
                color={theme.palette.text.primary}
                gutterBottom
                textAlign="center"
            >
                Query Details
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: theme.spacing(2),
                }}
            >
                {query.since && (
                    <Typography variant="body1" color={theme.palette.text.secondary}>
                        <strong>Since:</strong> {query.since}
                    </Typography>
                )}

                {query.before && (
                    <Typography variant="body1" color={theme.palette.text.secondary}>
                        <strong>Before:</strong> {query.before}
                    </Typography>
                )}

                {query.body && (
                    <Typography variant="body1" color={theme.palette.text.secondary}>
                        <strong>Body Contains:</strong> {query.body}
                    </Typography>
                )}

                {query.sender && (
                    <Typography variant="body1" color={theme.palette.text.secondary}>
                        <strong>Sender:</strong> {query.sender}
                    </Typography>
                )}

                {!query.since && !query.before && !query.body && !query.sender && (
                    <Typography variant="body1" color={theme.palette.text.secondary}>
                        No query parameters selected.
                    </Typography>
                )}
            </Box>
        </Paper>
    );
};

export default QueryDisplay;

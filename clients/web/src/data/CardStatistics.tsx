import {Paper, Typography, useTheme} from "@mui/material";
import React from "react";

interface TotalNumberOfEmailsProps {
    numberOfEmails: number;
    message: string;

}

const CardStatics = (props: TotalNumberOfEmailsProps) => {
    const theme = useTheme();
    const numberOfEmails = props.numberOfEmails;
    const message = props.message;
    return (
        <Paper
            elevation={2}
            sx={{
                padding: theme.spacing(3),
                borderRadius: 2,
                border: `1px solid ${theme.palette.primary.main}`,
                backgroundColor: theme.palette.background.default,
                width: '90%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '150px'
            }}
        >
            <Typography
                variant="h5"
                component="h2"
                color={theme.palette.text.primary}
                textAlign="center"
            >
                {message}
            </Typography>
            <Typography
                variant="h5"
                component="h2"
                gutterBottom
                textAlign="center"
                color={theme.palette.text.primary}
            >
                {numberOfEmails}
            </Typography>
        </Paper>
    );
};

export default TotalNumberOfEmails;
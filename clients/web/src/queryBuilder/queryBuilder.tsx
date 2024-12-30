import React, {useState} from 'react';
import {
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import {post} from "../connector/APIConnector";

const QueryBuilder = () => {
    const [dateOption, setDateOption] = useState<'range' | 'older' | 'younger'>('range');
    const theme = useTheme();
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [searchBody, setSearchBody] = useState<string>('');
    const [searchSender, setSearchSender] = useState<string>('');

    const handleDateOptionChange = (event: SelectChangeEvent<'range' | 'older' | 'younger'>) => {
        setDateOption(event.target.value as 'range' | 'older' | 'younger');
    };

    const handleSubmit = () => {
        const query = {
            since: dateOption === 'younger' ? startDate : null,
            before: dateOption === 'older' ? startDate : null,
            body: searchBody || null,
            sender: searchSender || null
        };

        if (dateOption === 'range' && startDate && endDate) {
            query.since = startDate;
            query.before = endDate;
        }

        post('emails/emails', query).then(response => {
            console.log(query);
            if (response.status === 200) {
                console.log('Query successful');
            }
        });
    }

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: theme.palette.background.paper,
                padding: theme.spacing(3),
                borderRadius: 2,
            }}
        >
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                color={theme.palette.text.primary}
            >
                Search your emails
            </Typography>
            <FormControl fullWidth sx={{marginBottom: theme.spacing(2)}}>
                <InputLabel>Date</InputLabel>
                <Select
                    value={dateOption}
                    onChange={handleDateOptionChange}
                    label="Date"
                >
                    <MenuItem value="range">Between a range</MenuItem>
                    <MenuItem value="older">Older than</MenuItem>
                    <MenuItem value="younger">Younger than</MenuItem>
                </Select>
            </FormControl>

            {dateOption === 'range' && (
                <>
                    <TextField
                        label="Start Date"
                        type="date"
                        fullWidth
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{marginBottom: theme.spacing(2)}}
                    />
                    <TextField
                        label="End Date"
                        type="date"
                        fullWidth
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{marginBottom: theme.spacing(2)}}
                    />
                </>
            )}

            {(dateOption === 'older' || dateOption === 'younger') && (
                <TextField
                    label={dateOption === 'older' ? 'Older than Date' : 'Younger than Date'}
                    type="date"
                    fullWidth
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{marginBottom: theme.spacing(2)}}
                />
            )}

            <TextField
                label="Search Body"
                variant="outlined"
                fullWidth
                value={searchBody}
                onChange={(e) => setSearchBody(e.target.value)}
                sx={{marginBottom: theme.spacing(2)}}
            />

            <TextField
                label="Search Sender"
                variant="outlined"
                fullWidth
                value={searchSender}
                onChange={(e) => setSearchSender(e.target.value)}
                sx={{marginBottom: theme.spacing(2)}}
            />

            <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                Send Query
            </Button>
        </Container>
    );
};

export default QueryBuilder;

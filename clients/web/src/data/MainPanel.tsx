import CardStatistics from "./CardStatistics";
import SenderPieChart from "./SenderPieChart";
import QueryDisplay from "./QueryDisplay";
import EmailsPerMonthChart from "./EmailsPerMonthChart";
import {Button, Divider, Typography, useTheme} from "@mui/material";
import Grid from '@mui/material/Grid2';

const MainPanel = () => {
    const emailStats = {
        2024: {
            1: 100,
            2: 200,
            3: 300,
            4: 400,
            5: 500,
            7: 700,
            8: 800,
            9: 900,
            10: 1000,
            11: 1100,
            12: 1200
        },
        2023: {
            1: 100,
            2: 200,
            3: 300,
            4: 400,
            5: 500,
            6: 600,
            7: 700,
            8: 800,
            9: 900,
            10: 1000,
            11: 1100,
            12: 1200
        }
    }

    const theme = useTheme();

    return (
        <div>
            <Grid container spacing={4}>
                <Grid size={{xs: 6, md: 10}}>
                    <Typography
                        variant="h5"
                        component="h2"
                        color={theme.palette.text.primary}
                    >
                        Email Statistics
                    </Typography>
                </Grid>
                <Grid size={{xs: 6, md: 2}}>
                    <Button variant="contained">Make another query</Button>
                </Grid>
            </Grid>
            <Divider sx={{marginY: 2, borderWidth: 1}}/>
            <Grid container spacing={4}>
                <Grid size={{xs: 6, md: 3}}>
                    <CardStatistics numberOfEmails={1200} message={"Total emails"}/>
                </Grid>
                <Grid size={{xs: 6, md: 3}}>
                    <CardStatistics numberOfEmails={100} message={"Emails/Month"}/>
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <QueryDisplay before={"Before"} body={"body"} sender={"sender"} since={"since"}/>
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <EmailsPerMonthChart monthlyEmailStats={emailStats}/>
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <SenderPieChart/>
                </Grid>
            </Grid>
            <Divider sx={{marginY: 2, borderWidth: 1}}/>
        </div>
    )
}

export default MainPanel;
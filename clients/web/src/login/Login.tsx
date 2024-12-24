import React from 'react';
import {Button, Container, TextField, Typography, useTheme} from '@mui/material';
import {useForm} from 'react-hook-form';
import {post} from "../connector/APIConnector";

const Login = () => {
    const {register, handleSubmit, formState: {errors}, control} = useForm();
    const theme = useTheme();

    const onSubmit = (data: any) => {
        post('auth/login', data).then(response => {
            if (response.status === 200) {
                console.log('Login successful');
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
                backgroundColor: theme.palette.background.paper, // Use theme's background color
                padding: theme.spacing(3), // Use theme's spacing
                borderRadius: 2, // Apply theme spacing for rounded corners
            }}
        >
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                color={theme.palette.text.primary} // Dynamically apply text color
            >
                Login
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} style={{width: '100%'}}>
                <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    {...register("username", {required: "Email is required"})}
                    error={!!errors.email}
                    sx={{
                        '& .MuiInputLabel-root': {
                            color: theme.palette.text.primary, // Label color
                        },
                        '& .MuiOutlinedInput-root': {
                            borderColor: theme.palette.primary.main, // Input border color
                        },
                    }}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    {...register("password", {required: "Password is required"})}
                    error={!!errors.password}
                    sx={{
                        '& .MuiInputLabel-root': {
                            color: theme.palette.text.primary, // Label color
                        },
                        '& .MuiOutlinedInput-root': {
                            borderColor: theme.palette.primary.main, // Input border color
                        },
                    }}
                />

                {/*<FormControl fullWidth margin="normal" error={!!errors.provider}>*/}
                {/*    <InputLabel>Provider</InputLabel>*/}
                {/*    <Controller*/}
                {/*        name="provider"*/}
                {/*        control={control}*/}
                {/*        rules={{required: "Provider is required"}}*/}
                {/*        render={({field}) => (*/}
                {/*            <Select {...field} label="Provider">*/}
                {/*                <MenuItem value="gmail">Gmail</MenuItem>*/}
                {/*                <MenuItem value="yahoo">Yahoo</MenuItem>*/}
                {/*                <MenuItem value="outlook">Outlook</MenuItem>*/}
                {/*            </Select>*/}
                {/*        )}*/}
                {/*    />*/}
                {/*</FormControl>*/}

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                        backgroundColor: theme.palette.primary.main, // Button color from theme
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark, // Hover effect color from theme
                        },
                    }}
                >
                    Log In
                </Button>
            </form>
        </Container>
    );
};

export default Login;

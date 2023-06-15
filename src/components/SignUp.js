import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Background from './Background.js';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import backendUrl from './env.js';
import axios from 'axios';
axios.defaults.withCredentials=true;

export default function SignUp() {
    const [role,setRole]=React.useState("DEV");
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        axios.post(`${backendUrl}/auth/signup`,{
            email: data.get('email'),
            password: data.get('password'),
            first_name:data.get('first_name'),
            last_name:data.get('last_name'),
            role:data.get('role'),
        })
        .then(response=>{
            axios.post(`${backendUrl}/auth/signin`,{
                email: data.get('email'),
                password: data.get('password')
            })
            .then(response=>{
                axios.get(`${backendUrl}/auth/user_info`)
                .then(response=>{
                const data=response.data;
                Object.keys(data).forEach(key=>{
                    localStorage.setItem(key,data[key])
                });
                window.location="/"
            })
                window.location="/"
            })
            .catch(error=>{
                console.log(error.response.data["msg"] ||error.response.data["detail"])
            });
        })
        .catch(
            error=>{
                alert(error.response.data["msg"] || error.response.data["detail"])
            }
        );

    };

    return (
                <>
             <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Background/>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="first_name"
                                label="First Name"
                                name="first_name"
                                autoComplete="first_name"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="last_name"
                                label="Last Name"
                                name="last_name"
                                autoComplete="last_name"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <Select
                                margin="normal"
                                required
                                value={role}
                                id="role"
                                name="role"
                                label="Role"
                                fullWidth
                                onChange={(event)=>{setRole(event.target.value)}}
                                autoFocus
                           >
                                <MenuItem value={"DEV"}>Developer</MenuItem>
                                <MenuItem value={"SM"}>Scrum Master</MenuItem>
                            </Select>
                            
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="/signin" variant="body2">
                                        {"Already Have An Account? Sign In"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            </>
    );
}
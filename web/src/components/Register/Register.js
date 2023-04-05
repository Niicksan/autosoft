import { useState, useContext } from "react";
import { Link } from 'react-router-dom';

import { Container, Avatar, Button, CssBaseline, TextField, Box, Grid, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";

const theme = createTheme();

export const Register = () => {
    const { onRegisterSubmit } = useContext(AuthContext);
    const { values, changeHandler, onSubmit } = useForm({
        email: '',
        password: '',
        confirmPassword: '',
    }, onRegisterSubmit);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Регистрация в AutoSoft
                    </Typography>
                    <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Имейл адрес"
                            name="email"
                            autoComplete="email"
                            value={values.email}
                            autoFocus
                            onChange={changeHandler}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="company-name"
                            label="Име на фирма"
                            name="companyName"
                            autoComplete="companyName"
                            value={values.companyName}
                            onChange={changeHandler}
                        />
                        <FormControl sx={{ width: '45ch', margin: '8px 0' }} variant="outlined">
                            <InputLabel htmlFor="password">Парола</InputLabel>
                            <OutlinedInput
                                required
                                id="password"
                                label="Парола"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={values.password}
                                onChange={changeHandler}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl sx={{ width: '45ch', margin: '8px 0' }} variant="outlined">
                            <InputLabel htmlFor="confirmPassword">Повторете ааролата</InputLabel>
                            <OutlinedInput
                                required
                                id="confirmPassword"
                                label="Повторете ааролата"
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={values.confirmPassword}
                                onChange={changeHandler}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleClickShowConfirmPassword}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: '#550A21' }}
                        >
                            Регистрация
                        </Button>
                        <Grid container sx={{ justifyContent: 'center' }}>
                            <Grid item sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <Typography sx={{ marginRight: '5px' }}>
                                    Имате акаунт?
                                </Typography>
                                <Typography component={Link} to="/auth/login" sx={{ color: '#550A21', textDecoration: 'none', cursor: 'pointer', ':hover': { textDecoration: 'underline' } }}>
                                    {"Вход"}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    );
}
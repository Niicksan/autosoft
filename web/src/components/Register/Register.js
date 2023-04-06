import { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';

import { Container, Avatar, Button, CssBaseline, TextField, Box, Grid, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";

const theme = createTheme();

export const Register = () => {
    const { error, setError, onRegisterSubmit } = useContext(AuthContext);
    const { values, changeHandler, onSubmit } = useForm({
        email: '',
        companyName: '',
        password: '',
        confirmPassword: '',
    }, onRegisterSubmit);

    const emailReg = new RegExp(/[a-z]+@[a-z]+\.[a-z]/);

    const [user, setUser] = useState({
        email: '',
        companyName: '',
        password: '',
        confirmPassword: '',
    })

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        console.log(user);
        console.log(error);
        checkIsFormValid()
    }, [user.email, user.companyName, user.password, user.confirmPassword]);

    const checkIsFormValid = () => {
        (
            (error.email && user.email !== '') &&
            (error.companyName && user.companyName !== '') &&
            (error.password && user.password !== '') &&
            (error.confirmPassword && user.confirmPassword !== '')
        ) ? setIsFormValid(true) : setIsFormValid(false);

        console.log(isFormValid);
    }

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickEmail = (e) => {
        if (emailReg.test(e.target.value)) {
            // email.className = 'success';
            setError({ ...error, email: true });
        } else {
            setError({ ...error, email: false });
        }

        setUser({ ...user, email: e.target.value });
    };

    const handleClickCompanyName = (e) => {
        if ((e.target.value).length > 1) {
            setError({ ...error, companyName: true });
        } else {
            setError({ ...error, companyName: false });
        }

        setUser({ ...user, companyName: e.target.value });
    };

    const handleClickPassword = (e) => {
        if ((e.target.value).length > 4) {
            setError({ ...error, password: true });
        } else {
            setError({ ...error, password: false });
        }

        setUser({ ...user, password: e.target.value });
    };

    const handleClickConfirmPassword = (e) => {
        if (e.target.value === user.password) {
            setError({ ...error, confirmPassword: true });
        } else {
            setError({ ...error, confirmPassword: false });
        }

        setUser({ ...user, confirmPassword: e.target.value });
    };

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
                    <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
                        <TextField
                            error={!error.email}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Имейл адрес"
                            name="email"
                            autoComplete="email"
                            value={values.email}
                            onChange={(e) => {
                                changeHandler(e);
                                handleClickEmail(e);
                            }}
                        />
                        {!error.email && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Невалиден имейл</Typography>}
                        <TextField
                            error={!error.companyName}
                            margin="normal"
                            required
                            fullWidth
                            id="company-name"
                            label="Име на фирма"
                            name="companyName"
                            autoComplete="companyName"
                            value={values.companyName}
                            onChange={(e) => {
                                changeHandler(e);
                                handleClickCompanyName(e);
                            }}
                        />
                        {!error.companyName && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Името трябва да съдържа поне 2 символа</Typography>}
                        <FormControl sx={{ width: '45ch', margin: '8px 0' }} variant="outlined">
                            <InputLabel htmlFor="password">Парола</InputLabel>
                            <OutlinedInput
                                error={!error.password}
                                required
                                id="password"
                                label="Парола"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={values.password}
                                onChange={(e) => {
                                    changeHandler(e);
                                    handleClickPassword(e);
                                }}
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
                        {!error.password && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Паролата трябва е дълга поне 5 символа</Typography>}
                        <FormControl sx={{ width: '45ch', margin: '8px 0' }} variant="outlined">
                            <InputLabel htmlFor="confirmPassword">Повторете паролата</InputLabel>
                            <OutlinedInput
                                error={!error.confirmPassword}
                                required
                                id="confirmPassword"
                                label="Повторете паролата"
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={values.confirmPassword}
                                onChange={(e) => {
                                    changeHandler(e);
                                    handleClickConfirmPassword(e);
                                }}
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
                        {!error.confirmPassword && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Паролите не съвпадат</Typography>}
                        {error.isUserExist && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>{error.isUserExist}</Typography>}

                        <Button
                            disabled={!isFormValid}
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
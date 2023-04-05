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
        companyName: '',
        password: '',
        confirmPassword: '',
    }, onRegisterSubmit);

    const emailReg = new RegExp(/[a-z]+@[a-z]+\.[a-z]/);

    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isCompanyNameValid, setIsCompanyNameValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
    const [isFormValid, setIsFormValid] = useState(false);

    const checkIsFormValid = () => {
        (
            (isEmailValid && email !== '') &&
            (isCompanyNameValid && companyName !== '') &&
            (isPasswordValid && password !== '') &&
            (isConfirmPasswordValid && confirmPassword !== '')
        ) ? setIsFormValid(true) : setIsFormValid(false);

        console.log(isFormValid);
    }

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickEmail = (e) => {
        if (emailReg.test(e.target.value)) {
            // email.className = 'success';
            setIsEmailValid(true);
        } else {
            setIsEmailValid(false);
        }

        setEmail(e.target.value);
    };

    const handleClickCompanyName = (e) => {
        if ((e.target.value).length > 1) {
            setIsCompanyNameValid(true);
        } else {
            setIsCompanyNameValid(false);
        }

        setCompanyName(e.target.value);
    };

    const handleClickPassword = (e) => {
        if ((e.target.value).length > 4) {
            setIsPasswordValid(true);
        } else {
            setIsPasswordValid(false);
        }

        setPassword(e.target.value);
    };

    const confirmPasswordConfirmPassword = (e) => {
        if (e.target.value === password) {
            setIsConfirmPasswordValid(true);
        } else {
            setIsConfirmPasswordValid(false);
        }

        setConfirmPassword(e.target.value);
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
                            error={!isEmailValid}
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
                            onBlur={(e) => { handleClickEmail(e); checkIsFormValid(e); }}
                        />
                        {!isEmailValid && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Невалиден имейл</Typography>}
                        <TextField
                            error={!isCompanyNameValid}
                            margin="normal"
                            required
                            fullWidth
                            id="company-name"
                            label="Име на фирма"
                            name="companyName"
                            autoComplete="companyName"
                            value={values.companyName}
                            onChange={changeHandler}
                            onBlur={(e) => { handleClickCompanyName(e); checkIsFormValid(e); }}
                        />
                        {!isCompanyNameValid && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Името трябва да съдържа поне 2 символа</Typography>}
                        <FormControl sx={{ width: '45ch', margin: '8px 0' }} variant="outlined">
                            <InputLabel htmlFor="password">Парола</InputLabel>
                            <OutlinedInput
                                error={!isPasswordValid}
                                required
                                id="password"
                                label="Парола"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={values.password}
                                onChange={changeHandler}
                                onBlur={(e) => { handleClickPassword(e); checkIsFormValid(e); }}
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
                        {!isPasswordValid && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Паролата трябва е дълга поне 5 символа</Typography>}
                        <FormControl sx={{ width: '45ch', margin: '8px 0' }} variant="outlined">
                            <InputLabel htmlFor="confirmPassword">Повторете паролата</InputLabel>
                            <OutlinedInput
                                error={!isConfirmPasswordValid}
                                required
                                id="confirmPassword"
                                label="Повторете паролата"
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={values.confirmPassword}
                                onChange={changeHandler}
                                onBlur={(e) => { confirmPasswordConfirmPassword(e); checkIsFormValid(e); }}
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
                        {!isConfirmPasswordValid && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Паролите не съвпадат</Typography>}
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
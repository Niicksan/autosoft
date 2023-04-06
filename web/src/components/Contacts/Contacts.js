import { useEffect } from "react";

import { Container, Avatar, Button, CssBaseline, TextField, Box, Typography } from '@mui/material';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useForm } from "../../hooks/useForm";
import { useContactsValidation } from "../../hooks/useContactsValidation";

const theme = createTheme();

export const Contacts = () => {
    const {
        form,
        error,
        isSentSuccessfully,
        isFormValid,
        handleClickName,
        handleClickEmail,
        handleClickSubject,
        handleClickMessage,
        checkIsFormValid
    } = useContactsValidation();

    const { values, changeHandler, onSubmit } = useForm({
        name: '',
        email: '',
        subject: '',
        message: ''
    }, checkIsFormValid);

    useEffect(() => {
        checkIsFormValid()
    }, [form.name, form.email, form.subject, form.message]);

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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} >
                        <ContactMailIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" >
                        Свържете се с нас
                    </Typography>
                    <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
                        <TextField
                            error={!error.name}
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Вашето име"
                            name="name"
                            autoComplete="name"
                            onChange={(e) => {
                                changeHandler(e);
                                handleClickName(e);
                            }}
                        />
                        {!error.name && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Името трябва е дълга поне 2 символа</Typography>}

                        <TextField
                            error={!error.email}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Вашият email"
                            name="email"
                            autoComplete="email"
                            onChange={(e) => {
                                changeHandler(e);
                                handleClickEmail(e);
                            }}
                        />
                        {!error.email && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Невалиден имейл</Typography>}

                        <TextField
                            error={!error.subject}
                            margin="normal"
                            required
                            fullWidth
                            id="subject"
                            label="Вашата тема"
                            name="subject"
                            autoComplete="subject"
                            onChange={(e) => {
                                changeHandler(e);
                                handleClickSubject(e);
                            }}
                        />
                        {!error.subject && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Темата  трябва е дълга поне 2 символа</Typography>}

                        <TextField
                            error={!error.message}
                            fullWidth
                            margin="normal"
                            label="Вашето съобщение"
                            multiline
                            required
                            id="message"
                            name="message"
                            rows={4}
                            onChange={(e) => {
                                changeHandler(e);
                                handleClickMessage(e);
                            }}
                        />
                        {!error.message && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Съобщението трябва е дълга поне 20 символа</Typography>}

                        <Button
                            disabled={!isFormValid}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: '#550A21' }}
                        >
                            Изпрати
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    );
};
import '../CreateVehicle/CreateVehicle.scss';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Container, Avatar, Button, CssBaseline, TextField, Box, Typography, MenuItem } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useForm } from '../../../hooks/useForm';
import { useVehicleValidation } from '../../../hooks/useVehicleValidation';
import { useVehicleContext } from '../../../contexts/vehicleContext';

const theme = createTheme();

export const EditVehicle = () => {
    const {
        fuels,
        years,
        form,
        error,
        setVehicleForm,
        isVehicleFormValid,
        handleClickVinNumber,
        handleClickBrand,
        handleClickModel,
        handleClickEngine,
        handleClickFuel,
        handleClickYearOfManufacture,
        handleClickImageUrl,
        onEditVehicleSubmit,
        checkIsVehicleFormValid
    } = useVehicleValidation();

    const { id } = useParams();
    const [setVehicle] = useState({});
    const { getVehicleById } = useVehicleContext();

    const { values, setValues, changeHandler, onSubmit } = useForm({
        id: '',
        vinNumber: '',
        brand: '',
        model: '',
        engine: '',
        fuel: '',
        yearOfManufacture: '',
        imageUrl: '',
    }, onEditVehicleSubmit);

    useEffect(() => {
        getVehicleById(id)
            .then(result => {
                setVehicle(result);
                setValues({
                    ...values,
                    id: result._id,
                    vinNumber: result.vinNumber,
                    brand: result.brand,
                    model: result.model,
                    engine: result.engine,
                    fuel: result.fuel,
                    yearOfManufacture: result.yearOfManufacture,
                    imageUrl: result.imageUrl
                });
                setVehicleForm({
                    ...values,
                    id: result._id,
                    vinNumber: result.vinNumber,
                    brand: result.brand,
                    model: result.model,
                    engine: result.engine,
                    fuel: result.fuel,
                    yearOfManufacture: result.yearOfManufacture,
                    imageUrl: result.imageUrl
                });
            })
    }, [id]);

    useEffect(() => {
        checkIsVehicleFormValid()
    }, [
        form.vinNumber,
        form.brand,
        form.model,
        form.engine,
        form.fuel,
        form.yearOfManufacture,
        form.imageUrl
    ]);

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
                    <Avatar sx={{ m: 1, bgcolor: 'green' }} >
                        <EditIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" >
                        Редактирай атомобил
                    </Typography>
                    <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
                        <TextField
                            error={!error.vinNumber}
                            margin="normal"
                            required
                            fullWidth
                            id="vinNumber"
                            label="Вин номер"
                            name="vinNumber"
                            autoComplete="vinNumber"
                            value={values.vinNumber}
                            onChange={(e) => {
                                changeHandler(e);
                                handleClickVinNumber(e);
                            }}
                        />
                        {!error.vinNumber && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Вин номерът трябва да е 17 символа</Typography>}
                        {error.isVinNumberExist && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>{error.isVinNumberExist}</Typography>}

                        <TextField
                            error={!error.brand}
                            margin="normal"
                            required
                            fullWidth
                            id="brand"
                            label="Марка"
                            name="brand"
                            autoComplete="brand"
                            value={values.brand}
                            onChange={(e) => {
                                changeHandler(e);
                                handleClickBrand(e);
                            }}
                        />
                        {!error.brand && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Марката трябва да съдържа поне 2 символа</Typography>}

                        <TextField
                            error={!error.model}
                            margin="normal"
                            required
                            fullWidth
                            id="model"
                            label="Модел"
                            name="model"
                            autoComplete="model"
                            value={values.model}
                            onChange={(e) => {
                                changeHandler(e);
                                handleClickModel(e);
                            }}
                        />
                        {!error.model && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Моделът трябва е съдържа поне 2 символа</Typography>}

                        <TextField
                            error={!error.engine}
                            margin="normal"
                            required
                            fullWidth
                            id="engine"
                            label="Двигател"
                            name="engine"
                            autoComplete="engine"
                            value={values.engine}
                            onChange={(e) => {
                                changeHandler(e);
                                handleClickEngine(e);
                            }}
                        />
                        {!error.engine && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Двигателят трябва е съдържа поне 2 символа</Typography>}
                        <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <TextField
                                error={!error.fuel}
                                margin="normal"
                                required
                                id="fuel"
                                select="Гориво"
                                label="Гориво"
                                name="fuel"
                                autoComplete="fuel"
                                value={values.fuel}
                                sx={{ width: "48%" }}
                                onChange={(e) => {
                                    changeHandler(e);
                                    handleClickFuel(e);
                                }}
                            >
                                {fuels.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {!error.fuel && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Изберете гориво</Typography>}

                            <TextField
                                error={!error.yearOfManufacture}
                                margin="normal"
                                required
                                id="yearOfManufacture"
                                select="Година"
                                label="Година"
                                name="yearOfManufacture"
                                autoComplete="yearOfManufacture"
                                value={values.yearOfManufacture}
                                sx={{ width: "48%", textAlign: 'center' }}
                                onChange={(e) => {
                                    changeHandler(e);
                                    handleClickYearOfManufacture(e);
                                }}
                            >
                                {years.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {!error.yearOfManufacture && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Изберете година</Typography>}
                        </Box>

                        <TextField
                            error={!error.imageUrl}
                            margin="normal"
                            required
                            fullWidth
                            id="imageUrl"
                            label="Снимка"
                            name="imageUrl"
                            autoComplete="imageUrl"
                            value={values.imageUrl}
                            onChange={(e) => {
                                changeHandler(e);
                                handleClickImageUrl(e);
                            }}
                        />
                        {!error.imageUrl && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Въведете валиден URL</Typography>}

                        <Button
                            disabled={!isVehicleFormValid}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: '#550A21' }}
                        >
                            Редактирай
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    );
};
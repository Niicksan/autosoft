import { useState, useEffect } from 'react';

import { Dialog, DialogTitle, Box, DialogContent, DialogContentText, TextField, Typography, DialogActions, Button } from '@mui/material';

import { useForm } from '../../../../hooks/useForm';
import { useServiceValidation } from '../../../../hooks/useServiceValidation';

export const EditServiceModal = ({
    open,
    handleClose,
    vehicleId,
    serviceId
}) => {
    const {
        error,
        setError,
        serviceForm,
        setServiceForm,
        isServiceFormValid,
        handleClickTitle,
        handleClickKilometers,
        handleClickDescription,
        getServiceById,
        onEditServiceSubmit,
        checkIsServiceFormValid
    } = useServiceValidation();

    const { values, setValues, changeHandler, onSubmit } = useForm({
        title: '',
        kilometers: '',
        description: ''
    }, onEditServiceSubmit, vehicleId, serviceId);

    const mediaMatch = window.matchMedia('(min-width: 600px)');
    const [matches, setMatches] = useState(mediaMatch.matches);

    const styles = {
        form: isWeb => ({
            minWidth: isWeb ? '600px' : '',
        })
    };

    useEffect(() => {
        const handler = e => setMatches(e.matches);
        mediaMatch.addListener(handler);
        return () => mediaMatch.removeListener(handler);
    });

    useEffect(() => {
        getServiceById(vehicleId, serviceId)
            .then(result => {
                setValues({
                    ...values,
                    title: result.title,
                    kilometers: result.kilometers,
                    description: result.description
                });
                setServiceForm({
                    ...values,
                    title: result.title,
                    kilometers: result.kilometers,
                    description: result.description
                });
            })
    }, [vehicleId, serviceId]);

    useEffect(() => {
        checkIsServiceFormValid();
    }, [serviceForm.title, serviceForm.kilometers, serviceForm.description]);

    useEffect(() => {
        setError({
            title: true,
            kilometers: true,
            description: true
        })
    }, [open]);

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Редактирай обслужване</DialogTitle>
                <Box component="form" onSubmit={(e) => {
                    onSubmit(e);
                    handleClose();
                }} sx={{ mt: 1 }} style={styles.form(matches)}>
                    <DialogContent>
                        <DialogContentText>
                            Редактирай обслужване в сервизната история на този автомобил.
                        </DialogContentText>
                        <TextField
                            error={!error.title}
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Заглавие"
                            name="title"
                            autoComplete="title"
                            value={values.title}
                            onChange={(e) => {
                                changeHandler(e);
                                handleClickTitle(e);
                            }}
                        />
                        {!error.title && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Заглавието трябва да съдържа поне 2 символа</Typography>}

                        <TextField
                            error={!error.kilometers}
                            margin="normal"
                            required
                            fullWidth
                            id="kilometers"
                            label="Километри"
                            name="kilometers"
                            autoComplete="kilometers"
                            value={values.kilometers}
                            onChange={(e) => {
                                changeHandler(e);
                                handleClickKilometers(e);
                            }}
                        />
                        {!error.kilometers && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Въведете километри</Typography>}

                        <TextField
                            error={!error.description}
                            margin="normal"
                            required
                            fullWidth
                            id="description"
                            label="Описание"
                            name="description"
                            autoComplete="description"
                            multiline
                            rows={4}
                            value={values.description}
                            onChange={(e) => {
                                changeHandler(e);
                                handleClickDescription(e);
                            }}
                        />
                        {!error.description && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Описанието трябва да съдържа поне 10 символа</Typography>}

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Назад</Button>
                        <Button
                            disabled={!isServiceFormValid}
                            type="submit"
                            variant="contained"
                            color='success'
                        >Редактирай</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}
import { useEffect } from 'react';

import { Dialog, DialogTitle, Box, DialogContent, DialogContentText, TextField, Typography, DialogActions, Button } from '@mui/material';

import { useForm } from '../../../../hooks/useForm';
import { useServiceValidation } from '../../../../hooks/useServiceValidation';

export const CreateServiceModal = ({
    open,
    handleClose,
    vehicleId
}) => {
    const {
        serviceForm,
        error,
        isServiceFormValid,
        handleClickTitle,
        handleClickKilometers,
        handleClickDescription,
        onCreateServiceSubmit,
        checkIsServiceFormValid
    } = useServiceValidation();

    const { values, changeHandler, onSubmit } = useForm({
        title: '',
        kilometers: '',
        description: ''
    }, onCreateServiceSubmit, vehicleId);

    useEffect(() => {
        checkIsServiceFormValid()
    }, [serviceForm.title, serviceForm.kilometers, serviceForm.description]);

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Добави обслужване</DialogTitle>
                <Box component="form" onSubmit={(e) => {
                    onSubmit(e);
                    handleClose();
                }} sx={{ mt: 1 }}>
                    <DialogContent>
                        <DialogContentText>
                            Добавете обслужване към сервизната история на този автомобил.
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
                        >Добави</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}
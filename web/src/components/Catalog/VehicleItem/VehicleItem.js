import '../VehicleItem/VehicleItem.scss';

import { useState } from 'react';

import { Link } from 'react-router-dom';
import { Card, Box, CardContent, Typography, CardMedia, CardActions, Button } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useVehicleContext } from '../../../contexts/VehicleContext';
import { DeleteModal } from '../DeleteModal/DeleteModal';
import { CreateServiceModal } from '../VehicleDetails/CreateServiceModal/CreateServiceModal';

export const VehicleItem = ({
    _id,
    vinNumber,
    brand,
    model,
    engine,
    fuel,
    yearOfManufacture,
    imageUrl,
    createdAtFormatted,
    isDetails
}) => {
    const [open, setOpen] = useState(false);
    const [openCreateModal, setOpenCreateModal] = useState(false);

    const handleClickOpenDeleteModal = () => {
        setOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setOpen(false);
    };

    const handleClickOpenCreateModal = () => {
        setOpenCreateModal(true);
    };

    const handleCloseCreateModal = () => {
        setOpenCreateModal(false);
    };

    const { onDeleteVehicleSubmit } = useVehicleContext();

    const vehicleTitle = `${brand} ${model} ${engine}`;
    const message = 'Сигурни ли сте, че искате да изтриете този автомобил?';

    return (
        <>
            {open && (<DeleteModal open={open} title={vehicleTitle} message={message} onDeleteVehicleSubmit={onDeleteVehicleSubmit} handleClose={handleCloseDeleteModal} id={_id} />)}
            {openCreateModal && (<CreateServiceModal open={openCreateModal} handleClose={handleCloseCreateModal} />)}

            <Card className='card' sx={{ m: 2, width: '90%', maxWidth: '1920px' }}>
                <CardMedia component='img' to={`/catalog/vehicles/${_id}`}
                    sx={{ maxWidth: '30%', flex: 1, objectFit: 'cover' }}
                    className='image'
                    image={imageUrl}
                    title="green iguana"
                />
                <Box className='card-content-holder' >
                    <CardContent >
                        <Typography gutterBottom variant="h5" component="div">
                            {vehicleTitle}
                        </Typography>

                        <Box variant="body2" className='content-items-holder' >
                            <Box className='content-items-left' >
                                <Typography color="text.secondary" >
                                    <Typography component='span' className='content-item' >Вин номер: </Typography>{vinNumber}
                                </Typography>

                                <Typography color="text.secondary">
                                    <Typography component='span' className='content-item'>Марка: </Typography>{brand}
                                </Typography>

                                <Typography color="text.secondary">
                                    <Typography component='span' className='content-item'>Модел: </Typography>{model}
                                </Typography>
                            </Box>

                            <Box className='content-items-left' >
                                <Typography color="text.secondary">
                                    <Typography component='span' className='content-item'>Двигател: </Typography>{engine}
                                </Typography>

                                <Typography color="text.secondary">
                                    <Typography component='span' className='content-item'>Гориво: </Typography>{fuel}
                                </Typography>

                                <Typography color="text.secondary">
                                    <Typography component='span' className='content-item'>Година: </Typography>{yearOfManufacture}
                                </Typography>
                            </Box>

                        </Box>
                        {isDetails && (
                            <Box sx={{ textAlign: 'left', marginTop: '1em' }}>
                                <Typography color="text.secondary">
                                    <Typography component='span' className='content-item'>Създаден на: </Typography>{createdAtFormatted}
                                </Typography>
                            </Box>
                        )}
                    </CardContent>
                    <CardActions className='action' sx={{ m: 1, justifyContent: 'flex-end' }}>
                        {!isDetails && (
                            <>
                                <Button component={Link} to={`/catalog/vehicles/${_id}`} variant="outlined" size="small" >Детайли</Button>
                                <Button component={Link} to={`/catalog/vehicles/edit/${_id}`} size="small" variant="outlined" sx={{ marginRight: '10px' }} startIcon={<EditIcon />} >Редактиеай</Button>
                                <Button size="small" variant="contained" startIcon={<DeleteIcon />} color="error" onClick={handleClickOpenDeleteModal}>Изтрий</Button>
                            </>
                        )}

                        {isDetails && (
                            <>
                                <Button component={Link} to={'/catalog/vehicles'} size="small" variant="outlined" startIcon={<ArrowBackIcon />} sx={{ marginRight: '10px' }}>Назад</Button>
                                <Button size="small" variant="outlined" startIcon={<AddIcon />} color="success" onClick={handleClickOpenCreateModal}>Добави сервизна история</Button>
                            </>
                        )}
                    </CardActions>
                </Box>
            </Card >
        </>
    );
};
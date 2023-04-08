import '../../../VehicleItem/VehicleItem.scss';

import { useState } from 'react';

import { Link } from 'react-router-dom';
import { Card, Box, CardContent, Typography, CardActions, Button } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { DeleteModal } from '../../../VehicleItem/DeleteVehicleModal/DeleteModal';

export const ServiceItem = ({
    _id,
    title,
    kilometers,
    description,
    createdAt
}) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const date = new Date(createdAt);
    const createdAtFormatted = date.toLocaleDateString('Bg-bg', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <>
            {/* {open && (<DeleteModal open={open} vehicleTitle={vehicleTitle} handleClickOpen={handleClickOpen} handleClose={handleClose} id={_id} />)} */}
            <Card className='card' sx={{ m: 4 }}>
                <Box className='card-content-holder' >
                    <CardContent >
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>

                        <Box variant="body2" className='content-items-holder' >
                            <Box className='content-items-left' >
                                <Typography color="text.secondary" >
                                    <Typography component='span' className='content-item' >Километри: </Typography>{kilometers}
                                </Typography>

                                <Typography color="text.secondary">
                                    {description}
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ textAlign: 'left', marginTop: '1em' }}>
                            <Typography color="text.secondary">
                                <Typography component='span' className='content-item'>Създаден на: </Typography>{createdAtFormatted}
                            </Typography>
                        </Box>

                    </CardContent>
                    <CardActions className='action' sx={{ justifyContent: 'flex-end' }}>
                        <Button component={Link} to={`/catalog/vehicles/edit/${_id}`} size="small" variant="outlined" sx={{ marginRight: '10px' }} startIcon={<EditIcon />} >Редактиеай</Button>
                        <Button size="small" variant="contained" startIcon={<DeleteIcon />} color="error" onClick={handleClickOpen}>Изтрий</Button>
                    </CardActions>
                </Box>
            </Card >
        </>
    );
};
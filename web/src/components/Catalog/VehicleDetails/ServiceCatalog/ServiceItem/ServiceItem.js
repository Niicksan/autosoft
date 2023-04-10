import '../../../VehicleItem/VehicleItem.scss';

import { useState } from 'react';

import { Link } from 'react-router-dom';
import { Card, Box, CardContent, Typography, CardActions, Button } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { DeleteModal } from '../../../DeleteModal/DeleteModal';

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
    const message = 'Сигурни ли сте, че искате да изтриете това обслужване?';

    return (
        <>
            {open && (<DeleteModal open={open} title={title} message={message} handleClickOpen={handleClickOpen} handleClose={handleClose} id={_id} />)}
            <Card className='card' sx={{ m: 2, width: '90%', maxWidth: '1920px' }}>
                <Box className='card-content-holder' style={{ width: '99%' }}>
                    <CardContent >
                        <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'left', marginBottom: '0.5em' }} >
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
                    <CardActions className='action' sx={{ m: 1, justifyContent: 'flex-end' }}>
                        <Button component={Link} to={`/catalog/vehicles/edit/${_id}`} size="small" variant="outlined" sx={{ marginRight: '10px' }} startIcon={<EditIcon />} >Редактиеай</Button>
                        <Button size="small" variant="contained" startIcon={<DeleteIcon />} color="error" onClick={handleClickOpen}>Изтрий</Button>
                    </CardActions>
                </Box>
            </Card >
        </>
    );
};
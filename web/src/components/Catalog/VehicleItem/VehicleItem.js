import './VehicleItem.scss';

import { Link } from 'react-router-dom';
import { Card, Box, CardContent, Typography, CardMedia, CardActions, Button } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const VehicleItem = ({
    _id,
    vinNumber,
    brand,
    model,
    engine,
    fuel,
    yearOfManufacture,
    imageUrl
}) => {
    return (
        <Card className='card' sx={{ m: 4 }}>
            <CardMedia component={Link} to={`/catalog/vehicles/${_id}`}
                sx={{ maxWidth: '30%', flex: 1, objectFit: 'cover' }}
                className='image'
                image={imageUrl}
                title="green iguana"
            />
            <Box className='card-content-holder' >
                <CardContent >
                    <Typography gutterBottom variant="h5" component="div">
                        {brand} {model} {engine}
                    </Typography>

                    <Typography variant="body2" className='content-items-holder' >
                        <Typography component='p' className='content-items-left' >
                            <Typography component='p' color="text.secondary" >
                                <Typography component='span' className='content-iten' >Вин номер: </Typography>{vinNumber}
                            </Typography>

                            <Typography component='p' color="text.secondary">
                                <Typography component='span' className='content-iten'>Марка: </Typography>{brand}
                            </Typography>

                            <Typography component='p' color="text.secondary">
                                <Typography component='span' className='content-iten'>Модел: </Typography>{model}
                            </Typography>
                        </Typography>

                        <Typography className='content-items-left' >
                            <Typography component='p' color="text.secondary">
                                <Typography component='span' className='content-iten'>Двигател: </Typography>{engine}
                            </Typography>

                            <Typography component='p' color="text.secondary">
                                <Typography component='span' className='content-iten'>Гориво: </Typography>{fuel}
                            </Typography>

                            <Typography component='p' color="text.secondary">
                                <Typography component='span' className='content-iten'>Година: </Typography>{yearOfManufacture}
                            </Typography>
                        </Typography>
                    </Typography>
                </CardContent>
                <CardActions className='action' sx={{ justifyContent: 'flex-end' }}>
                    <Button component={Link} to={`/catalog/vehicles/${_id}`} variant="outlined" size="small" sx={{ marginRight: '10px' }}>Детайли</Button>
                    <Button size="small" variant="outlined" startIcon={<EditIcon />} >Редактиеай</Button>
                    <Button size="small" variant="outlined" startIcon={<DeleteIcon />} color="error" >Изтрий</Button>
                </CardActions>
            </Box>
        </Card >
    );
};
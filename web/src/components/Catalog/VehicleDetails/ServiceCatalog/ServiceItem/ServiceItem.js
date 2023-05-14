import '../../../VehicleItem/VehicleItem.scss';

import { Card, Box, CardContent, Typography, CardActions, Button } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { DeleteModal } from '../../../DeleteModal/DeleteModal';
import { EditServiceModal } from '../../EditServiceModal/EditServiceModal';

import { useServiceContext } from '../../../../../contexts/ServiceContext';

import { useModal } from '../../../../../hooks/useModal';

export const ServiceItem = ({
    _id,
    title,
    kilometers,
    description,
    vehicleId,
    createdAt
}) => {
    const { onDeleteServiceSubmit } = useServiceContext();
    const {
        openEditModal,
        openDeleteModal,
        handleClickOpenEditModal,
        handleClickCloseEditModal,
        handleClickOpenDeleteModal,
        handleClickCloseDeleteModal
    } = useModal();


    const date = new Date(createdAt);
    const createdAtFormatted = date.toLocaleDateString('Bg-bg', { year: 'numeric', month: 'long', day: 'numeric' });
    const message = 'Сигурни ли сте, че искате да изтриете това обслужване?';

    return (
        <>
            {openEditModal && (<EditServiceModal open={openEditModal} handleClose={handleClickCloseEditModal} vehicleId={vehicleId} serviceId={_id} />)}
            {openDeleteModal && (<DeleteModal
                open={openDeleteModal}
                title={title}
                message={message}
                handleClose={handleClickCloseDeleteModal}
                onDeleteSubmit={onDeleteServiceSubmit}
                vehicleId={vehicleId}
                serviceId={_id}
            />)}

            <Card className='card' sx={{ m: 2, width: '80%', maxWidth: '1920px' }}>
                <Box className='card-content-holder card-content-holder-service' style={{ width: '99%' }}>
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
                        <Button size="small" variant="outlined" sx={{ marginRight: '10px' }} onClick={handleClickOpenEditModal} startIcon={<EditIcon />} >Редактирай</Button>
                        <Button size="small" variant="contained" startIcon={<DeleteIcon />} color="error" onClick={handleClickOpenDeleteModal}>Изтрий</Button>
                    </CardActions>
                </Box>
            </Card >
        </>
    );
};
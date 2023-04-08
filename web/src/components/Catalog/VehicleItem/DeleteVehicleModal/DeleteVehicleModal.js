import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { useVehicleContext } from "../../../../contexts/vehicleContext";

export const DeleteVehicleModal = ({
    id,
    open,
    vehicleTitle,
    handleClose
}) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { onDeleteVehicleSubmit } = useVehicleContext();

    console.log(id);
    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Сигурни ли сте, че искате да изтриете автомобил {vehicleTitle}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant={"outlined"} autoFocus onClick={handleClose}>
                        Назад
                    </Button>
                    <Button variant="contained" color={'error'} startIcon={<DeleteIcon />}
                        onClick={(e) => {
                            handleClose();
                            onDeleteVehicleSubmit(id);
                        }}>
                        Да
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

export const DeleteModal = ({
    id,
    open,
    title,
    message,
    onDeleteVehicleSubmit,
    handleClose
}) => {
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {message}
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
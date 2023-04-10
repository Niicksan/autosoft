import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import { Loader } from "../../Loader/Loader";
import { VehicleItem } from "../VehicleItem/VehicleItem";
import { ServiceCatalog } from "./ServiceCatalog/ServiceCatalog";
import { CreateServiceModal } from './CreateServiceModal/CreateServiceModal'

import { useVehicleContext } from "../../../contexts/vehicleContext";

export const VehicleDetails = () => {
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const [vehicle, setVehicle] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { getVehicleById } = useVehicleContext();

    useEffect(() => {
        setIsLoading(true);
        getVehicleById(id)
            .then((vehicleData) => {
                setVehicle(vehicleData);
                setIsLoading(false);
            })
    }, [id]);

    const handleClickOpenCreateModal = () => {
        setOpen(true);
    };

    const handleCloseCreateModal = () => {
        setOpen(false);
    };

    const date = new Date(vehicle?.createdAt);
    const createdAtFormatted = date.toLocaleDateString('Bg-bg', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <>
            {isLoading && (<Loader />)}
            {!isLoading && (<Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Typography gutterBottom variant="h3" component="div" sx={{ color: '#550A21', marginTop: '1em' }}>
                    {vehicle?.brand} {vehicle?.model} {vehicle?.engine}
                </Typography>

                <VehicleItem key={vehicle?._id} {...vehicle} createdAtFormatted={createdAtFormatted} handleClickOpenCreateModal={handleClickOpenCreateModal} isDetails={true} />

                {open && (<CreateServiceModal open={open} handleClose={handleCloseCreateModal} />)}

                <ServiceCatalog services={vehicle?.doneServices} />
            </Box>)
            }
        </>
    );
};
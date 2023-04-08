import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import { VehicleItem } from "../VehicleItem/VehicleItem";

import { useVehicleContext } from '../../../contexts/vehicleContext';

export const VehicleDetails = () => {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState({});
    const { getVehicleById } = useVehicleContext();

    useEffect(() => {
        getVehicleById(id)
            .then(result => {
                setVehicle(result);
            })
    }, [id]);

    const date = new Date(vehicle?.createdAt);
    const createdAtFormatted = date.toLocaleDateString('Bg-bg', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <Typography gutterBottom variant="h3" component="div" sx={{ color: '#550A21' }}>
                {vehicle?.brand} {vehicle?.model} {vehicle?.engine}
            </Typography>
            <VehicleItem key={vehicle?._id} {...vehicle} createdAtFormatted={createdAtFormatted} isDetails={true} />
        </Box>
    );
};
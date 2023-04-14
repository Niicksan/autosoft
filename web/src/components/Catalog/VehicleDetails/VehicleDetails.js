import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import { Loader } from "../../Loader/Loader";
import { VehicleItem } from "../VehicleItem/VehicleItem";
import { ServiceCatalog } from "./ServiceCatalog/ServiceCatalog";

import { useVehicleContext } from "../../../contexts/VehicleContext";

export const VehicleDetails = () => {
    const { id } = useParams();
    const { vehicle, setVehicle, getVehicleById } = useVehicleContext();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getVehicleById(id)
            .then((vehicleData) => {
                setVehicle(vehicleData);
                setIsLoading(false);
            })
    }, [id]);

    const date = new Date(vehicle?.createdAt);
    const createdAtFormatted = date.toLocaleDateString('Bg-bg', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <>
            {isLoading && (<Loader />)}
            {!isLoading && (<Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Typography gutterBottom variant="h3" component="div" sx={{ color: '#550A21', marginTop: '1em' }}>
                    {vehicle?.brand} {vehicle?.model} {vehicle?.engine}
                </Typography>

                <VehicleItem key={vehicle?._id} {...vehicle} createdAtFormatted={createdAtFormatted} isDetails={true} />

                <ServiceCatalog services={vehicle?.doneServices} />
            </Box>)
            }
        </>
    );
};
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import { VehicleItem } from "../VehicleItem/VehicleItem";
import { ServiceCatalog } from "./ServiceCatalog/ServiceCatalog";
import { SnackbarModal } from "../../SnackbarModal/SnackbarModal";
import { Loader } from "../../Loader/Loader";

import { useVehicleContext } from "../../../contexts/VehicleContext";
import { useSnackbar } from "../../../hooks/useSnackbar";

export const VehicleDetails = () => {
    const { id } = useParams();
    const { vehicle, setVehicle, getVehicleByIdWithServices } = useVehicleContext();
    const [isLoading, setIsLoading] = useState(false);
    const { openSnackbar, isSnackbarOpen } = useSnackbar();

    useEffect(() => {
        setIsLoading(true);
        getVehicleByIdWithServices(id)
            .then((vehicleData) => {
                setVehicle(vehicleData);
                setIsLoading(false);
            })
    }, [id]);

    useEffect(() => {
        isSnackbarOpen();
    }, [openSnackbar]);

    const date = new Date(vehicle?.createdAt);
    const createdAtFormatted = date.toLocaleDateString('Bg-bg', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <>
            {isLoading && (<Loader />)}
            {!isLoading && (<Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Typography gutterBottom variant="h3" component="div" sx={{ width: '80%', color: '#550A21', marginTop: '1em' }}>
                    {vehicle?.make} {vehicle?.model} {vehicle?.engine}
                </Typography>

                <VehicleItem key={vehicle?._id} {...vehicle} createdAtFormatted={createdAtFormatted} isDetails={true} />

                <ServiceCatalog services={vehicle?.doneServices} />
                {openSnackbar ? <SnackbarModal /> : null}
            </Box>)
            }
        </>
    );
};
import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from './AuthContext';
import { vehicleServiceFactory } from '../services/vehicleService';

export const VehicleContext = createContext();

export const VehicleProvider = ({
    children,
}) => {
    const navigate = useNavigate();

    const { userId } = useAuthContext();

    const [vehicles, setVehicles] = useState([]);
    const vehicleService = vehicleServiceFactory();
    const [error, setError] = useState({
        vinNumber: true,
        brand: true,
        model: true,
        engine: true,
        fuel: true,
        yearOfManufacture: true,
        imageUrl: true,
    });

    useEffect(() => {
        vehicleService.getAllVehicles(userId)
            .then(result => {
                setVehicles(result);
            })
    }, [userId]);

    const getVehicleById = (vehicleId) => {
        return vehicles.find(vehicle => vehicle._id === vehicleId);
    };

    const onCreateVehicleSubmit = async (data) => {
        const newVehicle = await vehicleService.createVehicle(data);

        setVehicles(state => [...state, newVehicle]);

        navigate('/catalog/vehicles');
    };

    const onEditVehicleSubmit = async (vehicleValues) => {
        const result = await vehicleService.editVehicle(vehicleValues._id, vehicleValues);

        setVehicles(state => state.map(x => x._id === vehicleValues._id ? result : x))

        navigate(`/catalog/${vehicleValues._id}`);
    };

    const onDeleteVehicleSubmit = (vehicleId) => {
        setVehicles(state => state.filter(vehicle => vehicle._id !== vehicleId));
    };

    const contextValues = {
        vehicles,
        error,
        setError,
        getVehicleById,
        onCreateVehicleSubmit,
        onEditVehicleSubmit,
        onDeleteVehicleSubmit,
    };

    return (
        <VehicleContext.Provider value={contextValues}>
            {children}
        </VehicleContext.Provider>
    );
};

export const useVehicleContext = () => {
    const context = useContext(VehicleContext);

    return context;
};
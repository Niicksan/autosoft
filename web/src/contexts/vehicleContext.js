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

    const getVehicleById = async (vehicleId) => {
        try {
            const vehicle = await vehicleService.getVehicleById(vehicleId);

            return vehicle;

        } catch (err) {
            console.log(err);
            console.log('There is a problem', err);
        }

    };

    const onCreateVehicleSubmit = async (data) => {
        const newVehicle = await vehicleService.createVehicle(data);

        setVehicles(state => [...state, newVehicle]);

        navigate('/catalog/vehicles');
    };

    const onEditVehicleSubmit = async (vehicleValues) => {
        const { id, ...data } = vehicleValues;

        const result = await vehicleService.editVehicle(id, data);
        setVehicles(state => state.map(x => x._id === id ? result : x))

        navigate('/catalog/vehicles');
    };

    const onDeleteVehicleSubmit = async (vehicleId) => {
        const newVehicle = await vehicleService.deleteVehicle(vehicleId);
        console.log(newVehicle);
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
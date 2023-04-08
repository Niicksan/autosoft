import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { repairsServiceFactory } from '../services/repairsService';

export const ServiceContext = createContext();

export const ServiceProvider = ({
    children,
}) => {
    const navigate = useNavigate();

    const repairService = repairsServiceFactory();
    const [error, setError] = useState({
        title: true,
        kilometers: true,
        description: true
    });

    const getAllServices = async (vehicleId) => {
        try {
            const service = await repairService.getAllServices(vehicleId);
            console.log(service);
            return service;

        } catch (err) {
            if (err.messageEn === "Item doesn't exist") {
                console.log(err);
                navigate('/404');
            } else if (err.messageEn === "Access denied! You don't have rights to access this page!") {
                console.log(err);
                navigate('/403');
            }
        }
    };

    // useEffect(() => {
    //     vehicleService.getAllVehicles(userId)
    //         .then(result => {
    //             setVehicles(result);
    //         })
    // }, [userId]);

    // const getVehicleById = async (vehicleId) => {
    //     try {
    //         const vehicle = await vehicleService.getVehicleById(vehicleId);

    //         return vehicle;

    //     } catch (err) {
    //         if (err.messageEn === "Item doesn't exist") {
    //             console.log(err);
    //             navigate('/404');
    //         } else if (err.messageEn === "Access denied! You don't have rights to access this page!") {
    //             console.log(err);
    //             navigate('/403');
    //         }
    //     }
    // };

    // const onCreateVehicleSubmit = async (data) => {
    //     try {
    //         const newVehicle = await vehicleService.createVehicle(data);

    //         if (newVehicle.message) {
    //             setError({ ...error, isVinNumberExist: newVehicle.message });
    //         }

    //         setVehicles(state => [...state, newVehicle]);
    //         navigate('/catalog/vehicles');
    //     } catch (err) {
    //         setError({ ...error, isVinNumberExist: err?.message });

    //         if (err.messageEn === "Access denied! You don't have rights to access this page!") {
    //             console.log(err);
    //             navigate('/403');
    //         }
    //     }

    //     setTimeout(() => {
    //         setError({ ...error, isVinNumberExist: '' });
    //     }, 5000);
    // };

    // const onEditVehicleSubmit = async (vehicleValues) => {
    //     try {
    //         const { id, ...data } = vehicleValues;
    //         const result = await vehicleService.editVehicle(id, data);

    //         if (result.message) {
    //             setError({ ...error, isVinNumberExist: result.message });
    //         }

    //         setVehicles(state => state.map(x => x._id === id ? result : x))
    //         navigate('/catalog/vehicles');
    //     } catch (err) {
    //         setError({ ...error, isVinNumberExist: err?.message });

    //         if (err.messageEn === "Access denied! You don't have rights to access this page!") {
    //             console.log(err);
    //             navigate('/403');
    //         }
    //     }

    //     setTimeout(() => {
    //         setError({ ...error, isVinNumberExist: '' });
    //     }, 5000);
    // };

    // const onDeleteVehicleSubmit = async (vehicleId) => {
    //     try {
    //         await vehicleService.deleteVehicle(vehicleId);
    //         setVehicles(state => state.filter(vehicle => vehicle._id !== vehicleId));
    //     } catch (err) {
    //         if (err.messageEn === "Access denied! You don't have rights to access this page!") {
    //             console.log(err);
    //             navigate('/403');
    //         }
    //     }
    // };

    const contextValues = {
        getAllServices
    };

    return (
        <ServiceContext.Provider value={contextValues}>
            {children}
        </ServiceContext.Provider>
    );
};

export const useServiceContext = () => {
    const context = useContext(ServiceContext);

    return context;
};
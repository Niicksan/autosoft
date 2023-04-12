import './Catalog.scss';

import { Link } from 'react-router-dom';

import { Box } from '@mui/system';

import { useVehicleContext } from "../../contexts/VehicleContext";

import { VehicleItem } from './VehicleItem/VehicleItem';

export const Catalog = () => {
    const { vehicles } = useVehicleContext();

    return (
        <section style={{ minHeight: '60vh' }} id="catalog-page">
            <h1 style={{ color: '#550A21' }}>Каталог с aвтомобили</h1>

            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                {vehicles.length !== 0 && (vehicles.map(x =>
                    <VehicleItem key={x._id} {...x} />
                ))}
            </Box>
            {vehicles.length === 0 && (
                <>
                    <h3 className="no-articles">Все още няма добавени автомобили</h3>
                    <Link to="/vehicle/create" className="add">
                        Добави
                    </Link>
                </>
            )}
        </section>
    );
};
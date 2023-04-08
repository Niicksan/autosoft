
import { Box } from '@mui/system';

import { ServiceItem } from './ServiceItem/ServiceItem';

export const ServiceCatalog = ({ services }) => {
    console.log(services);

    return (
        <Box sx={{ width: '70%' }} id="catalog-page">
            <h1>Сервизна история</h1>

            <Box sx={{ maxWidth: '60%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                {services.length !== 0 && (services.map(x =>
                    <ServiceItem key={x._id} {...x} sx={{ maxWidth: '70%' }} />
                ))}
            </Box>

            {services?.length === 0 && (
                <>
                    <h3 className="no-articles">Няма налична сервизна история</h3>
                </>
            )}
        </Box>
    );
};
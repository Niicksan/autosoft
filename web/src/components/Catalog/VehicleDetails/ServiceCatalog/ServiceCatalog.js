import { Box } from '@mui/system';

import { ServiceItem } from './ServiceItem/ServiceItem';

export const ServiceCatalog = ({ services }) => {
    return (
        <Box id="catalog-page" sx={{ width: '90%' }}>
            <h1>Сервизна история</h1>

            <Box sx={{ width: '100%', maxWidth: '1920px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                {services?.length !== 0 && (services?.map(x =>
                    <ServiceItem key={x._id} {...x} />
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
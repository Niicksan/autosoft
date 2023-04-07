const routes = {
    '/': 'AutoSoft',
    '/catalog/vehicles': 'Каталог автомобили',
    '/vehicle/create': 'Добавяне на автомобил',
    '/user/my-profile': 'Моят проявил',
    '/auth/login': 'Вход',
    '/auth/register': 'Регистрация',
    '/auth/logout': 'Изход',
    '/about': 'За нас',
    '/contacts': 'Свържете се с нас',
    "/403": '403 Нямате право да достъпите тази страница',
    "/404": '404 Страницата не беше намерена',

};

export const seTabTitle = (pathname) => {
    if (pathname === '/') {
        document.title = routes[pathname];
    } else {
        document.title = `${routes['/']} - ${routes[pathname]}`;
    }
};
import './App.css';

import { Routes, Route } from 'react-router-dom';

import { Box, Toolbar } from '@mui/material';

import { AuthProvider } from './contexts/AuthContext';

import { NavigationBar } from './components/NavigationBar/NavigationBar';
import { Home } from './components/Home/Home';
import { Catalog } from './components/Catalog/Catalog';
import { CreateVehicle } from './components/Vehicle/CreateVehicle/CreateVehicle';
import { MyProfile } from './components/MyProfile/MyProfile';
import { Logout } from './components/Logout/Logout';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { About } from './components/About/About';
import { Contacts } from './components/Contacts/Contacts';
import { Forbidden } from './components/Error/Forbidden/Forbidden';
import { NotFound } from './components/Error/NotFound/NotFound';
import { Footer } from './components/Footer/Footer';

function App() {
    return (
        <AuthProvider >
            <div className="app">
                <NavigationBar />
                <Box component="main" className="main">
                    <Toolbar />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/catalog/vehicles' element={<Catalog />} />
                        <Route path='/vehicle/create' element={<CreateVehicle />} />
                        <Route path='/user/my-profile' element={<MyProfile />} />
                        <Route path='/auth/logout' element={<Logout />} />
                        <Route path='/auth/login' element={<Login />} />
                        <Route path='/auth/register' element={<Register />} />
                        <Route path='/about' element={<About />} />
                        <Route path='/contacts' element={<Contacts />} />
                        <Route path="/403" element={<Forbidden />} />
                        <Route path="/404" element={<NotFound />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Toolbar />
                </Box>

                <Footer />
            </div>
        </AuthProvider >
    );
}

export default App;
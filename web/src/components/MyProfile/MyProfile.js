import './MyProfile.scss';

import { useEffect } from 'react';

import { imageApi } from '../../env'

import { userServiceFactory } from '../../services/userService';
import { useAuthContext } from '../../contexts/AuthContext';

export const MyProfile = () => {
    const { profileData, setProfileData } = useAuthContext();
    const userService = userServiceFactory();
    console.log(imageApi);
    console.log(process.env.apiUrl);
    console.log(process.env.imageAp);
    useEffect(() => {
        if (!profileData?._id) {
            userService.getUserInfo()
                .then(result => {
                    setProfileData(result);
                })
        }
    }, [profileData?._id]);

    const date = new Date(profileData?.createdAt);
    const createdAt = date.toLocaleDateString('Bg-bg', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <main className="profile">
            <div className="grid-header">
                <h1>Моят профил</h1>
            </div>
            <div className="my-profile">
                <div className="image-holder">
                    <img src={`${imageApi}/users/${profileData?.imageUrl}`} alt="" />
                </div>
                <div className="user-info">
                    <div className="key-value">
                        <p className="left">Име: </p>
                        <p className="right">{profileData?.companyName}</p>
                    </div>
                    <div className="key-value">
                        <p className="left">Имейл: </p>
                        <p className="right">{profileData?.email}</p>
                    </div>
                    <div className="key-value">
                        <p className="left">Създаден на: </p>
                        <p className="right">{createdAt}</p>
                    </div>
                </div>
            </div>
        </main>
    );
};
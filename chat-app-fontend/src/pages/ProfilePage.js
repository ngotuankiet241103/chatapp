import axios from 'axios';
import DetailsTutos from 'components/user/DetailsTutos';
import { useDarkModeContext } from 'contexts/DarkModeContext';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams} from 'react-router-dom';

const ProfilePage = () => {
    const { userId } = useParams();
    const [tutor, setTutor] = useState("")
    const {isDarkMode} = useDarkModeContext()
    const getProfileUser = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user-profile/${userId}`)
            if (response.status === 200) {
                const { data } = response.data
                setTutor(data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getProfileUser();
    }, [])
    console.log(tutor);
    return (
        <div className={`h-[100vh] ${isDarkMode ? 'bg-dark-second' : ''} py-4`}>
            <div className='flex justify-end w-[1400px] mx-auto'>
                <button className='px-4 py-2 bg-primary rounded-lg text-sub'>
                    <NavLink to={`/user/profile/edit/${userId}`}>Chỉnh sửa</NavLink>
                </button>
            </div>
            {tutor && <DetailsTutos user={tutor}></DetailsTutos>}
        </div>
    );
};

export default ProfilePage;
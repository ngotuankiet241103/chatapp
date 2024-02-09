import React, { useState } from 'react';
import avatarMan from '../../assets/avatarMan.jpeg'
import Button from 'components/Button/Button';
import InputDate from 'components/Input/InputDate';
import { useSelector } from 'react-redux';
import axios from 'axios';
import InputEdit from './InputEdit';
import requestApi from 'components/helper/api';
import { showToast } from 'components/helper/toast';
import { ToastContainer } from 'react-toastify';
const InfoUser = () => {
    const info = useSelector(state => state.user.info)
    const [user, setUser] = useState({})
    const [isEdit, setEdit] = useState(false)
    const [image, setImage] = useState("")
    const handleEdit = () => {
        setEdit(!isEdit)
    }
    const handleUpdate = async () => {
        try {
            const root = document.querySelector('.user-info')
            const inputs = root.querySelectorAll('.info')

            const newUser = Array.from(inputs).reduce((state,input) => {
                const name = input.name
                return !input.value ? {...state} : { ...state, [`${name}`]: input.value };
            },{...info, ...user}
            )
            console.log(newUser);
            setUser(user)
            // call api update user
            requestApi(`/user/${info.id}`, "PUT", newUser)
            showToast("Update profile success", "success", 1000)
            setEdit(false)

        } catch (error) {

        }
        // get data when update



    }
    // push image to cloud
    const handleChooseImage = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/file/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            setImage(response.data.data)
            document.querySelector('input[name="avatar"]').value = response.data.data
        } catch (error) {
            console.log(error);
        }
    }
    const handleCloseToast = () => {
        window.location.reload()
    }
    return (
        <>

            <div className='py-4 user-info max-sm:px-2'>
                <div className='md:w-[800px] md:mx-auto bg-[#f2f2f2] rounded-lg max-sm:p-3 md:px-10 md:py-8 '>
                    <div className='flex justify-end gap-4'>
                        {!isEdit ? <Button onClick={handleEdit}>Edit</Button> : <>
                            <Button className='bg-gray-400' onClick={handleEdit}>Cancel</Button>
                            <Button onClick={handleUpdate}>Update</Button>
                        </>}

                    </div>
                    <div className='flex items-center gap-4 max-sm:flex-col max-sm:justify-center'>
                        <div className='avatar w-[200px]'>
                            {
                                !isEdit ?
                                    <img src={info.avatar || avatarMan} className='rounded-full w-full object-cover'></img> :
                                    <>
                                        <img src={image || info.avatar || avatarMan} className='rounded-full w-full object-cover'></img>
                                        <input type='file' onChange={handleChooseImage}></input>
                                        <input name='avatar' type='hidden' className='info'></input>
                                    </>
                            }

                        </div>
                        <div className='px-4'>
                            {
                                isEdit ?
                                    <>
                                        <InputEdit defaultValue={info.fullName} name={"fullName"} className='info mb-2'></InputEdit>
                                    </>
                                    :
                                    <h3 className='text-[18px] mb-2 fullName'>
                                        <span>Họ tên: </span>
                                        <span>{info.fullName}</span>
                                    </h3>
                            }

                            <div className='text-[18px] mb-2'>
                                <p>
                                    Giới Tính:
                                    {
                                        isEdit ?
                                            <InputEdit defaultValue={info.gender} name={"gender"} className='info mb-2'></InputEdit> :
                                            <span className='gender'> {info.gender}</span>
                                    }

                                </p>
                                <div >
                                    <span> Ngày sinh: </span>
                                    {
                                        isEdit ?
                                            <>
                                                <InputDate dated={info.date} className='info' name={"date"}></InputDate>
                                            </> :
                                            <span className='date'>{info.date}</span>
                                    }

                                </div>
                            </div>
                            <p className='text-[18px] mb-2'>
                                email:
                                <span className='emails'> {info.emails}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer onClose={handleCloseToast}/>
        </>
    );
};

export default InfoUser;
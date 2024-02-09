import React, { useState } from 'react';
import FormBase from './FormBase';
import FormHeader from './FormHeader';
import Label from './Label';
import Input from './Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import logo from '../../assets/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import loginThunk from 'components/redux/redux-thunk/loginThunk';
import ErrorMessage from './ErrorMessage';
import { NavLink, useNavigate } from 'react-router-dom';
import { stomp } from 'config/socket';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import useSocketHook from 'hooks/useSocketHook';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { showToast } from 'components/helper/toast';

const schema = yup
    .object({
        emails: yup.string().required("Field is required"),
        password: yup.string().required("Field is required").min(6, "Password requried 6 character or than")
    })
const FormLogin = () => {
    const dispatch = useDispatch();
    const nevigate = useNavigate();
    const [isSubmitting, setSubmitting] = useState(false);
    const { control, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (values) => {
        if (isValid) {
            try {
                setSubmitting(true)
                await dispatch(loginThunk(values));
                showToast("Login success","success",500)
                
               
            } catch (error) {
                console.log(error);
                showToast("Login failed","error")
            }
            finally {
                setSubmitting(false)
                
                
               

            }
        }

    }
    const handleCloseToast = () => {
        nevigate("/home")
    }
    return (
        <>

        <FormBase>
            <FormHeader image={logo} title="LOGIN" ></FormHeader>
            <form onSubmit={handleSubmit(onSubmit)} className='md:w-[500px]   mx-auto flex flex-col justify-centerr'>

                <div className='mb-4'>
                    <Label name='emails' className="mb-2 block">Email Address</Label>
                    <Input isCustom name="emails" control={control} placeholder="Enter your emails" type="email"></Input>
                    {errors.emails && <ErrorMessage message={errors.emails.message}></ErrorMessage>}
                </div>
                <div className='mb-4'>
                    <Label name='password' className="mb-2 block">Password</Label>
                    <Input isCustom name="password" control={control} placeholder="Enter your password " type="password"></Input>
                    {errors.password && <ErrorMessage message={errors.password.message}></ErrorMessage>}
                </div>
                <div className='flex justify-end'>
                    <span className='text-blue-400 underline'>
                        <NavLink to={"/register"}>Register account?</NavLink>
                    </span>
                </div>
                <button className='bg-primary rounded-lg w-[180px] h-[40px] text-white mx-auto '>
                    {isSubmitting ? 'Loading...' : 'Login'}
                </button>
            </form>
                
           
        </FormBase>
            <ToastContainer onClose={handleCloseToast} />
        </>
    );
};

export default FormLogin;
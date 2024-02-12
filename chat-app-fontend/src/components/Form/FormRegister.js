import React, { useEffect, useState } from 'react';
import Label from './Label';
import Input from './Input';
import { useForm } from 'react-hook-form';
import FormHeader from './FormHeader';
import FormBase from './FormBase';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import ErrorMessage from './ErrorMessage';
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import ConfirmEmail from './ConfirmEmail';
import { useDispatch } from 'react-redux';
import registerThunk from 'components/redux/redux-thunk/registerThunk';
import InputRadio from 'components/Input/InputRadio';
import InputDate from 'components/Input/InputDate';
import unidecode from 'unidecode';
import axios from 'axios';
import AddressList from './AddressList';
import { showToast } from 'components/helper/toast';
import { ToastContainer } from 'react-toastify';

const schema = yup
    .object({
        fullName: yup.string().required("Field is required"),
        emails: yup.string().required("Field is required"),
        password: yup.string().required("Field is required").min(6, "Password requried 6 character or than"),
        role: yup.string().required("Field is required"),
        gender: yup.string().required("Field is required")
    })
const FormRegister = () => {
    const dispatch = useDispatch();
    const nevigate = useNavigate();
    const [provinces, setProvinces] = useState([])
    const [localIsSubmitting, setLocalIsSubmitting] = useState(false);
    const { control, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm({
        resolver: yupResolver(schema),
    })
    const [address, setAddress] = useState("");
    const [error, setError] = useState("")
    const onSubmit = async (values, a) => {
        const form = document.querySelector('.form-register')
        if (!address) {
            setError("Please choose address")
            return;

        }
        
        if (isValid) {
            const date = form.querySelector('input[name="date"]').value || "24/11/2003"
            console.log(date);
            values = {
                ...values,
                avatar: "",
                date,
                address
            }
            console.log(values);
            try {
                setLocalIsSubmitting(true);
                await dispatch(registerThunk(values));
                showToast("Register success","success")
                
            } catch (error) {
                console.error("Error:", error);
                showToast("Register failed","error")
            } finally {
                
               
                
            }

        }

    }
    const chooseAddress = (value) => {
        setAddress(value)
    }
    

    const findAddress = (value) => {
        const data = provinces.filter(province => compareStr(province.province_name,value))
       setProvinces(data)
    }
    useEffect(() => {
        async function getProvinces() {
            try {
                const reseponse = await axios.get(`https://vapi.vnappmob.com/api/province`)
                console.log(reseponse);
                setProvinces(reseponse.data.results)
            } catch (error) {
                console.log(error);
            }
        }
        getProvinces()
    }, [])
    const handleCloseToast = () => {
        setLocalIsSubmitting(false);
       

    };
    return (
        <>

        <FormBase>
            <FormHeader image={logo} title="TSC"></FormHeader>
            {!localIsSubmitting &&
                <form onSubmit={handleSubmit(onSubmit)} className='w-[500px] mx-auto flex flex-col justify-centerr form-register'>

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
                    <div className='mb-4'>
                        <Label name='fullName' className="mb-2 block">Full Name</Label>
                        <Input isCustom name="fullName" control={control} placeholder="Enter your full name" type="text"></Input>
                        {errors.fullName && <ErrorMessage message={errors.fullName.message}></ErrorMessage>}
                    </div>
                    <div className='mb-4 '>
                        <Label className="mb-2 block">Gender </Label>
                        <div className='flex gap-4 items-center'>
                            <InputRadio name="gender" control={control} value="male" label="Male"></InputRadio>
                            <InputRadio name="gender" control={control} value="female" label="Female"></InputRadio>
                            {errors.gender && <span className="text-[12px] text-red-500" >{errors.gender.message}</span>}
                        </div>
                    </div>
                    <div className='mb-4'>
                        <Label name='fullName' className="mb-2 block">Full Name</Label>
                        <InputDate name={"date"} isCustom={true}></InputDate>
                        {errors.fullName && <ErrorMessage message={errors.fullName.message}></ErrorMessage>}
                    </div>
                    <div className='mb-4 '>
                        <Label className="mb-2 block">Are you: </Label>
                        <div className='flex gap-4 items-center'>
                            <InputRadio name="role" control={control} value="TUTOR" label="Tutor"></InputRadio>
                            <InputRadio name="role" control={control} value="USER" label="Student/Parent"></InputRadio>
                            {errors.role && <span className="text-[12px] text-red-500" >{errors.role.message}</span>}
                        </div>
                    </div>
                    <div className='mb-4'>
                        <Label name='address' className="mb-2 block">Address</Label>
                        {provinces.length > 0 && <AddressList onChange={findAddress} onClick={chooseAddress} label={address || "Address"} provinces={provinces}></AddressList>}
                        {errors && address && <ErrorMessage message={"Please choose address"}></ErrorMessage>}
                    </div>
                    <button className='bg-primary rounded-lg w-[180px] h-[40px] text-white mx-auto '>Sign up</button>
                </form>

            }
            {isSubmitting && <div className='flex justify-center mx-auto w-full'><ConfirmEmail></ConfirmEmail></div>}
        </FormBase>
            <ToastContainer onClose={handleCloseToast}/>
        </>


    );
};
const compareStr = (data,value) => {
    const normalizedStr = unidecode(data); // Use unidecode library
    const result = normalizedStr.toLowerCase().replace(/[^a-z0-9 ]/g, "");
    return result.includes(value.toLowerCase())
}

export default FormRegister;
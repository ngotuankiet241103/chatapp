import React, { useEffect, useState } from 'react';
import PropTypes, { number } from 'prop-types';
import Input from './Input';
import ErrorMessage from './ErrorMessage';
import requestApi from 'components/helper/api';
import { showToast } from 'components/helper/toast';
const  isInputNumber = (input) => {

    return !isNaN(input);
  }
const ConfirmEmail = ({emails}) => {
    console.log("Show");
    const [error,setError] = useState("")
    const [isDisabled,setDisabled] = useState(false)
    const [number,setNumber] = useState("")
    const handleInputCode = (e) => {
        const numbers = e.target.value.split("");
        setNumber(e.target.value)
        if(numbers.length < 6) {
            setError("Required 6 digit")
            return;
        }
        else if(numbers.length === 6){
            setError("")
            const check = numbers.every(isInputNumber);
            
            check ? setDisabled(!isDisabled) : setError("Only fill the number")
        }
        
    }
    console.log(error);
    const hanldeConfirmToken = async () => {
        try {
            const response = await requestApi(`/register/confirm?token=${number}`,"get");
            console.log(response);
            showToast("Confirm success","success")
        } catch (error) {
            showToast(error,"error")
        }
    }
    useEffect(() => {
        if(!isDisabled) return;
        hanldeConfirmToken()
    },[isDisabled])
    return (
        <div className='w-[400px] h-[200px] rounded-lg bg-white px-3 py-4 rounded-lg'>
            <h1 className='font-semibold text-[26px] mb-3'>Verify your email</h1>
            <p className='mb-2 leading-6 font-thin'>
                We sent you a six digit confirmation code to {emails}.
                Please enter it below to confirm your email address
            </p>
            <input maxLength="6" className='bg-[#f1f0ee] outline-none w-full border  focus:bg-transparent focus:border-[#f1f0ee] rounded-lg p-1' 
            placeholder='Enter 6-digit code' onChange={handleInputCode}></input>
            
            {error && <ErrorMessage message={error}></ErrorMessage>}
        </div>
    );
};

export default ConfirmEmail;
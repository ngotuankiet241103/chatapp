import ErrorMessage from 'components/Form/ErrorMessage';
import React, { useEffect, useReducer, useState } from 'react';

const reducer = (state, action) => {
    switch (action.type) {
      case "ONCHANGE":
        console.log(action);
        state[action.payload.type] = action.payload.value
        return state;
      case "UPDATESTATE":
        console.log(action.payload.state);
        state = action.payload.state
        return state;
      default:
        return state;
    }
  };

const InputDate = ({dated = "",isCustom,name,className}) => {
    const [error,setError]= useState("") 
    const [date,dispatch] = useReducer(reducer,{})
    
    const hanleBlurInput = () => {
        const check = Object.keys(date).every(item => date[item].length)
        console.log(check);
        if(!check){
            setError("Field is required")
            return;
        }
        setError("")
        const born = `${date.day}/${date.month}/${date.year}`
        document.querySelector('.date').value = born
    }
    const handleOnChange = (e) => {
        dispatch({type: "ONCHANGE", payload: {
            type: e.target.name,
            value: e.target.value
        }})
    }
    useEffect(() => {
        if(dated){
            const born = dated.split("/")
            const birthDay = {
                day: born[0],
                month: born[1],
                year: born[2]
            }
            console.log(birthDay);
            dispatch({type: 'UPDATESTATE', payload: {
                state: birthDay
            }})
        } 
    },[])
    console.log(date);
    return (
        <>
            <div className={` px-3 py-1 border border-gray-400 rounded-lg flex ${isCustom ? 'bg-gray-300' : 'bg-[#f2f2f2]'} items-center`} onBlur={hanleBlurInput}>
                <input defaultValue={date.day}  name="day" className='w-[40px] bg-transparent outline-none ' onChange={handleOnChange} placeholder='DD' maxLength={2} ></input>
                <div className='w-[2px] mr-2'>/</div>
                <input defaultValue={date.month} name="month" className='w-[40px] bg-transparent outline-none ' onChange={handleOnChange} placeholder='MM' maxLength={2} ></input>
                <div className='w-[2px] mr-2 '>/</div>
                <input defaultValue={date.year}  name="year" className={`w-[60px] bg-transparent outline-none `} onChange={handleOnChange} placeholder='YYYY' maxLength={4} ></input>
            </div>
            <input type='hidden' name={name} className={`${className} ${name}`} defaultValue={dated}></input>
            {error && <ErrorMessage message={error}></ErrorMessage>}
        </>
        
    );
};

export default InputDate;
import React from 'react';

const InputEdit = ({name, defaultValue,className}) => {
    return (
        <input className={`${className} border border-gray-400 rounded-md gender bg-[#f2f2f2] py-1 px-2`} defaultValue={defaultValue} name={name} type='text'/> 
    );
};

export default InputEdit;
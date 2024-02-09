import React from 'react';

const FormHeader = ({image = '../Form/monkey.png',title}) => {
    return (
        <div className='flex flex-col justify-center'>
                <div className=' mb-16 w-full flex justify-center items-center flex-col'>
                    <img srcSet={image} alt='TSC' className='mb-5 mr-[-80px]'/>
                    <h3 className='text-primary text-[22px] font-semibold'>{title}</h3>
                </div>
        </div>
    );
};

export default FormHeader;
import React from 'react';

const FormBase = ({children}) => {
    const isFormLogin = window.location.href.indexOf("login") > 0;
    return (
        <div className={`bg-[#f1f0ee] ${isFormLogin && 'h-[100vh]'}`}>
            <div className='py-10 md:mx-auto md:w-[800px] max-sm:px-4'>
                {children}
            </div>
        </div>
        
    );
};

export default FormBase;
import React from 'react';

const Loading = () => {
    return (
        <div className='h-[100vh] flex justify-center items-center bg-slate-300'>
            <div className='w-[32px] h-[32px] animate-spin rounded-full border-[3px] border-y-transparent border-[rgb(158,166,250)]'>
            </div>
        </div>
    );
};

export default Loading;
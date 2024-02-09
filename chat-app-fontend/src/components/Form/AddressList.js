import React, { useState } from 'react';

const AddressList = ({ provinces, onClick, label = 'Chon tinh thanh', onChange}) => {
   
    
    const [isSelected, setSelected] = useState(false);
    const toggleModal = () => setSelected(!isSelected)
    const chooseAddress = (value) => {
        onClick(value)
        toggleModal()
    }
    const hanldeSearchAddress = (e) => {
        onChange(e.target.value.trim())
    }
    return (
        <div className='w-full relative bg-gray-300 text-gray-400 p-2 rounded-lg'>
            <p className='' onClick={toggleModal}>{label}</p>
            {isSelected &&
                <div className='absolute h-[150px] w-full top-[110%] left-0 py-3 rounded-lg bg-white overflow-y-auto'>
                    <div className='px-3'>
                        <input onChange={hanldeSearchAddress} type='text' placeholder='Search' className='   w-full px-2 py-2 mb-4 border border-gray-400 rounded-lg outline-none ' />
                    </div>

                    {provinces.map(province => <div key={province.id} onClick={() => chooseAddress(province.province_name)} className='px-3 hover:text-white hover:bg-gray-400 transition-all'>{province.province_name}</div>)}

                </div>
            }
        </div>
    );
};

export default AddressList;
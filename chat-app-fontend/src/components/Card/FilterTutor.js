
import AddressList from 'components/Form/AddressList';
import Search from 'layouts/web/Search';
import React from 'react';


const FilterTutor = (props) => {
    const {provinces,findAddress,chooseAddress,address,searchUser} = props
    
    return (
        <div className='flex gap-4 md:justify-end items-center max-sm:mb-4 max-sm:px-2'>
            <div className=''>
                <Search className='w-full max-sm:flex-1 max-sm:py-2 ' placeholder={"Search tutor"} onChange={searchUser}></Search>
            </div>

            <div className='md:w-[300px] max-sm:flex-1'>
                 <AddressList onChange={findAddress} onClick={chooseAddress} label={address || "Address"} provinces={provinces}></AddressList>
            </div>
        </div>
    );
};

export default FilterTutor;
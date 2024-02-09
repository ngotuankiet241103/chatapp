import React from 'react';

const Search = ({placeholder,className,onChange}) => {
    return (
        <div className=''>
            <input type='text' onChange={(e) =>  onChange(e.target.value)} className={`md:w-[300px] md:h-[42px] rounded-lg border border-2 border-primary px-2 outline-none ${className}`}placeholder={placeholder}></input>
        </div>
    );
};

export default Search;
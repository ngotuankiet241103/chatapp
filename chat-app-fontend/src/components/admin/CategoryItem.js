import React from 'react';

const CategoryItem = ({category}) => {
    return (
        <div className='grid grid-cols-6 gap-6 mb-4' key={category.id}>
            <span className="text-center overflow-hidden">{category.id}</span>
            <span className="text-center">{category.name}</span>
            <span className='text-center'>{category.code}</span>
            <button className='bg-primary text-white w-full rounded-lg className="text-center"'>Delete</button>
        </div>
    );
};

export default CategoryItem;
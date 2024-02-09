import React, { useEffect, useState } from 'react';
import CategoryItem from './CategoryItem';
import { getApi } from 'components/helper/api';

const CategoryList = () => {
    const [categories,setCategories] = useState([])
    const getCategories = async () => {
        try {
            const data = await getApi(`/categories`)
            setCategories(data)
        } catch (error) {
            console.log();
        }
    }
    useEffect(() => {
        getCategories()
    },[])
    return (
        <div className='mb-4'>
            <h3 className='text-gray-400 mb-4'>Các danh mục đề xuất</h3>
            <div className='flex items-center flex-wrap gap-4'>
                {categories.length > 0 && categories.map(category => <CategoryItem code={category.code}>{category.name}</CategoryItem>)}
                
            </div>
        </div>
    );
};

export default CategoryList;
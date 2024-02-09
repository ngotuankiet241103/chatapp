import React, { useEffect, useState } from 'react';
import TitleSection from '../web/TitleSection';
import { collection, getDocs } from 'firebase/firestore';
import CategoryItem from './CategoryItem';
import { db } from '../../firebase/config';
import { get } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const ManageCategory = () => {
    const [categories, setCategories] = useState("");
    const redirect = useNavigate()
    const getCategories = async () => {
        const colRef = collection(db,"/categories")
        const snap = await getDocs(colRef)
        const data =  snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        setCategories(data);
    }
    useEffect(() => {
        getCategories()
    },[])
    const handleAddCategory = (e) => {
        redirect("/manage/add-category")
    }
    return (
        <div className='w-[1000px] mx-auto'>
            <div className='flex justify-between'>
                <TitleSection>Manager Category</TitleSection>
                <button className='px-8 py-4 rounded-lg bg-primary text-white' onClick={handleAddCategory}>Add category</button>
            </div>
        
        <div className='grid grid-cols-6 gap-6 mb-4 mt-8'>
            <span className="text-center">id</span>
            <span className="text-center">name</span>
            <span className="text-center">code</span>
            <span className="text-center">action</span>
        </div>
        <div>
            
            {categories.length > 0 && categories.map(category => <CategoryItem category={category}></CategoryItem>)}
            
        </div>
    </div>
    );
};

export default ManageCategory;
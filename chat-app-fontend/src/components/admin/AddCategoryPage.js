import React from 'react';
import Label from '../../components/Form/Label';
import Input from '../../components/Form/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
const schema = yup
  .object({
    name: yup.string().required("Field is required"),
    code: yup.string().required("Field is required")
  })
const AddCategoryPage = () => {
    const {control,handleSubmit,formState : {errors, isValid}} = useForm({
        resolver: yupResolver(schema)
    })
    const onSubmit = (values) => {
        if(isValid){
            const useRef = collection(db,"/categories")
            addDoc(useRef,values)
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-[1000px] mx-auto py-4 '>
            <div className='flex items-center gap-6 mb-4'>
                <div className='field flex-1'>
                    <Label className="text-gray-400 " name="name">Name</Label>
                    <Input name="name" placeholder='Name' control={control} type="text" ></Input> 
                </div>
                <div className='field flex-1'>
                    <Label className="text-gray-400 " name="code">Code</Label>
                    <Input name="code" placeholder='Code' control={control} type="text" ></Input> 
                </div>
                
            </div>
            <button className='bg-primary float-right px-8 py-3 rounded-lg text-white'>Add</button>

        </form>
    );
};

export default AddCategoryPage;
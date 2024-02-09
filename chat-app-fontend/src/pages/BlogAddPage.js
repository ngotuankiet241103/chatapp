import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Input from 'components/Form/Input';
import ErrorMessage from 'components/Form/ErrorMessage';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import requestApi, { getApi } from 'components/helper/api';
import SubjectItem from 'components/user/SubjectItem';
import InputRadio from 'components/Input/InputRadio';
import { showToast } from 'components/helper/toast';
const schema = yup
    .object({
        title: yup.string().required("Field is required"),
        categoryName: yup.string().required("Field is required"),
        
    })

const BlogAddPage = () => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [flag,setFlag] = useState(false)
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [select, setSelect] = useState([])
    const [image, setImage] = useState("")
    const { control, register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
    });
    const inputRef = useRef(null);
    const [submitted,setSubmitted] = useState(false)
    const onSubmit = async (values) => {
        if (isValid) {
            const content = inputRef?.current?.value
            if(!image || select.length <= 0){
                
                return;
            }
            values = {
                ...values,
                content,
                tagsName: select,
                image
            }
           
            try {
                setSubmitting(true)
                console.log(values);
                const response = await requestApi("/blog","POST",values);
                if(response.status === 200){
                    showToast("Create blog success","success")
                }

            } catch (error) {
                console.log(error);
            }
            finally {
                setSubmitting(false)



            }
        }

    }
    const getCategories = async () => {
        try {
            const data = await getApi("/categories")
            setCategories(data)
        } catch (error) {
            console.log(error);
        }
    }
    const getTags = async () => {
        try {
            const data = await getApi("/tags")
            setTags(data);
        } catch (error) {
            console.log(error);
        }
    }
    const hanleClick = (e) => {
        const node = e.target;
        let newArr
        if (node.className.includes('bg-primary')) {
            e.target.classList.remove('bg-primary')
            const index = select.findIndex((val) => val === node.target.innerText.trim());
            console.log(index)
            newArr = select.splice(index, 1)
        }
        else {
            e.target.classList.add('bg-primary')
            newArr = [...select, e.target.innerText.trim()]
        }

        setSelect(newArr)

    }
    const onSelectImage = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/file/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                console.log(response.data.data);
                setImage(response.data.data)

            } catch (error) {
                console.log(error);
            }
        }
    }
    useEffect(() => {
        getCategories()
        getTags();
    }, [])
    const handleNewCategory = (e) => {
        const element = e.target;
        const node = document.querySelector('#other')
        if(node){
            node.value = element.value.trim();
        }
    }
    const handleChangeInput = (e) => {
        setFlag(true);
    }
    const handleChangeSubject = (e) => {
        const subs = e.target.value.split(",")
        setSelect([...select,...subs])
    }
    console.log(errors);
    return (
        <div className='w-[1400px] mx-auto py-4'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full mx-auto flex flex-col justify-centerr'>

                <div className='flex gap-4'>
                    <div className='md:w-[70%]'>
                        <div className='mb-4'>
                            <Input defaultValue={submitted  && ""} name="title" className={"outline-none"} control={control} placeholder="Enter title blog" type="text"></Input>
                            {errors.title && <ErrorMessage message={errors.title.message}></ErrorMessage>}
                        </div>
                        <div className='mb-4'>
                            <CKEditor
                                editor={ClassicEditor}
                                data={submitted ? "" : ""}
                                onReady={editor => {
                                    if (inputRef && inputRef.current) {
                                        inputRef.current.value = editor.getData()
                                    }
                                }}
                                onChange={(event, editor) => {
                                    if (inputRef && inputRef.current) {
                                        inputRef.current.value = editor.getData()
                                    }
                                }}
                            />
                            <input ref={inputRef} className='' type='hidden' name='content'></input>
                        </div>

                    </div>
                    <div className='md:flex-1'>
                        <div className='flex mb-4 items-center'>
                            <div className=''>
                                <div className='font-semibold'>Danh mục:</div>
                                <div className='flex gap-4 items-center'>
                                {categories && categories.length > 0 && categories.map(category => <InputRadio  name="categoryName" control={control} onClick={() => setFlag(false)} value={category?.name} label={category?.name}></InputRadio>)}
                                <div className='flex gap-2 items-center other-category'>
                                    <input  type='radio' name='categoryName' id='other' onClick={handleChangeInput} ></input>
                                    <label htmlFor='other'>Other</label>
                                    <input {...register("categoryName")} className={`border rounded-md  border-gray-400 outline-none px-2 py-1 ${flag ? "block" : "hidden"}`} type='text'
                                         placeholder='Enter your category' onChange={handleNewCategory} ></input>
                                </div>
                                {errors.categoryName && <ErrorMessage message={errors.categoryName.message}></ErrorMessage>}
                                </div>

                            </div>
                        </div>
                        <div className='mb-4'>
                            <div className='font-semibold'>Thẻ:</div>
                            <div className='flex gap-2 flex-wrap'>

                                {tags && tags.length > 0 && tags.map(subject => <SubjectItem key={subject.id} onClick={hanleClick}>{subject.name}</SubjectItem>)}
                                <input className='rounded-lg border border-2 border-gray-400 p-2 ' placeholder='Ex:Toán,Tiếng Anh' onBlur={handleChangeSubject}></input>
                               
                            </div>
                        </div>
                        <div className='mb-4'>
                            <div className='font-semibold'>Ảnh đại diện: </div>
                            <label htmlFor='image' className='w-full relative h-[200px] rounded-lg border border-gray-400 flex'>
                                <img className="mx-auto" src={image || `https://freeiconshop.com/wp-content/uploads/edd/image-outline-filled.png`}></img>
                                <div className='absolute bottom-0 left-0 w-[100px] h-[3px] bg-primary' style={{
                                    width: `0px`
                                }}></div>
                            </label>
                            <input  id='image' name="image" placeholder='image' type="file" className="hidden" onChange={onSelectImage}></input>
                            {!image && <ErrorMessage message={"Choose your image"}></ErrorMessage>}
                        </div>
                        <div className='flex justify-end '>
                            <button className='px-4 py-2 rounded-md text-white bg-primary'>Tạo bài viết</button>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default BlogAddPage;
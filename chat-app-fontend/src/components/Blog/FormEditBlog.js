
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import ErrorMessage from 'components/Form/ErrorMessage';
import Input from 'components/Form/Input';
import InputRadio from 'components/Input/InputRadio';
import requestApi from 'components/helper/api';

import SubjectItem from 'components/user/SubjectItem';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from "yup"
const schema = yup
    .object({
        title: yup.string().required("Field is required"),


    })
let totalTagSelect = []
const FormEditBlog = ({ blog, categories, tags, isDarkMode }) => {
    const { info } = useSelector(state => state.user)
    const inputContent = useRef(null);
    const [flag, setFlag] = useState(false);
    const [image, setImage] = useState(blog.image);
    const { control, register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
    });
    const [submitting, setSubmitting] = useState(false)
    const [categorySelect, setCategorySelect] = useState(blog.category.id)
    const onSubmit = async (values) => {
        if (isValid) {
            const content = inputContent?.current?.value
            if (!image || totalTagSelect.length <= 0) {
                return;
            }
            if (values.categoryName) {
                values = {
                    ...values,
                    content,
                    tagsName: totalTagSelect,
                    image,
                    userId: info?.id
                }
            }
            else {
                const index = categories.findIndex(category => category.id === categorySelect);
                const categoryName = categories[index].name;
                values = {
                    ...values,
                    content,
                    tagsName: totalTagSelect,
                    image,
                    categoryName,
                    userId: info?.id
                }
            }

            console.log(values);
            try {
                setSubmitting(true)
                console.log(values);
                const response = await requestApi(`/blog/${blog.id}`, "PUT", values);
                if (response.status === 200) {
                    alert("Update thanh cong")
                }

            } catch (error) {
                console.log(error);
            }
            finally {
                setSubmitting(false)

            }
        }
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
    const handleNewCategory = (e) => {
        const element = e.target;
        const node = document.querySelector('#other')
        if (node) {
            node.value = element.value.trim();
        }
    }
    const handleChangeInput = (e) => {
        setFlag(true);
    }
    const handleChangeSubject = (e) => {
        const subs = e.target.value.split(",")
        totalTagSelect = [...totalTagSelect, ...subs]
    }
    const hanleClick = (e) => {

        const node = e.target;
        console.log(node);
        let newArr
        if (node.className.includes('bg-primary')) {

            e.target.classList.remove('bg-primary')
            const index = totalTagSelect.findIndex((val) => val === node.innerText.trim());

            totalTagSelect.splice(index, 1)
            newArr = totalTagSelect;

        }
        else {
            e.target.classList.add('bg-primary')
            newArr = [...totalTagSelect, e.target.innerText.trim()]
        }

        totalTagSelect = newArr

    }
    const selectTag = () => {
        const tags = document.querySelectorAll('.tag-item.selected')
        let newArr
        tags.forEach(tag => {
            tag.classList.add('bg-primary')
            newArr = [...totalTagSelect, tag.innerText.trim()]
        })
        totalTagSelect = newArr
    }
    function isTagSelected(tagItem, tags) {
        const check = tags.some(tag => tag.name === tagItem)
        if (check) {
            totalTagSelect = [
                ...totalTagSelect,
                tagItem
            ]
        }
        return check
    }
    function isCheckTag(tagItem, tags) {
        return tags.some(tag => tag === tagItem)
    }
    const RenderTag = () => {
        if (tags && tags.length > 0) {
            if (totalTagSelect.length > 0) {
                return tags.map(subject => <SubjectItem className="tag-item" selectTag={selectTag} isSelected={isCheckTag(subject.name, totalTagSelect)} key={subject.id} onClick={hanleClick}>{subject.name}</SubjectItem>)
            }
            return tags.map(subject => <SubjectItem className="tag-item" selectTag={selectTag} isSelected={isTagSelected(subject.name, blog.tags)} key={subject.id} onClick={hanleClick}>{subject.name}</SubjectItem>)
        }

    }
    return (
        <div className={`${isDarkMode ? 'bg-dark-second' : ''}`}>
            <div className='w-[1400px] mx-auto py-4'>

                <form onSubmit={handleSubmit(onSubmit)} className='w-full mx-auto flex flex-col justify-centerr'>

                    <div className='flex gap-4'>
                        <div className='md:w-[70%]'>
                            <div className='mb-4'>
                                <Input defaultValue={blog.title} name="title" className={"outline-none"} control={control} placeholder="Enter title blog" type="text"></Input>
                                {errors.title && <ErrorMessage message={errors.title.message}></ErrorMessage>}
                            </div>
                            <div className='mb-4'>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={`${blog.content || ""}`}
                                    onReady={editor => {
                                        if (inputContent && inputContent.current) {
                                            inputContent.current.value = `${blog.content}`
                                        }
                                    }}
                                    onChange={(event, editor) => {
                                        if (inputContent && inputContent.current) {
                                            inputContent.current.value = editor.getData()
                                        }
                                    }}
                                />
                                <input ref={inputContent} className='' type='hidden' name='content'></input>
                            </div>

                        </div>
                        <div className='md:flex-1'>
                            <div className='flex mb-4 items-center'>
                                <div className=''>
                                    <div className='font-semibold'>Danh mục:</div>
                                    <div className='flex gap-4 items-center'>
                                        {categories && categories.length > 0 && categories.map(category => <InputRadio key={category.id} isselected={category.id === categorySelect} name="categoryName" control={control} onClick={() => setCategorySelect(category?.id)} value={category?.name} label={category?.name}></InputRadio>)}
                                        <div className='flex gap-2 items-center other-category'>
                                            <input type='radio' name='categoryName' id='other' onClick={handleChangeInput} ></input>
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

                                    <RenderTag></RenderTag>
                                    <input className='rounded-lg border border-2 border-gray-400 p-2 ' placeholder='Ex:Toán,Tiếng Anh' onBlur={handleChangeSubject}></input>

                                </div>
                            </div>
                            <div className='mb-4'>
                                <div className='font-semibold'>Ảnh đại diện: </div>
                                <label htmlFor='image' className='w-full relative h-[200px] rounded-lg border border-gray-400 flex'>
                                    <img className="mx-auto" src={blog.image || `https://freeiconshop.com/wp-content/uploads/edd/image-outline-filled.png`}></img>
                                    <div className='absolute bottom-0 left-0 w-[100px] h-[3px] bg-primary' style={{
                                        width: `0px`
                                    }}></div>
                                </label>
                                <input id='image' name="image" placeholder='image' type="file" className="hidden" onChange={onSelectImage}></input>
                                {!image && <ErrorMessage message={"Choose your image"}></ErrorMessage>}
                            </div>
                            <div className='flex justify-end '>
                                <button className='px-4 py-2 rounded-md text-white bg-primary'>Cập nhập bài viết</button>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
};


export default FormEditBlog;
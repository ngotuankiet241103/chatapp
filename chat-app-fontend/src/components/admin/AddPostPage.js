import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Label from '../../components/Form/Label';
import Input from '../../components/Form/Input';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import ErrorMessage from '../../components/Form/ErrorMessage';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKBox } from "@ckbox/core";
import "@ckbox/components/dist/styles/ckbox.css";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
const schema = yup
  .object({
    title: yup.string().required("Field is required"),
    slug: yup.string().required("Field is required"),
    description: yup.string().required("Field is required"),
    categoryId: yup.string().required("Field is required")
   
  })
const AddPostPage = () => {
    const {register,control,handleSubmit,formState: {errors,isValid}} = useForm({
        resolver: yupResolver(schema)
    })
    const [progress,setProgress] = useState("")
    const [error,setError] = useState("")
    const [categories,setCategories] = useState("");
    const [image,setImage] = useState("")
    const getCategories = async () => {
        const colRef = collection(db,"/categories")
        const snap = await getDocs(colRef)
        const data =  snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        setCategories(data);
    }
    const onSubmit = (values) => {
        const content = document.querySelector("#content").value
        if(content){
            if(isValid){
                console.log("hello");
                setError("")
                values = {
                    ...values,
                    image,
                    content
                }
                console.log(values);
                uploadPost(values)
            }
        }
        else{
            setError({
                ...errors,
                content: {
                    message: "Field is required"
                }
            })
                
            
        }
       
    }
    const onSelectImage = (e) => {
        const file = e.target.files[0];
        if(!file) return;
        const storage = getStorage();
                const metadata = {
                contentType: 'image/jpeg'
                };
                // Upload file and metadata to the object 'images/mountains.jpg'
                const storageRef = ref(storage, 'images/' + file);
                const uploadTask = uploadBytesResumable(storageRef, file, metadata);

                // Listen for state changes, errors, and completion of the upload.
                uploadTask.on('state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress)
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    }
                }, 
                (error) => {
                   console.log(error);
                }, 
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImage(downloadURL)
                        console.log('File available at', downloadURL);
                    });
                }
            );
    }
    const uploadPost = async (values) => {
        const useRef = collection(db,"posts")
        await addDoc(useRef,values)
    }
    useEffect(() => {
        getCategories()
    },[])
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-[1000px] mx-auto py-4'>

            <div className='flex items-center gap-6 mb-4'>
                <div className='field flex-1'>
                    <Label className="text-gray-400 " name="title">Title</Label>
                    <Input name="title" placeholder='Title' control={control} type="text" ></Input> 
                    {errors.title && <ErrorMessage message={errors.title.message}></ErrorMessage>}
                </div>
                <div className='field flex-1'>
                    <Label className="text-gray-400 " name="slug">Slug</Label>
                    <Input name="slug" placeholder='Slug' control={control} type="text" ></Input> 
                    {errors.slug && <ErrorMessage message={errors.slug.message}></ErrorMessage>}
                </div>
                
            </div>
            <div className='flex items-center gap-6 mb-4'>
                <div className='field flex-1'>
                    <Label className="text-gray-400 " name="description">Short description</Label>
                    <Input name="description" placeholder='Description' control={control} type="text" className="h-[200px] text-left" ></Input> 
                    {errors.description && <ErrorMessage message={errors.description.message}></ErrorMessage>}
                </div>
                <div className='field flex-1'>
                    <Label className="text-gray-400 " name="image">Image</Label>
                    <label htmlFor='image' className='w-full relative h-[200px] rounded-lg border border-gray-400 flex'>
    
                        <img className="mx-auto" src={progress === 100 ? image :`https://freeiconshop.com/wp-content/uploads/edd/image-outline-filled.png`}></img>
                        <div className='absolute bottom-0 left-0 w-[100px] h-[3px] bg-primary' style={{
                            width: `${Math.floor(progress)}%`
                        }}></div>
                    </label>
                    <input id='image' name="image" placeholder='image'  type="file" className="hidden" onChange={onSelectImage}></input> 
                    {errors.image && <ErrorMessage message={errors.image.message}></ErrorMessage>}
                </div>
                
            </div>
            <div className='flex'>
                <Label className="text-gray-400 block" name="categoryId">Category</Label>
                <select {...register("categoryId")} id="categoryId">
                    <option value="">Danh mục</option>
                    {categories.length > 0 && categories.map(category => <option key={category.id} value={category.id}> {category.name}</option>)}
                </select>
                {errors.category && <ErrorMessage message={errors.category.message}></ErrorMessage>}
            </div>
            <div className='w-full mb-2'>
            {/* <Input type="hidden" name="content" control={control} placeholder='deoa'></Input> */}
            <input name='content' type='hidden'  id='content'></input>
            <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor&nbsp;5!</p>"
                    onInit={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    // console.log("Editor is ready to use!", editor);
                    editor.editing.view.change((writer) => {
                    writer.setStyle(
                        "height",
                        "200px",
                        editor.editing.view.document.getRoot()
                    );
                    });
                    }}
                    onReady={ editor => {
                        document.querySelector("#content").value = editor.getData()
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event,editor ) => {
                        console.log(document.querySelector("#content"))
                        document.querySelector("#content").value = editor.getData()
                        console.log( event );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor.getData() );
                    } }
                />
            </div>
            {error.content && <ErrorMessage message={error.content.message}></ErrorMessage>}
            <button className='px-8 py-2 rounded-lg bg-primary text-white float-right'>Add</button>
        </form>
    );
};

export default AddPostPage;
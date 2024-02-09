import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SubjectItem from './SubjectItem';
import Button from 'components/Button/Button';
import { useSelector } from 'react-redux';
import DetailsTutos from './DetailsTutos';
import requestApi from 'components/helper/api';

const IntroduceUser = () => {
    const user = useSelector(state => state.user.info)
    const [subjects, setSubjects] = useState([])
    const [select, setSelect] = useState([])
    const [infoUser, setInfoUser] = useState("")
    const [introduce, setIntroducte] = useState("")
    const getSubjects = async () => {
        try {
            const reponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/subjects`);
            console.log(reponse.data.data);
           
            if (reponse.status === 200) {
                setSubjects(reponse.data.data)
            }
        } catch (error) {

        }
    }
    const handlePreview = () => {
        const info = {
            ...user,
            profileUser: {
                subjects: select,
                introduce
            }
           
        }
        console.log(info);
        setInfoUser(info)
    }
    const handleAddProfile = async () => {
        try {
            const data = {
                subjectsName: select,
                introduce
            }
            const reponse = await requestApi(`/user-profile/${user.id}`, "POST", data)
        } catch (error) {

        }
    }
    useEffect(() => {
        getSubjects()
    }, [])
    const hanleClick = (e) => {
        const node = e.target;
        let newArr
        if (node.className.includes('bg-primary')) {
            e.target.classList.remove('bg-primary')
            const index = select.indexOf(node.innerText)
            newArr = select.splice(index, 1)
        }
        else {
            e.target.classList.add('bg-primary')
            newArr = [...select, e.target.innerText]
        }
        
        setSelect(newArr)

    }
    const handleChangeSubject = (e) => {
        const subs = e.target.value.split(",")
        setSelect([...select,...subs])
    }
    return (
        <div className='w-[1400px] mx-auto'>
            {infoUser ?
                <>
                    <DetailsTutos user={infoUser}></DetailsTutos>
                </>
                :
                <>
                    <div className='mb-6'>
                        <p className='font-semibold text-[18px] mb-4'>Subject:</p>
                        <div className='flex gap-3 mb-4 items-center'>
                            {subjects.length > 0 && subjects.map(subject => <SubjectItem key={subject.id} onClick={hanleClick}>{subject.name}</SubjectItem>)}
                            <input className='rounded-lg border border-2 border-gray-400 p-2 ' placeholder='Ex:Toán,Tiếng Anh' onChange={handleChangeSubject}></input>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <p className='font-semibold text-[18px] mb-4'>Introduce:</p>
                        <CKEditor
                            editor={ClassicEditor}
                            data=""
                            onReady={editor => {
                                // You can store the "editor" and use when it is needed.
                            }}
                            onChange={(event, editor) => {

                                setIntroducte(editor.getData())
                            }}
                            onBlur={(event, editor) => {
                                console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log('Focus.', editor);
                            }}
                        />
                    </div>
                    <div className='flex gap-4 justify-end'>
                        <Button onClick={handlePreview}>Preview</Button>
                        <Button onClick={handleAddProfile}>Add</Button>
                    </div>

                </>
            }
        </div>
    );
};

export default IntroduceUser;
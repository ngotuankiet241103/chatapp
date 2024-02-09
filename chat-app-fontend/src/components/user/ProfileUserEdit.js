import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from 'axios';
import Button from 'components/Button/Button';
import requestApi from 'components/helper/api';
import React, { useEffect, useState } from 'react';
import SubjectItem from './SubjectItem';
import { useDarkModeContext } from 'contexts/DarkModeContext';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProfileUserEdit = () => {
    const user = useSelector(state => state.user.info)
    const [subjects, setSubjects] = useState([])
   
    const [infoUser, setInfoUser] = useState("")
    const [introduce, setIntroducte] = useState("")
    const { userId } = useParams();
    const [tutor, setTutor] = useState("")
    const {isDarkMode} = useDarkModeContext()
    let selectSubjects = []
    const getProfileUser = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user-profile/${userId}`)
            if (response.status === 200) {
                const { data } = response.data
                console.log(data);
                selectSubjects = data.profileUser.subjects
                setTutor(data)
            }
        } catch (error) {
            console.log(error);
        }
    }
   
    
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
                subjects: selectSubjects,
                introduce
            }

        }
        console.log(info);
        setInfoUser(info)
    }
    const handleEditProfile = async () => {
        try {
            const data = {
                subjectsName: selectSubjects,
                introduce
            }
            console.log(data);
            const response = await requestApi(`/user-profile/${user.id}`, "PUT", data)
        } catch (error) {
            console.log(error);
        }
    }
    function checkUser (subject,subjects){
       const check = subjects.some(sub => sub === subject);
       if(check) {
        selectSubjects = [...selectSubjects,subject];
       }
        return check;
    }
    const hanleClick = (e) => {
        const node = e.target;
        let newArr
        if (node.className.includes('bg-primary')) {
            e.target.classList.remove('bg-primary')
            const index = selectSubjects.indexOf(node.innerText)
            selectSubjects.splice(index, 1)
            
        }
        else {
            e.target.classList.add('bg-primary')
            newArr = [...selectSubjects, e.target.innerText]
            selectSubjects = newArr
        }
        
      

    }
    const handleChangeSubject = (e) => {
        const subs = e.target.value.split(",")
        selectSubjects = [...selectSubjects,...subs]
    }
    useEffect(() => {
        getProfileUser();
        getSubjects()
    }, [])
    return (
        <div className='w-[1400px] mx-auto'>
            <div className='mb-6'>
                <p className='font-semibold text-[18px] mb-4'>Subject:</p>
                <div className='flex gap-3 mb-4 items-center'>
                    {subjects.length > 0 && subjects.map(subject => <SubjectItem isSelected={checkUser(subject.name,tutor.profileUser.subjects)} key={subject.id} onClick={hanleClick}>{subject.name}</SubjectItem>)}
                    <input className='rounded-lg border border-2 border-gray-400 p-2 ' placeholder='Ex:Toán,Tiếng Anh' onChange={handleChangeSubject}></input>
                </div>
            </div>
            <div className='mb-4'>
                <p className='font-semibold text-[18px] mb-4'>Introduce:</p>
                <CKEditor
                    editor={ClassicEditor}
                    data={`${tutor?.profileUser?.introduce}`}
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
                <Button onClick={handleEditProfile}>Update</Button>
            </div>
        </div>
    );
};

export default ProfileUserEdit;
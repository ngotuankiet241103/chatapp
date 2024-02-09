import React, { useEffect, useState } from 'react';
import HeaderFormChat from './HeaderFormChat';
import MessageChat from './MessageChat';
import requestApi from 'components/helper/api';
import { useSelector } from 'react-redux';

const FormChat = ({isMessage,isSelected,isDarkMode,onBack}) => {
    const [messages,setMessages] = useState([])
    const {info} = useSelector(state => state.user)
    const [userSelect,setUserSelect] = useState("");
    const [isMoreMessage,setMoreMessage] = useState(false)
    const [page,setPage] = useState(0)
    const handleMessage = async () => {
        try {
            const messages = await getMessages(page);
            setMessages(messages)
        } catch (error) {
            console.log();
        }   
    }
    const getMessages = async (page) => {
        try {
            const response = await requestApi(`/messages/${info.id}/${isSelected}?page=${page}`)
            console.log(response);
            if(response.status === 200){
                return response.data
            }
        } catch (error) {
            console.log(error);
        }
    }
    const getInfo = async () => {
        try {
            const response = await requestApi(`/user/${isSelected}`,"GET")
            
            if(response.status === 200){
                setUserSelect(response.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleLoadMore = async () => {
        try {
            const data =  await getMessages(page);
            console.log(data);
            setMessages([...data,...messages])
        } catch (error) {
            
        }
    }
    useEffect( () => {
        if(isMoreMessage){
           handleLoadMore()
        }
    },[isMoreMessage])
    useEffect(() => {
        handleMessage()
        getInfo()
    },[isSelected])
    const handleScroll = () => {
        setPage(page => ++page)
        setMoreMessage(true)
    }
    return (
        <div className={`md:pl-5 max-sm:px-2 md:flex-1 max-sm:w-full max-sm:w-[300px]  ${isDarkMode ? 'bg-dark-second ' : ''}`}>
            <div className='mb-4'>
                <HeaderFormChat onBack={onBack} isDarkMode={isDarkMode} info={userSelect}></HeaderFormChat>
            </div>
            <MessageChat isDarkMode={isDarkMode} onScroll={handleScroll} isMessage={isMessage} isSelected={isSelected} messages={messages}></MessageChat>
        </div>
    );
};

export default FormChat;
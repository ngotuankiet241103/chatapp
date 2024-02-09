import FormChat from 'components/Chat/FormChat';
import MessagingList from 'components/Chat/MessagingList';
import { Stomp } from '@stomp/stompjs';
import { ChatProvider } from 'contexts/ChatContext';
import useChatHook from 'hooks/useChatHook';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import requestApi from 'components/helper/api';
import { useSelector } from 'react-redux';
import { stomp } from 'config/socket';
import MessagingItem from 'components/Chat/MessagingItem';
import { useDarkModeContext } from 'contexts/DarkModeContext';
import { useNavigate } from 'react-router-dom';
const cb = (values) => console.log(values);
const ChatPage = () => {
    const {isDarkMode} = useDarkModeContext()
    const [send, setSend] = useState(false)
    const redirect = useNavigate()
    const { isSelected, focusUser } = useChatHook();
    const { info } = useSelector(state => state.user)
    const [user, setUser] = useState("")
    const [isMsgNoti, setMsgNoti] = useState([])
    const [message, setMessage] = useState("")
    const queryString = window.location.search;
    const searchParams = new URLSearchParams(queryString);
    const id = searchParams.get("message")
    const [selectedUser, setSelectedUser] = useState(null)
    console.log(isSelected);
    const findUserOnline = async () => {
        try {
            const resposne = await requestApi("/users", "GET");
            let users = await resposne.data.filter(user => user.id !== info.id)
            if(id)  {
              users = await users.filter(user => user.id !== parseInt(id))
            }
           
            console.log(users);
            setUser(users)
           
        } catch (error) {

        }
    }
    const handleOnRecive = (payload) => {
        console.log(payload);
        const senders = [...isMsgNoti];
        const data = JSON.parse(payload.body);
        console.log(data.senderId + "  " + isSelected);
        if (data.senderId === isSelected) {

            setMessage(data)
        }
        else {

            senders.push({ senderId: data.senderId })
            setMsgNoti(senders);
        }
    }
    
    useEffect(() => {
        let flag = false;
        // if(!info.id){
        //     redirect("/login")
        //     return;
        // }
        if(!flag){

            findUserOnline()
        }
        return () => flag = true

    }
    ,[info])
    useEffect(() => {
        async function findUser(id) {
            try {
                const response = await requestApi(`/user/${id}`, "GET")
                if (response.status === 200) {
                    return response.data;
                }
            } catch (error) {

            }
        }
        async function handleSelectedUser(id) {
            try {
                const data = await findUser(id);
                setSelectedUser(data);
                focusUser(data.id)
            } catch (error) {
                console.log(error);
            }
        }

        console.log(id);
        if (id) {
            handleSelectedUser(id)
        }
    }, [])
    useEffect(() => {
        let url = `${process.env.REACT_APP_URL_WEBSOCKET}`
        let socket = new SockJS(url);
        const stomp = Stomp.over(socket);
        if(info.id){
            if (stomp) {
                stomp.connect({}, onConnected, onError);
                function onError(error) {
                    console.log(
                        error
                    );
                }
    
                function onConnected() {
                    console.log("connect success");
                    console.log(stomp);
                    
                    stomp.subscribe(`/topic/${info.id}/messages`, handleOnRecive);
                    stomp.subscribe(`/topic/public`, handleOnRecive);
    
                    // register the connected user
                }
            }
        }
        

    }, [isSelected,info])

    return (
 
        <div className='flex pb-2 '>

            <div className={`md:w-[300px] max-sm:px-2 max-sm:flex-1 ${isSelected ? 'max-sm:hidden' :''} h-[610px]  ${isDarkMode ? 'bg-dark-second border border-transparent border-r-sub' : ''}`}>
                {selectedUser &&
                    <div className='px-4 py-2 '>
                        <MessagingItem key={selectedUser.id} isNoti={getObjectById(isMsgNoti, user.id)} active={selectedUser.id === isSelected} data={selectedUser} onClick={() => focusUser(selectedUser.id)}></MessagingItem>

                    </div>
                }
                <MessagingList noti={isMsgNoti} users={user} isSelected={isSelected} focusUser={focusUser}></MessagingList>
            </div>
            {isSelected && <FormChat isDarkMode={isDarkMode} isMessage={message} onBack={() => focusUser("")} isSelected={isSelected}></FormChat>}
        </div>
    );
};
function getObjectById(array, id) {
    for (const obj of array) {
        if (obj.senderId === id) {
            return true;
        }
    }
    return false; // Return null if the object with the specified ID is not found
}
export default ChatPage;
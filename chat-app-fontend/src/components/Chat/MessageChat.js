import React, { useEffect, useRef, useState } from 'react';
import FooterFormChat from './FooterFormChat';
import Message from './Message';
import useChatHook from 'hooks/useChatHook';
import useSocketHook from 'hooks/useSocketHook';
import { useSelector } from 'react-redux';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
const cb = (values) => console.log(values);

const MessageChat = (props) => {
    const { isMessage, isSelected, messages,onScroll,isDarkMode } = props
    const containerRef = useRef(null);
    const { info } = useSelector(state => state.user)
    const [components, setComponents] = useState([])
    const [loading,setLoading] = useState(false)
    const [scrollHeight,setScrollHeight] = useState("")
    useEffect(() => {
        if (messages.length > 0) {
            const component = messages.map(message => <Message key={message.id} isSender={message.senderId === info.id}>{message.content}</Message>)

            setComponents(component)
        }
    }, [messages])
    useEffect(() => {
        if (isMessage) {
            const component = <Message key={isMessage.id} isSender={isMessage.senderId === info.id}>{isMessage.content}</Message>;
            setComponents([...components, component])
        }
    }, [isMessage])
    useEffect(() => {
        if (containerRef.current) {
            console.log(scrollHeight);
            containerRef.current.scrollTop = scrollHeight || containerRef.current.scrollHeight;
            setScrollHeight("")
        }
    }, [components]);

    const appendComment = (values) => {
        const id = messages.length > 0 ? messages[messages.length - 1].id + 1 : 1
        console.log(id);
        const component = <Message key={id} isSender={true}>{values}</Message>;
        const col = [...components, component]
        setComponents(col)
    }
    const sendMessage = (values) => {
        if(!values){
            return;
        }
        appendComment(values);
        let url = `${process.env.REACT_APP_URL_WEBSOCKET}`
        let socket = new SockJS(url);
        const stomp = Stomp.over(socket);
        console.log("open");
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
                stomp.send("/app/chat",
                    {},
                    JSON.stringify({ senderId: info.id, recipientId: isSelected, content: values, timestamp: new Date() }));
                // register the connected user
            }

        }
    }
   
   

    const handleScroll = (event) => {
        const element = containerRef.current
        const scrollHeight = Math.floor(element.scrollTop)
        const totalHeight = Math.floor(element.scrollHeight);
       
        if (scrollHeight <= Math.floor((totalHeight * (1 / 50)))) {
            if(!loading){
                console.log(scrollHeight);
                onScroll();
                setLoading(true);
                setScrollHeight(totalHeight - scrollHeight);
            }
            
        }
        

    }
    return (
        <div>
            <div className='forum px-2 max-sm:px-2  overflow-y-scroll max-sm:h-[20vh] md:h-[460px]' ref={containerRef} onScroll={handleScroll}>
                {components.length > 0 && components.map(component => component)}

            </div>
            <FooterFormChat isDarkMode={isDarkMode} onClick={(e) => sendMessage(e.value.trim())}></FooterFormChat>
        </div>
    );
};

export default MessageChat;
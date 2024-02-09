import { Stomp } from '@stomp/stompjs';
import React from 'react';
import { useSelector } from 'react-redux';
import SockJS from 'sockjs-client';
const onMessageReceived = (message) => {
    console.log(message.body);
}
let url = `${process.env.REACT_APP_URL_WEBSOCKET}`
const useSocketHook = (cb = onMessageReceived) => {
    
    console.log(url);
    let socket = new SockJS(url);
    const stomp = Stomp.over(socket);

    
    
    return {socket,stomp}
};

export default useSocketHook;

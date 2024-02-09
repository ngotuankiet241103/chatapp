import { ChatProvider } from 'contexts/ChatContext';
import React from 'react';
import ChatPage from './ChatPage';

const WrapChatPage = () => {
    return (
       <ChatProvider>
            <ChatPage></ChatPage>
       </ChatProvider>
    );
};

export default WrapChatPage;
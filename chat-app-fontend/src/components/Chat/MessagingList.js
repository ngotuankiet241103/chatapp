import React, { useRef, useState } from 'react';
import MessagingItem from './MessagingItem';
import useChatHook from 'hooks/useChatHook';
const users = [
    {
        id:1,
        
    },
    {
        id:2,
        
    },
    {
        id:3,
        
    }
]
const MessagingList = ({noti,isSelected,focusUser,users}) => {
    const value = useRef(1);
    value.current++;
    console.log(value.current);
    return (
        <div className='px-4 py-2 flex flex-col gap-4'>
            {users.length > 0 && users.map(user =>  <MessagingItem key={user.id} isNoti={getObjectById(noti,user.id)} active={user.id === isSelected} data={user} onClick={() => focusUser(user.id)}></MessagingItem> )}
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
export default MessagingList;
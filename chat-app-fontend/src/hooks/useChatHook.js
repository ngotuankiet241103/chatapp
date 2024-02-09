import React, { useState } from 'react';

const useChatHook = () => {
    const [isSelected,setSelected] = useState("")
    const focusUser = (id) => {
        setSelected(id)
    }
    return {
        isSelected,
        focusUser
    }
        
};

export default useChatHook;
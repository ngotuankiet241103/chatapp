import React from 'react';

const SubjectItem = ({isSelected, children,onClick,className,selectTag}) => {
    
    
    return (
        <div onClick={onClick}  className={`${className} px-2 py-1 bg-[#f2f2f2] rounded-lg cursor-pointer ${isSelected ? 'bg-primary' : ''}`}  >
            {children}
        </div>
    );
};

export default SubjectItem;
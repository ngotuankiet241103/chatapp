import React from 'react';

const Label = ({name,children,...props}) => {
    
    return (
        <label className={props.className} htmlFor={name} >{children}</label>
    );
};

export default Label;
import React from 'react';

const debouce = (cb,time = 500) => {
   setTimeout(() => {
        cb();
   },time)
};

export default debouce;
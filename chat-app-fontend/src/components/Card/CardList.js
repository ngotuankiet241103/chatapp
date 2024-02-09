import React from 'react';
import PropTypes from 'prop-types';
import CardItem from './CardItem';
const CardList = ({tutors,onClick}) => {
    console.log();
    return (
        <div className='grid md:grid-cols-3 max-sm:grid-cols-1 max-sm:px-2 gap-4 '>
            {tutors && tutors.length > 0 && tutors.map(tutor => <CardItem onClick={onClick} key={tutor.id} item={tutor}></CardItem>)}
        </div>
    );
};
CardList.prototype = {
    tutors: PropTypes.array
}
export default CardList;
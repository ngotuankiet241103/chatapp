import React from 'react';
import CommentItem from './CommentItem';

const CommentReply = ({comment ,onClick}) => {
    return (
        <div class="child-comment" data-index={`${comment.tree_id}`} data-id={`${comment.id}`}>
            <CommentItem onClick={onClick} comment={comment}></CommentItem>
        </div>
    );
};

export default CommentReply;
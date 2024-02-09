import React, { Component, useState } from 'react';
import { useSelector } from 'react-redux';
import CommentItem from './CommentItem';

const CommentRoot = ({ comment, arr, commentsReply, onClick }) => {
  const [showCmtChild, setShowCmtChild] = useState(false)
  const { info } = useSelector(state => state.user)
  console.log(commentsReply);
  const handleShowCmt = () => {
    setShowCmtChild(!showCmtChild);
  }
  return (

    <li class={`comment-item ${showCmtChild ? 'active' : ''}`}>
      <div class="comment-root" data-index={`${comment.tree_id}`} data-id={`${comment.id}`}>
        <CommentItem onClick={onClick} comment={comment}></CommentItem>
      </div>
      {arr.length > 1 && <div class="viewComment-reply">
        <div class={`show ${showCmtChild ? 'active' : ''}`} onClick={handleShowCmt}>
          <span>Xem {arr.length - 1} câu trả lời</span>
          <span><i class="fa-solid fa-chevron-down"></i></span>
        </div>
        <div class={`hidden  ${showCmtChild ? 'active' : ''}`} onClick={handleShowCmt}>
          <span>Ẩn {arr.length - 1} câu trả lời</span>
          <span><i class="fa-solid fa-chevron-up"></i></span>
        </div>
      </div>}
      {commentsReply && commentsReply.length > 0 && commentsReply.map(Comment => Comment)}
    </li>

  );
};

export default CommentRoot;
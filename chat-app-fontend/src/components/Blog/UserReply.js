import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import requestApi from 'components/helper/api';
import React, { useState } from 'react';

const UserReply = ({ userId, comment,onChange }) => {
    const [isReply, setReply] = useState(false);
    const [content, setContent] = useState("")
    const handleReplyCmt = () => {
        setReply(!isReply)
    }
    const hanldeSendReply = async () => {
        console.log(comment);
        const data = {
            content: content,
            userId,
            blogId: comment.blogId,
            parentId: comment.id,
            tree_id: comment.tree_id,
            node_left: null,
            node_right: null
        }
        await addComment(data)
        handleReplyCmt();
    }
    const addComment = async (data) => {
        try {
            const response = await requestApi(`/comment`,"POST",data)
            if(response.status === 200){
                onChange()
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="comment_time">
                <button><span>Thích</span></button>
                <button className="btn-comment" onClick={handleReplyCmt}><span>Bình luận</span></button>
            </div>
            {isReply &&
                <div className='form-reply'>
                    <div className="comment-reply">

                        <CKEditor
                            editor={ClassicEditor}
                            data=""
                            onReady={editor => {
                                // You can store the "editor" and use when it is needed.
                            }}
                            onChange={(event, editor) => {
                                setContent(editor.getData())

                            }}
                            onBlur={(event, editor) => {
                                console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log('Focus.', editor);
                            }}
                        />

                        <div className="oparation-form-reply">
                            <button className="cancel-reply bg-gray-400" onClick={handleReplyCmt}>Hủy</button>
                            <button className="send-reply bg-primary text-white" onClick={hanldeSendReply} >Trả lời</button>
                        </div>
                    </div>
                </div>}
        </>
    );
};

export default UserReply;
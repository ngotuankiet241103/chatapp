
import BlogApproved from 'components/admin/BlogApproved';
import BlogPending from 'components/admin/BlogPending';
import BlogItem from 'components/admin/BlogPending';
import BlogReject from 'components/admin/BlogReject';
import React from 'react';

const blogStrategy = {
    PENDING: BlogPending,
    APPROVED: BlogApproved,
    REJECT: BlogReject
}
export default blogStrategy;
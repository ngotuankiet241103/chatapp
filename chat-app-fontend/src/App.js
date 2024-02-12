
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

import { lazy, useEffect, useLayoutEffect } from 'react';

import { DarkModeProvider } from 'contexts/DarkModeContext';

import 'react-toastify/dist/ReactToastify.css';
import FormRegister from 'components/Form/FormRegister';
import FormLogin from 'components/Form/FormLogin';
import Loading from 'components/loading/Loading';
const AdminPage = lazy(() => import('pages/AdminPage'));
const HomePage = lazy(() => import('pages/HomePage'));
const BlogAddPage = lazy(() => import('pages/BlogAddPage'));
const BlogEdit = lazy(() => import('components/Blog/BlogEdit'));
const Header = lazy(() => import('./layouts/web/Header'));
const MyBlogPage = lazy(() => import('pages/MyBlogPage'));
const FrameAdminPage = lazy(() => import('components/admin/FrameAdminPage'));
const DetailsBlog = lazy(() => import('components/admin/DetailsBlog'));
const BlogPage = lazy(() => import('pages/BlogPage'));
const ProfileUserEdit = lazy(() => import('components/user/ProfileUserEdit'));
const ManagePost = lazy(() => import('components/admin/ManagePost'));
const BlogDetail = lazy(() => import('components/Blog/BlogDetail'));
const InfoUser = lazy(() => import('components/user/InfoUser'));
const IntroduceUser = lazy(() => import('components/user/IntroduceUser'));
const ProfilePage = lazy(() => import('pages/ProfilePage'));
const TutorPage = lazy(() => import('pages/TutorPage'));
const DetailsTutos = lazy(() => import('components/user/DetailsTutos'));
const ChatPage = lazy(() => import('pages/ChatPage'));
function App() {
  return (
    <div className='h-[100vh]'>
      <DarkModeProvider>
        <Routes>
          <Route  path="/" element={<Redirect></Redirect>}>
            
          </Route>
          <Route path='/' element={<Header></Header>}>
            <Route path='/home' element={<HomePage></HomePage>}></Route>
            <Route path='/blog' element={<BlogPage></BlogPage>}></Route>
            <Route path='/blog/topic/:categoryCode' element={<BlogPage></BlogPage>}></Route>
            <Route path='/blog/code/:tagCode' element={<BlogPage></BlogPage>}></Route>
            <Route path='/blog/add' element={<BlogAddPage></BlogAddPage>}></Route>
            <Route path='/blog/edit/:blogId' element={<BlogEdit></BlogEdit>}></Route>
            <Route path='/blog/detail/:code' element={<BlogDetail></BlogDetail>}></Route>
            <Route path='/user/info' element={<InfoUser></InfoUser>}></Route>
            <Route path='/user/introduce/register' element={<IntroduceUser></IntroduceUser>}></Route>
            <Route path='/user/introduce' element={<DetailsTutos></DetailsTutos>}></Route>
            <Route path='/user/introduce/edit/:userId' element={<ProfileUserEdit></ProfileUserEdit>}></Route>
            <Route path='/user/profile/:userId' element={<ProfilePage></ProfilePage>}></Route>
            <Route path='/tutors' element={<TutorPage></TutorPage>}></Route>
            <Route path='/chat' element={<ChatPage></ChatPage>}></Route>
            <Route path='/my-blog/:statusBlog' element={<MyBlogPage></MyBlogPage>}></Route>
          </Route>
          <Route path='/manage' element={<Redirect to="/manage/dashboard"></Redirect>}/>
            
          
          <Route path='/manage' element={<FrameAdminPage></FrameAdminPage>}>
            <Route path='/manage/dashboard' element={<AdminPage></AdminPage>}></Route>

            <Route path='/manage/blogs' element={<ManagePost></ManagePost>}></Route>
            <Route path='/manage/blogs/:status' element={<ManagePost></ManagePost>}></Route>
          </Route>
          <Route path='/manage/blog/detail/:blogId' element={<DetailsBlog></DetailsBlog>}></Route>
          <Route path='/register' element={<FormRegister></FormRegister>}></Route>
          <Route path='/login' element={<FormLogin></FormLogin>}></Route>
          <Route path='/loading' element={<Loading></Loading>}></Route>
        </Routes>
      </DarkModeProvider>
    </div>
  );
}
const Redirect = ({to}) => {
  const redirect = useNavigate();
  useLayoutEffect(() => {
    redirect(to || "/home")
  },[])
  return (
    <>
      
    </>
  );
}
export default App;

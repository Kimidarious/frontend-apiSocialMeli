import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Followers from '../pages/Followers';
import Following from '../pages/Following';
import Feed from '../pages/Feed';
import CreatePost from '../pages/CreatePost';
import CreateUser from '../pages/CreateUser';
import ExploreUsers from '../pages/ExploreUsers';
import Promos from '../pages/Promos';
import AllUsers from '../pages/AllUsers';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-user" element={<CreateUser />} />
      <Route path="/explore" element={
        <ProtectedRoute>
          <ExploreUsers />
        </ProtectedRoute>
      } />
      <Route path="/all-users" element={
        <ProtectedRoute>
          <AllUsers />
        </ProtectedRoute>
      } />
      <Route path="/followers" element={
        <ProtectedRoute>
          <Followers />
        </ProtectedRoute>
      } />
      <Route path="/following" element={
        <ProtectedRoute>
          <Following />
        </ProtectedRoute>
      } />
      <Route path="/feed" element={
        <ProtectedRoute>
          <Feed />
        </ProtectedRoute>
      } />
      <Route path="/create-post" element={
        <ProtectedRoute>
          <CreatePost />
        </ProtectedRoute>
      } />
      <Route path="/promos" element={
        <ProtectedRoute>
          <Promos />
        </ProtectedRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
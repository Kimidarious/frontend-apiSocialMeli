import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Followers from '../pages/Followers';
import Following from '../pages/Following';
import Feed from '../pages/Feed';
import CreatePost from '../pages/CreatePost';
import CreateUser from '../pages/CreateUser';
import ExploreUsers from '../pages/ExploreUsers';
import Promos from '../pages/Promos';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-user" element={<CreateUser />} />
      <Route path="/explore" element={<ExploreUsers />} />
      <Route path="/followers" element={<Followers />} />
      <Route path="/following" element={<Following />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/promos" element={<Promos />} />
    </Routes>
  );
};

export default AppRoutes;
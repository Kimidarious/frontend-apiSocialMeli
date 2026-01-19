import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Followers from '../pages/Followers';
import Following from '../pages/Following';
import Feed from '../pages/Feed';
import CreatePost from '../pages/CreatePost';
import Promos from '../pages/Promos';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/followers" element={<Followers />} />
      <Route path="/following" element={<Following />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/promos" element={<Promos />} />
    </Routes>
  );
};

export default AppRoutes;
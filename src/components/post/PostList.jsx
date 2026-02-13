import PostCard from './PostCard';
import EmptyState from '../common/EmptyState';
import './PostList.css';

const PostList = ({ posts, emptyMessage = 'Nenhuma publicação encontrada' }) => {
  if (!posts || posts.length === 0) {
    return (
      <EmptyState 
        icon="📭"
        message={emptyMessage}
      />
    );
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard key={post.post_id} post={post} />
      ))}
    </div>
  );
};

export default PostList;

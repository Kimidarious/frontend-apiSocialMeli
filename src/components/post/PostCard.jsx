import './PostCard.css';

const PostCard = ({ post }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const finalPrice = post.has_promo 
    ? post.price - (post.price * post.discount / 100)
    : post.price;

  return (
    <div className={`post-card ${post.has_promo ? 'post-card-promo' : ''}`}>
      {post.has_promo && (
        <div className="post-promo-badge">
          🔥 {post.discount}% OFF
        </div>
      )}

      <div className="post-header">
        <div className="post-user">
          <div className="post-avatar">
            {post.user_id}
          </div>
          <div>
            <p className="post-user-id">Vendedor #{post.user_id}</p>
            <p className="post-date">{post.date}</p>
          </div>
        </div>
        <span className="post-category">Cat. {post.category}</span>
      </div>

      <div className="post-content">
        <h3 className="post-product-name">{post.product.product_name}</h3>
        
        <div className="post-product-details">
          <span className="post-detail">
            <strong>Tipo:</strong> {post.product.type}
          </span>
          {post.product.brand && (
            <span className="post-detail">
              <strong>Marca:</strong> {post.product.brand}
            </span>
          )}
          {post.product.color && (
            <span className="post-detail">
              <strong>Cor:</strong> {post.product.color}
            </span>
          )}
        </div>

        {post.product.notes && (
          <p className="post-notes">{post.product.notes}</p>
        )}
      </div>

      <div className="post-footer">
        <div className="post-price">
          {post.has_promo && (
            <span className="price-original">{formatPrice(post.price)}</span>
          )}
          <span className="price-final">{formatPrice(finalPrice)}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
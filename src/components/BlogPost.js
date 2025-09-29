import React from 'react';

const BlogPost = ({ post }) => {
  return (
    <article className="blog-post">
      <h2>{post.title}</h2>
      <div className="post-meta">
        <span>By: {post.author}</span>
        <span>{post.date}</span>
      </div>
      <div className="post-content">
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
};

export default BlogPost;

import React from 'react';
import BlogPost from '../components/BlogPost';
import { blogPosts } from '../data/blogPosts';
import '../styles/Blog.css';

const Blog = () => {
  return (
    <div className="blog">
      <div className="container">
        <h1>TechStore Blog</h1>
        <div className="blog-posts">
          {blogPosts.map(post => (
            <BlogPost key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;

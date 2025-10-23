import React from 'react';
import BlogPost from '../components/BlogPost';
import SEO from '../components/SEO';
import { blogPosts } from '../data/blogPosts';
import { SEO_KEYWORDS, DEFAULT_DESCRIPTIONS } from '../utils/seoUtils';
import '../styles/Blog.css';

const Blog = () => {
  // Sort posts by date (newest first)
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  return (
    <>
      <SEO
        title="Blog"
        description={DEFAULT_DESCRIPTIONS.blog}
        keywords={SEO_KEYWORDS.blog}
        url="/blog"
        type="website"
      />
      <div className="blog">
      <div className="container">
        <h1>Blog Posts</h1>
        <div className="blog-posts">
          {sortedPosts.map(post => (
            <BlogPost key={post.id} post={post} />
          ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default Blog;

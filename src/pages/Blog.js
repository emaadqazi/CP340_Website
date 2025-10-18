import React from 'react';
import BlogPost from '../components/BlogPost';
import SEO from '../components/SEO';
import { blogPosts } from '../data/blogPosts';
import { SEO_KEYWORDS, DEFAULT_DESCRIPTIONS } from '../utils/seoUtils';
import '../styles/Blog.css';

const Blog = () => {
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
        <h1>ShopCP340 Blog</h1>
        <div className="blog-posts">
          {blogPosts.map(post => (
            <BlogPost key={post.id} post={post} />
          ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default Blog;

// SEO Utility Functions

export const generateProductStructuredData = (products) => {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Technology Products",
    "description": "High-quality technology products and electronics at affordable prices",
    "url": "https://emaadqazi.github.io/CP340_Website/products",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": products.map((product, index) => ({
        "@type": "Product",
        "position": index + 1,
        "name": product.name,
        "description": product.description,
        "image": `https://emaadqazi.github.io/CP340_Website${product.image}`,
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "brand": {
          "@type": "Brand",
          "name": "ShopCP340"
        }
      }))
    }
  };
};

export const generateOrganizationStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ShopCP340",
    "url": "https://emaadqazi.github.io/CP340_Website",
    "logo": "https://emaadqazi.github.io/CP340_Website/images/logo.png",
    "description": "Your trusted source for quality technology products and electronics",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "support@shopcp340.com"
    },
    "sameAs": [
      "https://instagram.com/shopcp340",
      "https://twitter.com/shopcp340",
      "https://facebook.com/shopcp340"
    ]
  };
};

export const generateBlogPostStructuredData = (blogPost) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blogPost.title,
    "description": blogPost.excerpt,
    "image": blogPost.image ? `https://emaadqazi.github.io/CP340_Website${blogPost.image}` : "https://emaadqazi.github.io/CP340_Website/images/blog-default.jpg",
    "author": {
      "@type": "Person",
      "name": "ShopCP340 Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ShopCP340",
      "logo": {
        "@type": "ImageObject",
        "url": "https://emaadqazi.github.io/CP340_Website/images/logo.png"
      }
    },
    "datePublished": blogPost.date,
    "dateModified": blogPost.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://emaadqazi.github.io/CP340_Website/blog/${blogPost.slug}`
    }
  };
};

// SEO Keywords for different pages
export const SEO_KEYWORDS = {
  home: "technology products, electronics store, gadgets online, tech reviews, affordable electronics",
  products: "buy electronics, tech gadgets, product reviews, technology store, electronic devices",
  blog: "tech news, product reviews, technology guides, tech tips, electronics blog",
  about: "about us, company information, tech retailer, electronics company, technology store",
  privacy: "privacy policy, data protection, user privacy, terms of service"
};

// Default meta descriptions
export const DEFAULT_DESCRIPTIONS = {
  home: "ShopCP340 - Your trusted source for quality technology products and electronics. Discover the latest gadgets, electronics, and tech accessories at affordable prices.",
  products: "Browse our extensive collection of technology products including electronics, gadgets, and accessories. Quality products at competitive prices.",
  blog: "Stay updated with the latest technology news, product reviews, and buying guides. Expert insights on electronics and tech trends.",
  about: "Learn about ShopCP340 - your trusted technology retailer. Discover our mission, values, and commitment to providing quality electronics.",
  privacy: "ShopCP340 Privacy Policy - Learn how we protect your personal information and data privacy when shopping with us."
};

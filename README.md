# TechStore - E-commerce Website MVP

A modern React-based e-commerce website showcasing technology products.

## Features

- **Home Page**: Hero section with call-to-action and feature highlights
- **About Page**: Company information and mission statement
- **Products Page**: Display of 5+ technology products with pricing
- **Blog Page**: Company blog with introductory post
- **Privacy Policy**: Comprehensive privacy policy page
- **Responsive Design**: Mobile-friendly layout
- **Clean Navigation**: Easy-to-use navigation between pages

## Tech Stack

- React 18
- React Router DOM
- CSS3 with responsive design
- GitHub Pages for deployment

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd my-ecommerce-site
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment

### GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Deploy:
```bash
npm run deploy
```

3. Update the `homepage` field in `package.json` with your GitHub username and repository name.

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.js       # Navigation header
│   ├── Footer.js       # Site footer
│   ├── ProductCard.js  # Product display component
│   └── BlogPost.js     # Blog post component
├── pages/              # Page components
│   ├── Home.js         # Homepage
│   ├── About.js        # About page
│   ├── Blog.js         # Blog page
│   ├── Products.js     # Products page
│   └── Privacy.js      # Privacy policy page
├── data/               # Data files
│   ├── products.js     # Product data
│   └── blogPosts.js    # Blog post data
├── styles/             # CSS files
│   ├── App.css         # Global styles
│   ├── Header.css      # Header styles
│   ├── Footer.css      # Footer styles
│   ├── Home.css        # Homepage styles
│   ├── About.css       # About page styles
│   ├── Blog.css        # Blog page styles
│   ├── Products.css    # Products page styles
│   └── Privacy.css     # Privacy page styles
├── App.js              # Main app component
└── index.js            # App entry point
```

## Assignment Requirements

✅ Home page with hero section and features  
✅ Blog page with introductory post  
✅ About page with company information  
✅ Products page with 5+ products  
✅ Privacy policy page  
✅ Professional website structure  
✅ Responsive design  
✅ Clean navigation  

## License

This project is created for educational purposes as part of CP340 Website Development course.

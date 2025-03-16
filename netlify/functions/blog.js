// Netlify function to serve blog post data from markdown files
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Helper to read markdown files
const getBlogFiles = () => {
  const blogDir = path.join(__dirname, '../../src/content/blog');
  return fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));
};

// Parse a markdown file and extract frontmatter + content
const parseBlogFile = (fileName) => {
  const filePath = path.join(__dirname, '../../src/content/blog', fileName);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  const { data, content } = matter(fileContent);
  
  return {
    id: data.id || '',
    slug: data.slug || fileName.replace('.md', ''),
    title: data.title || '',
    excerpt: data.excerpt || '',
    content: content,
    featuredImage: data.featuredImage || '/placeholder.svg',
    author: data.author || '',
    date: data.date || '',
    readTime: data.readTime || '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    featured: Boolean(data.featured),
  };
};

exports.handler = async (event) => {
  // Define CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };
  
  // Handle OPTIONS request for CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: ''
    };
  }
  
  try {
    const { slug } = event.queryStringParameters || {};
    
    // If slug is provided, return a single blog post
    if (slug) {
      const blogFiles = getBlogFiles();
      const matchingFile = blogFiles.find(file => 
        file.replace('.md', '') === slug || 
        file === `${slug}.md`
      );
      
      if (!matchingFile) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Blog post not found' }),
        };
      }
      
      const post = parseBlogFile(matchingFile);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(post),
      };
    }
    
    // Otherwise, return all blog posts (without content for list view)
    const blogFiles = getBlogFiles();
    
    const posts = blogFiles
      .map(file => parseBlogFile(file))
      .map(post => {
        // Don't include full content in list view
        const { content, ...postWithoutContent } = post;
        return postWithoutContent;
      });
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(posts),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to load blog posts' }),
    };
  }
};

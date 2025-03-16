
// Netlify function to serve project data from markdown files
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Helper to read markdown files
const getProjectFiles = () => {
  const projectsDir = path.join(__dirname, '../../src/content/projects');
  const fileNames = fs.readdirSync(projectsDir);
  
  return fileNames.filter(file => file.endsWith('.md'));
};

// Parse a markdown file and extract frontmatter + content
const parseProjectFile = (fileName) => {
  const filePath = path.join(__dirname, '../../src/content/projects', fileName);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  const { data, content } = matter(fileContent);
  
  return {
    id: data.id || '',
    slug: data.slug || data.id || fileName.replace('.md', ''),
    title: data.title || '',
    description: data.description || '',
    content: content,
    featuredImage: data.featuredImage || '/placeholder.svg',
    technologies: Array.isArray(data.technologies) ? data.technologies : [],
    githubUrl: data.githubUrl || undefined,
    liveUrl: data.liveUrl || undefined,
    featured: Boolean(data.featured),
    date: data.date || '',
  };
};

exports.handler = async (event) => {
  // Set CORS headers
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
    
    // If slug is provided, return a single project
    if (slug) {
      const projectFiles = getProjectFiles();
      const matchingFile = projectFiles.find(file => 
        file.replace('.md', '') === slug || 
        file === `${slug}.md`
      );
      
      if (!matchingFile) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Project not found' }),
        };
      }
      
      const project = parseProjectFile(matchingFile);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(project),
      };
    }
    
    // Otherwise, return all projects (with content stripped for list view)
    const projectFiles = getProjectFiles();
    const projects = projectFiles.map(file => {
      const project = parseProjectFile(file);
      // Don't include full content in list view
      const { content, ...projectWithoutContent } = project;
      return projectWithoutContent;
    });
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(projects),
    };
  } catch (error) {
    console.error('Error in projects function:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to load projects' }),
    };
  }
};

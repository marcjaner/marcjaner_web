// Netlify function to serve project data from markdown files
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Helper to read markdown files
const getProjectFiles = () => {
  try {
    const projectsDir = path.join(__dirname, '../../src/content/projects');
    console.log('Project directory:', projectsDir);
    const fileNames = fs.readdirSync(projectsDir);
    console.log('Found project files:', fileNames);
    
    return fileNames.filter(file => file.endsWith('.md'));
  } catch (error) {
    console.error('Error reading project directory:', error);
    return [];
  }
};

// Parse a markdown file and extract frontmatter + content
const parseProjectFile = (fileName) => {
  try {
    const filePath = path.join(__dirname, '../../src/content/projects', fileName);
    console.log('Reading project file:', filePath);
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
  } catch (error) {
    console.error(`Error parsing project file ${fileName}:`, error);
    return null;
  }
};

exports.handler = async (event, context) => {
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
    console.log('Function event:', event);
    console.log('Query parameters:', event.queryStringParameters);
    
    const { slug } = event.queryStringParameters || {};
    
    // If slug is provided, return a single project
    if (slug) {
      console.log('Looking for project with slug:', slug);
      const projectFiles = getProjectFiles();
      const matchingFile = projectFiles.find(file => 
        file.replace('.md', '') === slug || 
        file === `${slug}.md`
      );
      
      if (!matchingFile) {
        console.log('Project not found for slug:', slug);
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Project not found' }),
        };
      }
      
      const project = parseProjectFile(matchingFile);
      
      if (!project) {
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: 'Failed to parse project file' }),
        };
      }
      
      console.log('Found project:', project.title);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(project),
      };
    }
    
    // Otherwise, return all projects (with content stripped for list view)
    console.log('Getting all projects');
    const projectFiles = getProjectFiles();
    
    if (!projectFiles.length) {
      console.log('No project files found');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify([]),
      };
    }
    
    const projects = projectFiles
      .map(file => parseProjectFile(file))
      .filter(project => project !== null)
      .map(project => {
        // Don't include full content in list view
        const { content, ...projectWithoutContent } = project;
        return projectWithoutContent;
      });
    
    console.log(`Found ${projects.length} projects`);
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
      body: JSON.stringify({ error: 'Failed to load projects', message: error.message }),
    };
  }
};

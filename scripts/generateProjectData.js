const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const projectsDirectory = path.join(__dirname, '..', 'project-files');
const dataDirectory = path.join(__dirname, '..', 'src', 'data');
const outputFile = path.join(dataDirectory, 'projects.json');

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

function getProjectsData() {
  if (!fs.existsSync(projectsDirectory)) {
    console.warn(`Project directory ${projectsDirectory} does not exist. Creating an empty projects array.`);
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  const projectFiles = fileNames.filter(fileName => fileName.endsWith('.md'));

  const allProjectsData = projectFiles.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data, content } = matter(fileContents);

    const titleMatch = content.match(/^#\s(.+)$/m);
    const title = titleMatch ? titleMatch[1] : 'Untitled Project';

    // Pass raw markdown content instead of converting to HTML
    const description = content.slice(content.indexOf(title) + title.length).trim();

    return {
      id,
      title,
      description,
      order: data.order || 9999,
      ...data
    };
  });

  return allProjectsData.sort((a, b) => a.order - b.order);
}

const projectsData = getProjectsData();
ensureDirectoryExistence(outputFile);
fs.writeFileSync(outputFile, JSON.stringify(projectsData, null, 2));
console.log(`Project data written to ${outputFile}`);
const fs = require('fs');
const path = require('path');

// Check if the file exists
const filePath = path.join(__dirname, 'rag.js');
console.log('Checking for file:', filePath);
console.log('File exists:', fs.existsSync(filePath));

// List all files in the directory
console.log('Files in directory:');
fs.readdirSync(__dirname).forEach(file => {
  console.log(file);
});

// Try to load the module directly
try {
  const fullPath = require.resolve('./rag');
  console.log('Module resolved at:', fullPath);
} catch (error) {
  console.error('Module resolution error:', error.message);
}
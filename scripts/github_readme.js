const fs = require('fs');
const path = require('path');
const axios = require('axios');
const zkVerifyJS = require('./zkverifyjs');

const remoteReadmes = [
  {
    githubOrg: 'HorizenLabs',
    githubRepo: 'zkverifyjs',
    modify: zkVerifyJS
  }
]

const fetchMarkdown = async (githubOrg, githubRepo, modify) => {
  try {        
      // Fetch markdown
      const remotePath = `https://api.github.com/repos/${githubOrg}/${githubRepo}/contents/README.md`
      const response = await axios.get(
          remotePath,
          {
              headers: {
                  'Accept': 'application/vnd.github.v3.raw',
              },
          }
      );

      let text = response.data;

      if (modify) {
        text = await modify(text);
      }

      
      // Define the path to the static/markdown folder
      const staticMarkdownDir = path.resolve(__dirname, '../static/markdown');

      // Ensure the static/markdown directory exists
      if (!fs.existsSync(staticMarkdownDir)) {
        fs.mkdirSync(staticMarkdownDir, { recursive: true });
      }

      // Define the path to the new file
      const filePath = path.join(staticMarkdownDir, `/${githubRepo}.md`);

      // Write data to the new file
      fs.writeFile(filePath, text, 'utf8', (err) => {
          if (err) {
          console.error('Error writing file:', err);
          } else {
          console.log('File written successfully to', filePath);
          }
      });
      console.log('File content updated successfully.');
  } catch (err) {
      console.error('Error:', err);
  }
}

for (const readme of remoteReadmes) {
  fetchMarkdown(readme.githubOrg, readme.githubRepo, readme.modify)
}

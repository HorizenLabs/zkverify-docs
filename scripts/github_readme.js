const fs = require('fs');
const path = require('path');
const axios = require('axios');
const zkVerifyJS = require('./zkverifyjs');

const remoteReadmes = [
    {
        githubPath: 'HorizenLabs/zkverifyjs',
        callback: zkVerifyJS
    }
]

const main = async (githubPath, callback) => {
    try {        
        // Fetch markdown
        const remotePath = `https://api.github.com/repos/${githubPath}/contents/README.md`
        const response = await axios.get(
            remotePath,
            {
                headers: {
                    'Accept': 'application/vnd.github.v3.raw',
                },
            }
        );

        let text = response.data;

        // const response = fs.readFileSync(path.join(__dirname, '..', `/src/output/${githubPath}-og.md`), 'utf-8');
        // let text = response;

        if (callback) {
          text = await callback(text);
        }

        // Define the path to the new file
        const filePath = path.join(__dirname, '..', `/src/output/${githubPath}.md`);

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
  main(readme.githubPath, readme.callback)
}

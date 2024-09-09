const fs = require('fs');
const axios = require('axios');
const path = `${__dirname}/docs/tutorials/04-submit-proofs/01-typescript-example.mdx`;
const remotePath = 'https://api.github.com/repos/HorizenLabs/zkverifyjs/contents/README.md'

const main = async () => {
    try {
        // Step 1: Read the file
        const data = fs.readFileSync(path, 'utf8');
        
        // Step 2: Fetch markdown
        const response = await axios.get(
            remotePath,
            {
                headers: {
                    'Accept': 'application/vnd.github.v3.raw',
                },
            }
        );
        const remoteData = response.data;

        // Step 3: Modify the content
        const updatedData = data.replace(`<!-- ${remotePath} -->`, remoteData);
        
        // Step 4: Write the updated content back to the file
        fs.writeFileSync(path, updatedData, 'utf8');
        console.log('File content updated successfully.');
    } catch (err) {
        console.error('Error:', err);
    }
}

main();

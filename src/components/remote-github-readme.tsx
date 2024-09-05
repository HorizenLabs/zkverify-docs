import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import siteConfig from '@generated/docusaurus.config';

const RemoteGithubReadme = ({ repoOwner, repoName, components }) => {
  const [content, setContent] = useState('');
  const { githubToken } = siteConfig.customFields;

  useEffect(() => {
    const fetchReadme = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${repoOwner}/${repoName}/contents/README.md`,
          {
            headers: {
              'Accept': 'application/vnd.github.v3.raw',
              'Authorization': `token ${githubToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error fetching README: ${response.statusText}`);
        }

        const text = await response.text();
        setContent(text);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchReadme();
  }, [repoOwner, repoName]);

  return <ReactMarkdown>{content}</ReactMarkdown>;
};

export default RemoteGithubReadme;

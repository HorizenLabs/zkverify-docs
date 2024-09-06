import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { unified } from 'unified';
import parse from 'remark-parse';
import stringify from 'remark-stringify';
import {visit} from 'unist-util-visit';

const RemoteGithubReadme = ({ repoOwner, repoName, components={}, headingsToRemove=[] }) => {
  const [content, setContent] = useState('');

  const removeSectionByHeading = (markdown, headingToRemove, depth) => {
    const tree = unified()
      .use(parse)
      .parse(markdown);
    
    let remove = false;
  
    visit(tree, 'heading', (node, index, parent) => {
        if (node.depth === depth && node.children[0].value === headingToRemove) {
            remove = true
          // Remove the section under the heading
          let nextNodeIndex = index + 1;
          while (nextNodeIndex < parent.children.length && parent.children[nextNodeIndex].type !== 'heading' && parent.children[nextNodeIndex].type !== 'root') {
            parent.children.splice(nextNodeIndex, 1);
          } 
          if (parent) {
            parent.children.splice(index, 1);
          }
        }
      });
  
    return unified()
      .use(stringify)
      .stringify(tree);
  };

  useEffect(() => {
    const fetchReadme = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${repoOwner}/${repoName}/contents/README.md`,
          {
            headers: {
              'Accept': 'application/vnd.github.v3.raw',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error fetching README: ${response.statusText}`);
        }

        let text = await response.text();
        console.log(response)
        headingsToRemove.forEach((heading => {
            text = removeSectionByHeading(text, heading.heading, heading.depth)
        }))

        console.log(text)
        
        setContent(text);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchReadme();
  }, [repoOwner, repoName]);

  return <ReactMarkdown components={components}>{content}</ReactMarkdown>;
};

export default RemoteGithubReadme;

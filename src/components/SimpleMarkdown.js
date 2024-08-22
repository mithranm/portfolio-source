import React from 'react';

const SimpleMarkdown = ({ text }) => {
  const parseMarkdown = (md) => {
    // Split the markdown into lines
    const lines = md.split('\n');

    return lines.map((line, index) => {
      // Handle headers
      if (line.startsWith('#')) {
        const level = line.indexOf(' ');
        const content = line.slice(level + 1);
        const Tag = `h${level}`;
        return <Tag key={index}>{content}</Tag>;
      }

      // Handle bold text
      if (line.includes('**')) {
        const parts = line.split('**');
        return (
          <p key={index}>
            {parts.map((part, i) => 
              i % 2 === 0 ? part : <strong key={i}>{part}</strong>
            )}
          </p>
        );
      }

      // Handle italic text
      if (line.includes('*')) {
        const parts = line.split('*');
        return (
          <p key={index}>
            {parts.map((part, i) => 
              i % 2 === 0 ? part : <em key={i}>{part}</em>
            )}
          </p>
        );
      }

      // Handle links
      if (line.includes('[') && line.includes(']')) {
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = linkRegex.exec(line)) !== null) {
          parts.push(line.slice(lastIndex, match.index));
          parts.push(<a key={match.index} href={match[2]}>{match[1]}</a>);
          lastIndex = linkRegex.lastIndex;
        }
        parts.push(line.slice(lastIndex));

        return <p key={index}>{parts}</p>;
      }

      // Default to a paragraph
      return <p key={index}>{line}</p>;
    });
  };

  return <div>{parseMarkdown(text)}</div>;
};

export default SimpleMarkdown;
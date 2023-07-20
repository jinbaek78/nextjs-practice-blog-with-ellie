'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Image from 'next/image';

type Props = {
  content: string;
};

let index = 0;
function getIndex() {
  index++;
  return index;
}

export default function MarkdownViewer({ content }: Props) {
  const makeMarkdown = (content: string) => (
    <ReactMarkdown
      key={getIndex()}
      className="markdown p-5"
      remarkPlugins={[remarkGfm]}
    >
      {content}
    </ReactMarkdown>
  );

  const makeHighlightedCodes = (codes: string) => (
    <SyntaxHighlighter
      key={getIndex()}
      clasname="p-5"
      language="jsx"
      style={dracula}
      PreTag="div"
    >
      {codes}
    </SyntaxHighlighter>
  );
  const makeImgTag = (src: string) => (
    <Image
      key={getIndex()}
      className="w-full h-[15rem]"
      src={src}
      width={300}
      height={500}
      alt="react-image"
    />
  );

  return (
    <div className="p-5">
      {parseMarkdown(content, makeMarkdown, makeHighlightedCodes, makeImgTag)}
    </div>
  );
}

function parseMarkdown(
  content: string,
  makeMarkdown: (content: string) => React.ReactNode,
  makeHighlightedCodes: (code: string) => React.ReactNode,
  makeImgTag: (img: string) => React.ReactNode
): React.ReactNode {
  const result = [];
  let url = ``;
  let code = ``;
  let markdownContent = ``;
  let hasCodeStarted = false;
  let hasURLStarted = false;
  let hasURLMetaLinkStarted = false;

  for (let i = 0; i < content.length; i++) {
    if (hasURLMetaLinkStarted && content[i] === ']') {
      hasURLMetaLinkStarted = false;
      continue;
    }
    if (hasURLMetaLinkStarted) {
      continue;
    }
    if (
      !hasURLMetaLinkStarted &&
      content[i] === '!' &&
      content[i + 1] === '['
    ) {
      hasURLMetaLinkStarted = true;
      continue;
    }

    if (hasURLStarted && content[i] === ')') {
      hasURLStarted = false;

      result.push(makeImgTag(url));
      url = ``;
      continue;
    }

    if (hasURLStarted) {
      url += content[i];
      continue;
    }

    //
    if (
      !hasURLStarted &&
      content[i] === '(' &&
      content[i + 1] === 'h' &&
      content[i + 2] === 't' &&
      content[i + 3] === 't' &&
      content[i + 4] === 'p'
    ) {
      hasURLStarted = true;
      result.push(makeMarkdown(markdownContent));
      markdownContent = ``;
      continue;
    }

    if (!hasCodeStarted && content[i] === '`' && content[i + 1] === '`') {
      hasCodeStarted = true;
      i += 5;
      continue;
    }

    if (hasCodeStarted && content[i] === '`' && content[i + 1] === '`') {
      hasCodeStarted = false;
      result.push(makeHighlightedCodes(code));
      code = ``;
      i += 2;
      continue;
    }

    if (hasCodeStarted) {
      if (markdownContent !== '') {
        result.push(makeMarkdown(markdownContent));
        markdownContent = ``;
      }

      code += content[i];
      continue;
    }

    markdownContent += content[i];
  }
  result.push(makeMarkdown(markdownContent));
  return result;
}

"use client"
import React from 'react';
import Image from 'next/image';

interface TextNode {
  type: string;
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
}

interface ListItemNode {
  type: 'list-item';
  children: TextNode[];
}

interface ImageNode {
  type: 'image';
  image: {
    url: string;
    alternativeText: string;
    width: number;
    height: number;
    caption?: string;
  };
}

type ContentNode = {
  type: string;
  children: TextNode[] | ListItemNode[];
  level?: number;
  format?: string;
  language?: string;
} | ImageNode;

function RichText({ content }: { content: ContentNode[] }) {
  const renderText = (node: TextNode) => {
    let text = node.text;
    if (node.bold) text = <strong className="text-theme-primary font-bold">{text}</strong>;
    if (node.italic) text = <em className="text-theme-primary italic">{text}</em>;
    if (node.underline) text = <u className="text-theme-primary">{text}</u>;
    if (node.code) text = (
      <code className="bg-theme-tertiary text-theme-primary px-2 py-0.5 rounded font-mono text-sm">
        {text}
      </code>
    );
    return text;
  };

  const renderNode = (node: ContentNode, index: number) => {
    switch (node.type) {
      case 'heading':
        const HeadingTag = `h${node.level}` as keyof JSX.IntrinsicElements;
        const headingClasses = {
          h1: 'text-4xl',
          h2: 'text-3xl',
          h3: 'text-2xl',
          h4: 'text-xl',
          h5: 'text-lg',
          h6: 'text-base'
        }[HeadingTag] || 'text-base';

        return (
          <HeadingTag 
            key={index} 
            className={`font-bold mt-8 mb-4 text-theme-primary ${headingClasses}`}
          >
            {(node.children as TextNode[]).map((child, i) => (
              <span key={i}>{renderText(child)}</span>
            ))}
          </HeadingTag>
        );

      case 'paragraph':
        if ((node.children as TextNode[]).every(child => !child.text)) return null;
        return (
          <p key={index} className="mb-6 text-theme-secondary leading-relaxed">
            {(node.children as TextNode[]).map((child, i) => (
              <span key={i}>{renderText(child)}</span>
            ))}
          </p>
        );

      case 'list':
        const ListTag = node.format === 'ordered' ? 'ol' : 'ul';
        const listClass = node.format === 'ordered' ? 'list-decimal' : 'list-disc';
        return (
          <ListTag 
            key={index} 
            className={`${listClass} ml-6 mb-6 space-y-2 text-theme-secondary`}
          >
            {(node.children as ListItemNode[]).map((item, i) => (
              <li key={i} className="pl-2">
                {item.children.map((child, j) => (
                  <span key={j}>{renderText(child)}</span>
                ))}
              </li>
            ))}
          </ListTag>
        );

      case 'code':
        return (
          <pre key={index} className="bg-theme-tertiary p-4 rounded-lg mb-6 overflow-x-auto">
            <code className="text-theme-primary font-mono text-sm block">
              {(node.children as TextNode[]).map((child, i) => (
                <span key={i}>{child.text}</span>
              ))}
            </code>
          </pre>
        );

      case 'image':
        const imageNode = node as ImageNode;
        return (
          <figure key={index} className="my-8">
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-md">
              <Image
                src={imageNode.image.url}
                alt={imageNode.image.alternativeText || ''}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            {imageNode.image.caption && (
              <figcaption className="text-center text-sm text-theme-tertiary mt-3 italic">
                {imageNode.image.caption}
              </figcaption>
            )}
          </figure>
        );

      case 'blockquote':
        return (
          <blockquote 
            key={index} 
            className="border-l-4 border-theme-accent-primary pl-4 my-6 italic text-theme-secondary"
          >
            {(node.children as TextNode[]).map((child, i) => (
              <span key={i}>{renderText(child)}</span>
            ))}
          </blockquote>
        );

      default:
        return null;
    }
  };

  return (
    <div className="rich-text">
      {content.map((node, index) => renderNode(node, index))}
    </div>
  );
}

export default RichText;
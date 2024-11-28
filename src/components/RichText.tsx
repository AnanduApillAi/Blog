// components/RichText.tsx
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
    if (node.bold) text = <strong>{text}</strong>;
    if (node.italic) text = <em>{text}</em>;
    if (node.underline) text = <u>{text}</u>;
    if (node.code) text = <code className="bg-gray-100 px-2 rounded">{text}</code>;
    return text;
  };

  const renderNode = (node: ContentNode, index: number) => {
    switch (node.type) {
      case 'heading':
        const HeadingTag = `h${node.level}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag key={index} className="font-bold mt-6 mb-4">
            {(node.children as TextNode[]).map((child, i) => (
              <span key={i}>{renderText(child)}</span>
            ))}
          </HeadingTag>
        );

      case 'paragraph':
        if ((node.children as TextNode[]).every(child => !child.text)) return null;
        return (
          <p key={index} className="mb-4">
            {(node.children as TextNode[]).map((child, i) => (
              <span key={i}>{renderText(child)}</span>
            ))}
          </p>
        );

      case 'list':
        const ListTag = node.format === 'ordered' ? 'ol' : 'ul';
        const listClass = node.format === 'ordered' ? 'list-decimal' : 'list-disc';
        return (
          <ListTag key={index} className={`${listClass} ml-6 mb-4 space-y-2`}>
            {(node.children as ListItemNode[]).map((item, i) => (
              <li key={i}>
                {item.children.map((child, j) => (
                  <span key={j}>{renderText(child)}</span>
                ))}
              </li>
            ))}
          </ListTag>
        );

      case 'code':
        return (
          <pre key={index} className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <code>
              {(node.children as TextNode[]).map((child, i) => (
                <span key={i}>{child.text}</span>
              ))}
            </code>
          </pre>
        );

        case 'image':
            const imageNode = node as ImageNode;
            return (
              <figure key={index} className="my-6">
                <div className="relative w-full h-[400px]">
                  <Image
                    src={imageNode.image.url}  // Remove the STRAPI_API_URL since url is complete
                    alt={imageNode.image.alternativeText || ''}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                {imageNode.image.caption && (
                  <figcaption className="text-center text-sm text-gray-600 mt-2">
                    {imageNode.image.caption}
                  </figcaption>
                )}
              </figure>
            );

      default:
        return null;
    }
  };

  return <div className="rich-text">{content.map((node, index) => renderNode(node, index))}</div>;
}

export default RichText;
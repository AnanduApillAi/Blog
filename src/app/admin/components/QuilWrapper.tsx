import { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface QuillWrapperProps {
  content: string;
  onChange?: (content: string) => void;
}

const QuillWrapper = ({ content, onChange }: QuillWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapperRef.current) {
      const quill = new Quill(wrapperRef.current, {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link'],
            ['clean'],
          ],
        },
        theme: 'snow',
      });
      
      quill.setContents(quill.clipboard.convert(content));
      
      if (onChange) {
        quill.on('text-change', () => {
          onChange(quill.root.innerHTML);
        });
      }
    }
  }, [content, onChange]);

  return <div ref={wrapperRef} />;
};

export default QuillWrapper;
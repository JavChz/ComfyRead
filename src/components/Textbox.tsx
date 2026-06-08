import React, { useEffect, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';

const Textbox: React.FC = () => {
  const {
    text,
    setText,
    layoutMode,
    fontSize,
    lineHeight,
    readingWidth,
    fontFamily,
    spellCheck,
  } = useAppStore();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus on mount and move cursor to end of text
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);
    }
  }, []);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only focus if clicking the container itself, not the textarea
    if (e.target === e.currentTarget && textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Map font family to Tailwind typography classes
  const getFontClass = () => {
    switch (fontFamily) {
      case 'serif':
        return 'font-serif';
      case 'mono':
        return 'font-mono';
      case 'sans':
      default:
        return 'font-sans';
    }
  };

  return (
    <div
      onClick={handleContainerClick}
      className={`w-full flex-1 box-border flex cursor-text ${
        layoutMode === 'comfy'
          ? 'pt-32 px-6 pb-16 justify-center'
          : 'p-6 justify-start'
      }`}
    >
      <textarea
        ref={textareaRef}
        spellCheck={spellCheck}
        placeholder="Just write..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          fontSize: `${fontSize}px`,
          lineHeight: lineHeight,
          maxWidth: `${readingWidth}ch`,
        }}
        className={`bg-transparent border-none text-current w-full min-h-[calc(100vh-8rem)] resize-none outline-none p-0 selection:bg-amber-600 selection:text-white placeholder:text-stone-500 dark:placeholder:text-stone-500/40 ${getFontClass()}`}
      />
    </div>
  );
};

export default Textbox;

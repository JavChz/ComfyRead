import React, { useEffect, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';

function formatEditorial(text: string): string {
  if (!text) return text;
  let normalized = text.replace(/\r\n/g, '\n');
  const blocks = normalized.split(/\n{2,}/);
  
  const formattedBlocks = blocks.map(block => {
    const lines = block.split('\n');
    let newBlock = lines[0];
    for (let i = 1; i < lines.length; i++) {
      const prevLine = lines[i - 1].trim();
      const currLine = lines[i].trim();
      
      if (!prevLine) {
         newBlock += '\n' + currLine;
         continue;
      }
      
      const endsWithTerminator = /[.!?:"'”’]$/.test(prevLine);
      
      if (endsWithTerminator) {
         newBlock += '\n\n' + currLine;
      } else {
         newBlock += ' ' + currLine;
      }
    }
    return newBlock;
  });
  
  return formattedBlocks.join('\n\n');
}

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
    previousText,
    setPreviousText,
  } = useAppStore();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isFormattingRef = useRef(false);

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

  useEffect(() => {
    const handleFormatEvent = () => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      const currentText = textarea.value;
      const formatted = formatEditorial(currentText);
      if (currentText !== formatted) {
        setPreviousText(currentText);
        isFormattingRef.current = true;
        textarea.focus();
        textarea.select();
        document.execCommand('insertText', false, formatted);
        isFormattingRef.current = false;
        
        const length = textarea.value.length;
        textarea.setSelectionRange(length, length);
      }
    };

    const handleUndoEvent = () => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      textarea.focus();
      document.execCommand('undo');
      setPreviousText(null);
    };

    window.addEventListener('format-text', handleFormatEvent);
    window.addEventListener('undo-format', handleUndoEvent);
    return () => {
      window.removeEventListener('format-text', handleFormatEvent);
      window.removeEventListener('undo-format', handleUndoEvent);
    };
  }, [setPreviousText]);

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
        onChange={(e) => {
          if (!isFormattingRef.current && previousText !== null) {
            setPreviousText(null);
          }
          setText(e.target.value);
        }}
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

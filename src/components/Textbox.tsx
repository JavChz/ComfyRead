interface TextboxProps {
  layoutMode: 'comfy' | 'compact';
}

const Textbox = ({ layoutMode }: TextboxProps) => {
  return (
    <div
      className={`w-full box-border flex ${layoutMode === 'comfy'
          ? 'pt-32 px-6 pb-16 justify-center'
          : 'p-6 justify-start'
        }`}
    >
      <textarea
        spellCheck="false"
        placeholder="Just write..."
        className="bg-transparent border-none text-current font-sans text-[1.25rem] leading-[1.6] w-full max-w-[65ch] min-h-[calc(100vh-8rem)] resize-none outline-none p-0 selection:bg-amber-600 selection:text-white placeholder:text-stone-500 dark:placeholder:text-stone-500/50"
      />
    </div>
  );
};

export default Textbox;

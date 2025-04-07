const Textbox = ({ theme }: { theme: string }) => {
  return (
    <div className={`textarea-container ${theme}`}>
      <textarea spellCheck="false" placeholder="Just write..." />
    </div>
  );
};

export default Textbox;

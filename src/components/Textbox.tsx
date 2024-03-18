import React from 'react';

const Textbox = ({ theme }) => {
	return (
		<div className={`textarea-container ${theme}`}>
			<textarea spellCheck="false" placeholder="Just write..." />;
		</div>
	);
};

export default Textbox;

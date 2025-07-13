import React, { useState, useRef, useEffect } from 'react';

function TagsInput({ tags, setTags })
{

    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

  // Add a new tag
    function addTag(e)
    {

        if (e.key === 'Enter' || e.key === ',' || e.key === ' ')
        {
            e.preventDefault();
            const newTag = inputValue.trim(); // the trim method removes whitespace
      
            if (newTag && !tags.includes(newTag)) //includes check if tag containes neTag
            {
                setTags([...tags, newTag]);
                setInputValue('');
            }
        }
    };

  // Remove a tag
    function removeTag(indexToRemove)
    {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

  // Handle backspace to remove last tag
    function handleBackspace(e)
    {
        if (e.key === 'Backspace' && inputValue === '' && tags.length > 0)
        {
            removeTag(tags.length - 1);
        }
    };

  // Handle paste event to add multiple tags at once
    function handlePaste(e)
    {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text/plain');
        const newTags = pasteData.split(/[,;\s]+/).filter(tag => tag.trim());
    }
    // Add only unique new tags
    function uniqueNewTags()
    {
        newTags.filter(tag => !tags.includes(tag));
        setTags([...tags, ...uniqueNewTags]);
    };   

    return (
        <div 
            className="flex flex-wrap items-center gap-2 p-2 border rounded-md min-h-[44px] cursor-text"
            onClick={() => inputRef.current.focus()}
        >
        {/* Display tags */}
        {tags.map((tag, index) => (
            <div 
            key={index} 
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
            >
                <span>{tag}</span>
                <button 
                    type="button" 
                    className="ml-2 text-blue-500 hover:text-blue-700"
                    onClick={() => removeTag(index)}
                >
                    &times;
                </button>
            </div>
        ))}
      
        {/* Input field */}
        <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
            addTag(e);
            handleBackspace(e);
            }}
            onPaste={handlePaste}
            placeholder={tags.length === 0 ? "Add tags..." : ""}
            className="flex-1 min-w-[100px] outline-none bg-transparent"
        />
        </div>
  );
};

export default TagsInput;
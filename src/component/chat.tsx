"use client";

import { useState } from 'react';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [ingredient1, setIngredient1] = useState('');
  const [ingredient2, setIngredient2] = useState('');

  const handleSend = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { text: input, sender: 'user', ingredients: [ingredient1, ingredient2] }]);
      setInput('');
      setIngredient1('');
      setIngredient2('');
    }
  };

  return (
    <div className="flex flex-col h-[70vh] w-[80vw] max-w-md p-4 bg-gray-100 mx-auto mt-10 rounded-lg shadow-md">
      <div className="flex-grow overflow-y-auto bg-white p-4 rounded shadow-sm mb-4">
        {messages.map((message, index) => (
          <div key={index} className={`my-2 p-2 rounded ${message.sender === 'user' ? 'bg-blue-100 self-end' : 'bg-gray-100 self-start'}`}>
            <div>{message.text}</div>
            <div className="text-sm text-gray-600">Ingredients: {message.ingredients.join(', ')}</div>
          </div>
        ))}
      </div>
      <div className="flex space-x-2 mb-2">
        <input
          type="text"
          value={ingredient1}
          onChange={(e) => setIngredient1(e.target.value)}
          className=" text-sm w-1/2 p-2 border rounded"
          placeholder="Ingredient 1"
        />
        <input
          type="text"
          value={ingredient2}
          onChange={(e) => setIngredient2(e.target.value)}
          className=" text-sm w-1/2 p-2 border rounded"
          placeholder="Ingredient 2"
        />
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="text-sm flex-grow p-2 border rounded-l"
          placeholder="Type your message..."
        />
        <button onClick={handleSend} className="p-2 bg-[#FF6347] text-white rounded-r">Send</button>
      </div>
    </div>
  );
};

export default ChatBox;

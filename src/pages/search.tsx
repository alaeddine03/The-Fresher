import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface SearchItem {
  id: number;
  name: string;
  image: string; // Image URL
}

const Search = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const searchItems: SearchItem[] = [
    { id: 1, name: 'Carrot', image: 'src/assets/carrot.png' },
    { id: 2, name: 'Apple', image: 'src/assets/apple.png' },
    { id: 3, name: 'Onion', image: 'src/assets/onion.png' },
    { id: 4, name: 'Lemon', image: 'src/assets/lemon.png' },
    { id: 5, name: 'Peach', image: 'src/assets/peach.png' },
    { id: 6, name: 'Potato', image: 'src/assets/potato.png' },
    { id: 7, name: 'Pepper', image: 'src/assets/pepper.png' },
    { id: 8, name: 'Tomato', image: 'src/assets/tomato.png' },
    { id: 9, name: 'Orange', image: 'src/assets/orange.png' }
  ];

  // Filter items based on search query
  const filteredItems = searchItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Navigate to Waiting page with selected item
  const handleSelect = (id: number) => {
    navigate('/waiting', { state: { itemId: id } });
  };

  return (
    <div className="min-h-screen flex flex-col p-4">
      {/* Back Button */}
      <button
        onClick={() => navigate('/main')}
        className="flex items-center text-gray-600 hover:text-primary transition-colors duration-300 mb-4"
      >
        <ArrowLeft className="w-6 h-6 mr-2" />
        Back
      </button>

      {/* Search Header */}
      <h1 className="text-3xl font-bold mb-4">Search</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-3 border rounded-lg w-full mb-6"
      />

      {/* Grid of Items */}
      <div className="grid grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleSelect(item.id)}
            className="flex flex-col items-center p-4 border rounded-lg hover:shadow-lg transition-shadow duration-300 bg-white cursor-pointer"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 mb-2"
            />
            {/* Name */}
            <div className="text-lg font-medium">{item.name}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-12">
                <button
                    onClick={() => navigate('/pair')}
                    className="px-10 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                    Not My Device
                </button>
        </div>
      
    </div>
  );
};

export default Search;

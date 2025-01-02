import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface HistoryItem {
  id: number;
  name: string;
  percentage: number;
  date: string;
  time: string;
  image: string; // URL for the item's image
}

const History = () => {
  const navigate = useNavigate();

  const historyItems: HistoryItem[] = [
    { id: 1, name: 'Carrot', percentage: 99, date: 'just now', time: '', image: 'src/assets/carrot.png' },
    { id: 2, name: 'Orange', percentage: 21, date: '31 Dec 2024', time: '11:21 AM', image: 'src/assets/orange.png' },
    { id: 3, name: 'Apple', percentage: 85, date: '26 Dec 2024', time: '10:34 AM', image: 'src/assets/apple.png' },
    { id: 4, name: 'Peach', percentage: 78, date: '21 Dec 2024', time: '10:08 PM', image: 'src/assets/peach.png' },
    { id: 5, name: 'Potato', percentage: 92, date: '16 Dec 2024', time: '11:21 AM', image: 'src/assets/potato.png' },
    { id: 6, name: 'Tomato', percentage: 43, date: '15 Dec 2024', time: '10:11 AM', image: 'src/assets/tomato.png' },
    { id: 7, name: 'Pepper', percentage: 35, date: '14 Dec 2024', time: '13:08 AM', image: 'src/assets/pepper.png' },
    { id: 8, name: 'Onion', percentage: 90, date: '14 Dec 2024', time: '11:12 AM', image: 'src/assets/onion.png' },
    { id: 9, name: 'Lemon', percentage: 28, date: '11 Dec 2024', time: '09:43 AM', image: 'src/assets/lemon.png' }
  ];

  const getStatusColor = (percentage: number) => {
    return percentage >= 70 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600';
  };

  const getStatusText = (percentage: number) => {
    return percentage >= 70 ? 'Good' : 'Bad';
  };

  return (
    <div className="min-h-screen flex flex-col p-4">
      {/* Back Button */}
      <button
        onClick={() => navigate('/main')}
        className="flex items-center text-gray-600 hover:text-primary transition-colors duration-300 mb-4"
      >
        <ArrowLeft className="w-6 h-6 mr-2" />
      </button>

      {/* Header */}
      <h1 className="text-4xl font-bold mb-6 text-center">History</h1>

      {/* History Items */}
      <div className="space-y-4">
        {historyItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center p-4 border-2 rounded-lg hover:shadow-lg transition-shadow duration-300 bg-white border-blue-300"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-full mr-4"
            />

            {/* Details */}
            <div className="flex-1">
              <div className="text-xl font-bold">{item.name}</div>
              <div className="text-sm text-gray-500">
                {item.date} • {item.time}
              </div>
            </div>

            {/* Status */}
            <div className={`px-3 py-1 rounded-lg text-sm font-bold ${getStatusColor(item.percentage)}`}>
              {item.percentage}% <span className="ml-1">{getStatusText(item.percentage)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;

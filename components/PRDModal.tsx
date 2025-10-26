
import React from 'react';
import { X } from 'lucide-react';

interface PRDModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  isLoading: boolean;
}

export const PRDModal: React.FC<PRDModalProps> = ({ isOpen, onClose, content, isLoading }) => {
  if (!isOpen) return null;
  
  // Basic markdown to HTML conversion
  const formatContent = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/__(.*?)__/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
      .replace(/_(.*?)_/g, '<em>$1</em>') // Italic
      .replace(/`([^`]+)`/g, '<code class="bg-gray-200 text-red-600 rounded px-1 py-0.5">$1</code>') // Inline code
      .replace(/^(#{1,6})\s(.*)/gm, (match, hashes, title) => { // Headers
          const level = hashes.length;
          return `<h${level} class="mt-4 mb-2 font-bold text-${4-level}xl">${title}</h${level}>`;
      })
      .replace(/^\s*-\s(.*)/gm, '<li class="ml-6 list-disc">$1</li>') // List items
      .replace(/\n/g, '<br />'); // New lines
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Product Requirements Document (PRD)</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
                <p className="mt-4 text-gray-600">Generating with Gemini...</p>
            </div>
          ) : (
             <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: formatContent(content) }}></div>
          )}
        </div>
        <div className="p-4 border-t text-right">
            <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
                Close
            </button>
        </div>
      </div>
    </div>
  );
};

"use client"

import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, FileText, Plus, MoreVertical, Menu, X } from 'lucide-react';

interface Document {
  id: number;
  name: string;
}

const Sidebar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const documents: Document[] = [
    { id: 1, name: 'Untitled document' },
    { id: 2, name: 'Untitled document' },
    { id: 3, name: 'Untitled document' },
  ];
  
  const storageUsed = 3;
  const maxStorage = 6;

  const sidebarVariants = {
    open: { width: '18rem', transition: { type: 'spring', stiffness: 100 } }, 
    closed: { width: '4rem', transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <motion.div
      className="bg-white shadow-lg flex flex-col h-screen p-4"
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      variants={sidebarVariants}
    >

      <div className="flex justify-between items-center mb-6">
        {isOpen && <div className="rounded-full bg-gray-300 w-8 h-8"></div>}
        {isOpen ? (
          <Bell className="w-6 h-6 text-gray-700" />
        ) : (
          <div></div>
        )}
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
        </button>
      </div>

      {isOpen && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Workspace Name</h2>
            <Plus className="w-5 h-5 text-gray-700 cursor-pointer" />
          </div>
        </div>
      )}

      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex justify-between items-center p-2 rounded-md hover:bg-gray-200 cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-500" />
              {isOpen && <span className="text-sm">{doc.name}</span>}
            </div>
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="mt-auto">
          <div className="bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${(storageUsed / maxStorage) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500">{`${storageUsed} out of ${maxStorage} files used`}</p>
        </div>
      )}
    </motion.div>
  );
};

export default Sidebar;
import { Bell, FileText, Plus, MoreVertical } from 'lucide-react'; // Use lucide-react for icons

interface Document {
  id: number;
  name: string;
}

const Sidebar = () => {
  // Sample list of documents
  const documents: Document[] = [
    { id: 1, name: 'Untitled document' },
    { id: 2, name: 'Untitled document' },
    { id: 3, name: 'Untitled document' },
  ];

  // Storage used (example)
  const storageUsed = 3;
  const maxStorage = 6;

  return (
    <div className="w-72 bg-white shadow-lg flex flex-col h-screen p-4">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="rounded-full bg-gray-300 w-8 h-8"></div> {/* Placeholder for a user image */}
        <Bell className="w-6 h-6 text-gray-700" />
      </div>

      {/* Workspace Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Workspace Name</h2>
          <Plus className="w-5 h-5 text-gray-700 cursor-pointer" />
        </div>

        {/* Document List */}
        <div className="space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex justify-between items-center bg-gray-100 p-2 rounded-md hover:bg-gray-200 cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-500" />
                <span className="text-sm">{doc.name}</span>
              </div>
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Storage Section */}
      <div className="mt-auto">
        <div className="bg-gray-200 rounded-full h-2 mb-2">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${(storageUsed / maxStorage) * 100}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500">{`${storageUsed} out of ${maxStorage} files used`}</p>
      </div>
    </div>
  );
};

export default Sidebar;
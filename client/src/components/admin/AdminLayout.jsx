import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { 
  Home, 
  Users, 
  FileText, 
  MessageSquare, 
  Settings, 
  LogOut 
} from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: <Home className="h-5 w-5" />, label: 'Dashboard', path: '/admin' },
    { icon: <Users className="h-5 w-5" />, label: 'Users', path: '/admin/users' },
    { icon: <FileText className="h-5 w-5" />, label: 'Properties', path: '/admin/properties' },
    { icon: <FileText className="h-5 w-5" />, label: 'Mortgages', path: '/admin/mortgages' },
    { icon: <MessageSquare className="h-5 w-5" />, label: 'Contacts', path: '/admin/contacts' },
    { icon: <Settings className="h-5 w-5" />, label: 'Settings', path: '/admin/settings' },
  ];

  const handleLogout = () => {
    // TODO: Implement logout logic
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant={location.pathname === item.path ? "secondary" : "ghost"}
              className={`w-full justify-start mb-2 ${
                location.pathname === item.path ? 'bg-gray-100' : ''
              }`}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </Button>
          ))}
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            <span className="ml-3">Logout</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout; 
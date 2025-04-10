import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Users, Home, FileText, MessageSquare } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    properties: 0,
    users: 0,
    mortgages: 0,
    contacts: 0
  });

  useEffect(() => {
    // TODO: Fetch actual stats from API
    setStats({
      properties: 12,
      users: 5,
      mortgages: 8,
      contacts: 15
    });
  }, []);

  const dashboardItems = [
    {
      title: 'Properties',
      value: stats.properties,
      icon: <Home className="h-4 w-4" />,
      path: '/admin/properties'
    },
    {
      title: 'Users',
      value: stats.users,
      icon: <Users className="h-4 w-4" />,
      path: '/admin/users'
    },
    {
      title: 'Mortgages',
      value: stats.mortgages,
      icon: <FileText className="h-4 w-4" />,
      path: '/admin/mortgages'
    },
    {
      title: 'Contacts',
      value: stats.contacts,
      icon: <MessageSquare className="h-4 w-4" />,
      path: '/admin/contacts'
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardItems.map((item, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <Button 
                variant="ghost" 
                className="mt-4"
                onClick={() => navigate(item.path)}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="outline" onClick={() => navigate('/admin/properties/new')}>
            Add New Property
          </Button>
          <Button variant="outline" onClick={() => navigate('/admin/users/new')}>
            Add New User
          </Button>
          <Button variant="outline" onClick={() => navigate('/admin/mortgages/new')}>
            Add New Mortgage
          </Button>
          <Button variant="outline" onClick={() => navigate('/admin/contacts')}>
            View Messages
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 